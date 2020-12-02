/*共用的*/
import React,{Fragment}from 'react'
/*antd-mobile*/
import {Flex,WhiteSpace} from 'antd-mobile';
import PropTypes from "prop-types";
import './Component.less'
//选中
import CheckImg from "./img/check.png";
//没选中
import unCheckImg from "./img/uncheck.png"
/*自定义类*/
class CheckBoxItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
           isCheck:false,
        }
    }
    // shouldComponentUpdate(nextprops,nextstate){
    //     if (nextprops.check == this.props.check){
    //         return false;   
    //     }else{
    //         return true;
    //     }
    // }
    check(){
       
    }
    render() {
        let { radioKeys, check, onChange}=this.props;
        let isCheck = false;
        if (check != ""){
            if (radioKeys == check) {
                isCheck = true;
            }
        }
        return (
            <div className="Component-RadioBoxItem-container">
                <div className={"RadioBoxItem"} onClick={() => { onChange(radioKeys)}}>
                    <Flex>
                        <div className={"RadioBoxContent"}>
                            <div className="RadioBoxImgBox">
                                <img src={isCheck?CheckImg:unCheckImg}></img>
                            </div>
                            <div className={"RadioBoxChildContent"}>
                                {
                                    React.Children.map(this.props.children, (child) => {
                                            return <Fragment>{child}</Fragment>
                                    })
                                }
                            </div>
                        </div>
                    </Flex>
                </div>
            </div>
        )
    }
}
export default CheckBoxItem