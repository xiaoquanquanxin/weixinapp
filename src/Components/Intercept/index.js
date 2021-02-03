/*共用的*/
import React from 'react';
/*自定义类*/
const HocIntercept = (arg) => (WapperComponent) => {
	return class extends WapperComponent {
		constructor (props) {
			super(props);
			this.state = {
				authStatus: 0 //认证状态（1-已认证，0-未认证）
			};
		}

		componentDidMount () {
			debugger
			/*非必填入参*/
			const domain = window.location.origin;
			const body = {
				phoneNo: '',
				validCode: '',
				// returnUrl: domain + '/'
				returnUrl: window.location.href,
			};
			this.userAuth(body);
		}

		async userAuth (body) {
			let url = 'user/userAuth';
			let formdata = { ...body };
			let result = await window.POST({ url, formdata });
			if (!result.isSucess) return false;
			this.setState({
				authStatus: result.data ? result.data.authStatus : this.state.authStatus
			});
		}

		render () {
			return <WapperComponent {...this.props} authStatus={this.state.authStatus} />;
		}
	};

};

export default HocIntercept;
