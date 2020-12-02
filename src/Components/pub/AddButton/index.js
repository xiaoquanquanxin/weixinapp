/*共用的*/
import React from 'react'
/*antd-mobile*/
import {Flex,WhiteSpace} from 'antd-mobile';
import PropTypes from "prop-types";
import add from "./img/add.png"
import './Component.less'
/*自定义类*/
class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            className:"buleButton",
            width:345,
            height:47,
        }
    }
    componentWillMount(){
        
    }
    shouldComponentUpdate(nextProps, nextState){
       
    }
    render() {
        let {label,t}=this.props;
        return (
            <div className="Component-AddButton-container">
                <Flex justify="content">
                    <Flex.Item justify="content">
                        <div className="addiconBox">
                            <div className="ico">
                                <img src={add} />
                            </div>
                            <WhiteSpace />
                            <div className="test">添加报名成员</div>
                        </div>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}
export default AddButton