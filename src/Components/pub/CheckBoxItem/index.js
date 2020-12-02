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
    componentWillMount(){
        
    }
    check(){
        this.setState({
            isCheck:!this.state.isCheck,
        })
        this.props.onChange();
    }
    render() {
        let {label,t}=this.props;
        return (
            <div className="Component-CheckBoxItem-container">
                <div className={"CheckBoxItem"} onClick={this.check.bind(this)}>
                    <Flex>
                        <div className={"CheckBoxConent"}>
                            <div className="CheckBoxImgBox">
                                    <img src={this.state.isCheck?CheckImg:unCheckImg}></img>
                            </div>
                            <div className={"CheckBoxChildConent"}>
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