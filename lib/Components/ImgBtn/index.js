/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
export default class ImgBtn extends React.Component {
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
    static propTypes = {
        click: PropTypes.func,//.isRequired,
        src: PropTypes.string.isRequired,
    }
    /*state = {
        state1: ''
    }*/
    render() {
        let src=this.props.src;
        return <div className={"Components-ImgBtn-container"} onClick={(e)=>this.props.click(e)}>
            <img src={src}/>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
