/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
export default class ImgItem extends React.Component {
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
        remove: PropTypes.func,//.isRequired, //添加关闭
        click: PropTypes.func.isRequired, //添加图片
        img: PropTypes.string.isRequired, //添加图片地址
        data: PropTypes.object.isRequired// 附加数据
    }
    /*state = {
        state1: ''
    }*/
    close(){
        this.props.remove(this.props.data)
    }
    click(){
        this.props.click(this.props.data)
    }
    render() {
        let isClose=!!this.props.remove
        var img=this.props.img;
        // console.log("ImgItem url:",img)
        return <div className={"am-flexbox-item"}>
            <div className={"am-image-picker-item"}>
                {isClose&&<div className={"am-image-picker-item-remove"} onClick={()=>this.close()}>
                </div>}
            <div className={"am-image-picker-item-content"} onClick={()=>this.click()} style={{backgroundImage: "url('"+img+"')",transform:"rotate(0deg)"}}>
            </div>
        </div>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}