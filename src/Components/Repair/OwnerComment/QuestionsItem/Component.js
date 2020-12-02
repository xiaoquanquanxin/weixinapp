/*共用的*/
import React from 'react'
//import PropTypes from 'prop-types'
/*antd-mobile*/
import { Flex, Button, WingBlank} from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
export default class QuestionItem extends React.Component {
    /*static propTypes = {
        xxxx: PropTypes.object//.isRequired
        xxxx: PropTypes.array//.isRequired,
        xxxx: PropTypes.bool//.isRequired,
        xxxx: PropTypes.func//.isRequired,
        xxxx: PropTypes.number//.isRequired,
        xxxx: PropTypes.object//.isRequired,
        xxxx: PropTypes.string//.isRequired,
        xxxx: PropTypes.symbol//.isRequired
    }*/
    /*state = {
        state1: ''
	}*/
	constructor(props){
		super(props);
		this.state ={
			value:"unset",
			istrue:"",
			isfalse:"",
		}
	}
	clickYes = () =>{
		this.setState({
			value:true,
			istrue: true,
			isfalse: false,
		})
	}
	clickNo = () => {
		this.setState({
			value: false,
			istrue:false,
			isfalse:true,
		})
	}
	render() {
		return <div className={"Components-QuestionItem-container"}>
			<WingBlank >
				<div className={"title"}>1、工作人员是否及时响应</div>
				<Flex>
					<Flex.Item><div onClick={this.clickYes.bind(this)} className={`uncheckBox ${this.state.istrue ? "true"  : ""}`}>是</div></Flex.Item>
					<Flex.Item><div onClick={this.clickNo.bind(this)} className={`uncheckBox ${this.state.isfalse ? "false" : ""}`}>否</div></Flex.Item>
				</Flex>
			</WingBlank >
		</div>;
	}
	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013
}