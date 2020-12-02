/*共用的*/
import React from 'react'
/*antd-mobile*/
import {Button} from 'antd-mobile';
import PropTypes from "prop-types";
import './Component.less'
/*自定义类*/
class Mybutton extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			className:"buleButton",
			width:345,
			height:47,
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
					break;
			}
			return color
		};

		const heightAndWidth= {
			height: this.props.height ? this.props.height:this.state.height,
			width: this.props.width ? this.props.width:this.state.width,

		};
		let {label,t,id}=this.props;
		return <Button
            id={id}
            inline
            style={{width:`${heightAndWidth.width/100}rem`,height:`${heightAndWidth.height}px`}}
            type="primary"
            className={colorStyle()}
            onClick={this.props.callback && this.props.callback.bind(this)}
        >{label}</Button>
	}
}
export default Mybutton