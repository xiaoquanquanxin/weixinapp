/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { List, InputItem,Checkbox, Flex, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import Mybutton from '../../../pub/MyButton/index';
import StatusTips from '../../../pub/StatusTips';

/*当前页面用到的*/

/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer
export default class CertificationModifySelfInfoSucess extends React.Component {
	state = {
		// telNumber: false
	};
	componentDidMount () {
		window.setWindowTitle('修改成功');
	}

	/*提交进入添加家庭成员*/
	submit = () =>{
		this.props.history.push('/Certification/FamilyMembers')
	};
	/*返回上一级*/
	callback = (history) => {
        // let toUrl=window.getQueryString("url")
		// let url ="/MineList"
        // if (toUrl){
        //     url=decodeURIComponent(toUrl)
		// }
		// window.location.href=url
		//history.push('/MineList')
		history.push('/SubmitCertification')
	};
	onChange = (val) => {
		console.log(val);
	};
	render () {
		const { store, history} = this.props;
		return (<div className={'Components-CertificationStatus-container'} >

			<div className={'CertificationStatus'}>
				<div ><StatusTips
					type={'sucess'}
					label={'信息提交成功！'}
					describe={<div className={'describe'}>
						<p >我们将在三个工作日内对您的信息进行审核，如有疑问请拨打400电话。</p>
					</div>}
				/></div >
				<WhiteSpace size="lg" />

			</div>
			<WingBlank >
				<Flex>
					<Flex.Item><Mybutton callback={() => { this.callback(history) }} type={'blue'} width={300} label="返回登录" /></Flex.Item>
				</Flex>
			</WingBlank >
		</div >);
	}
}