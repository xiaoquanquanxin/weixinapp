/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { List, InputItem,Checkbox, Flex, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import Mybutton from '../../pub/MyButton/index';
import StatusTips from '../../pub/StatusTips';
import router from '../../../router';

/*当前页面用到的*/

/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	state = {
		// telNumber: false
	};
	componentDidMount () {
		window.setWindowTitle('登录');
	}

	/*提交进入添加家庭成员*/
	submit = () =>{
		this.props.history.push(router.AddFamilyMembers[0])
	};
	/*返回上一级*/
	callback = () => {
        let toUrl=window.getQueryString("url")
		let url="/"
        if (toUrl){
            url=decodeURIComponent(toUrl)
		}
        window.location.href=url
	};
	onChange = (val) => {
		console.log(val);
	};
	render () {
		return (<div className={'Components-ChangeTelNumberSuccess-container'} >
			<div className={'CertificationStatus'}>
				<div ><StatusTips
					type={'sucess'}
					label={'提交成功！'}
					describe={<div className={'describe'}>
                        后台正在审核，请耐心等待我们的微信信息通知。
					</div>}
				/></div >
				<WhiteSpace size="lg" />
			</div>
		</div >);
	}
}