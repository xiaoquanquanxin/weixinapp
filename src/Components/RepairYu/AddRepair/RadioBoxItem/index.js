/*共用的*/
import React,{Fragment}from 'react'
/*antd-mobile*/
import {Flex,WhiteSpace} from 'antd-mobile';
import PropTypes from "prop-types";
import './Component.less'
/*自定义类*/
class RadioInLine extends React.Component {
    constructor(props) {
        super(props);
        this.state={
           index:"",
        }
    }
    check(index,value,label){
        let { callback } = this.props
        this.setState({
            index:index+0,
        })
        callback(value,label);
    }
    render() {
        let {data}=this.props;
        let isCheck = false;
       // console.log("datassssssssssssss",data)
        return (
            <div className="Component-RadioInLine-container">
                {
                    data&&data.map((item,index)=>{
                        return (
                            <div key={index} htmlFor={`checkbox${index}`} className="RadioInLineItem" onClick={this.check.bind(this,index,item.value,item.label)}>
                                <i className={`checkbox ${this.state.index === index ? "check" : ""}`}></i>
                                <span className={`label ${this.state.index === index ? "check" : ""}`}>{item.label}</span>
                            </div>
                        )   
                    })
                }
            </div>
        )
    }
}
export default RadioInLine;