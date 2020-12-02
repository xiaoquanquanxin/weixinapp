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
export default class CertificationStatus extends React.Component {
	state = {
		// telNumber: false
	};
	componentDidMount () {
		window.setWindowTitle('登录成功');
	}

	/*提交进入添加家庭成员*/
	submit = () =>{
		this.props.history.push('/Certification/FamilyMembers')
	};
	/*返回上一级*/
	callback = (history) => {
        let toUrl=window.getQueryString("url")
		let url ="/MineList"
        if (toUrl){
            url=decodeURIComponent(toUrl)
		}
		if ((url.indexOf('#') !== -1)){
			window.location.href = url
		}else{
			history.push(url)
		}
		
		//history.push(url)
	};
	onChange = (val) => {
		console.log(val);
	};
	render () {
		const { store, history} = this.props;
		let toUrl = window.getQueryString("url")

		return (<div className={'Components-CertificationStatus-container'} >

			<div className={'CertificationStatus'}>
				<div ><StatusTips
					type={'sucess'}
					label={'您的信息已登录成功！'}
					describe={<div className={'describe'}>
						<p >感谢您的使用，您可在我的-房产增删家属信息。</p>
					</div>}
				/></div >
				<WhiteSpace size="lg" />

			</div>
			<WingBlank >
				<Flex>
					<div className={"g-btn"}>
						<Flex.Item><Mybutton callback={() => { this.callback(history) }} type={'blue'} label={toUrl?"返回":"个人中心"} width={250} /></Flex.Item>
					</div>
					
					{/* <Flex.Item><Mybutton callback={this.submit} type={'blue'} label="授权家属"  width={150}/></Flex.Item> */}
				</Flex>
			</WingBlank >

		</div >);
	}
}