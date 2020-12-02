/*共用的*/
import React from 'react'
/*antd-mobile*/
import {Button} from 'antd-mobile';
import PropTypes from "prop-types";
import './Component.less'
import phone from './image/phone.png'
import add from "./image/add.png";
/*自定义类*/
class Mybutton extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			className:"buleButton",
			width:345,
			height:47,
			imgSrc:"",
		}
	}
	static propTypes = {
		label: PropTypes.string.isRequired, //标签
		type: PropTypes.string.isRequired,//类型
	}

	render() {
		const colorStyle=()=>{
			let color='';
			switch (this.props.type){
				case "blue":
					this.state.imgSrc = add;
					color = "blueButton";
					break;
				case "green":
					color = "greenButton";
					break;
				case "grey":
					color ="greyButton";
					break;
				case "white":
					color = "whiteButton";
					this.state.imgSrc = phone;
					break;
			}
			return color
		};
		const heightAndWidth= {
			height: this.props.height ? this.props.height:this.state.height,
			width: this.props.width ? this.props.width:this.state.width,

		};
		let {label,t,hasimg}=this.props;
		let imgflag = true
		if (hasimg != "undefined"){
			imgflag = hasimg
		}
		return <Button style={{ height: `${heightAndWidth.height/100}rem`}} type="primary" className={colorStyle()} onClick={this.props.callback && this.props.callback.bind(this)}>
					{imgflag?<img src={this.state.imgSrc}/>:""}
					<span>{label}</span>
			    </Button>
	}
}
export default Mybutton