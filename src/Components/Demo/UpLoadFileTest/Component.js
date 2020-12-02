/*共用的*/
import React from 'react'
/*antd-mobile*/
import { ImagePicker } from 'antd-mobile';
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import UpLoadOneFile from '../../../../lib/Components/UpLoadOneFile'
import ImagePickerH5 from '../../../../lib/Components/ImagePickerH5'
import WaitingTip from '../../../../lib/Components/UpLoadOneFile/WaitingTip.js'
/*自定义类*/

import './Component.less'
export default class TemplateNoMbox extends React.Component {
    componentDidMount() {
        //console.log('[TemplateNoMbox] componentDidMount..')
        window.setWindowTitle("页面名称")
        this.refs.IPH5.addImg("https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg")
        this.refs.IPH5.addImg("https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg")
        this.refs.IPH5.addImg("https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg")
    }
    /*state = {
        state1: ''
    }*/
    UpLoadOneFile_callbackState(t,msg,file){
        console.log("UpLoadOneFile_callbackState:",file)
        switch(t){
            case 1://开始
                console.log("开始:",msg)
                break;
            case 2://上传中
                console.log("上传中:",msg)
                break;
            case 3://上传完成
                console.log("上传完成:",msg)
                break;
            case -1: //出错
                console.log("出错:",msg)
                break;
            default:
                break;
        }
    }
    WaitingTipTest(e){
        var c=5
        var $tipTarget=WaitingTip.show(c+"秒后结束.")
        //如果实时改变，需要找到这个载点
        var $tip = $tipTarget.find(".loading-tip .txt-tip")
        var i=0;
        var setInterval_tem=window.setInterval(()=>{
            $tip.html(c-++i+"秒后结束")
            if (i>=c){
                window.clearInterval(setInterval_tem)
                $tipTarget.remove()
            }
        },1000)
    }
    render() {
        //UpLoadOneFile 需要传的参数
        var UpLoadOneFile_api="http://yxfy-uat.coli688.com:8080/file/upload";
        var sessionKey="a35c5f1b1444131fe9c1d459474646c9_1565765127126"
        var UpLoadOneFile_apiHeader={sessionKey}


        return <div className={"Components-UpLoadFileTest-container"}>
            <Button type="primary" onClick={()=>{this.props.history.push("/Demo/WXImagePickerTest")}}>转到：微信上传图片</Button>
            <h3>上传单个文件</h3>
            <UpLoadOneFile multiple={true} accept={"image/*"} height={"1rem"} api={UpLoadOneFile_api} apiHeader={UpLoadOneFile_apiHeader} callbackState={(t,msg,file)=>this.UpLoadOneFile_callbackState(t,msg,file)}>
    <Button type="primary">上传</Button>
            </UpLoadOneFile>
            <h3>弹框提示</h3>
            <Button onClick={(e)=>this.WaitingTipTest(e)}>点击弹出，5秒后自动关闭</Button><WhiteSpace />
        <h3>h5图片上传</h3>
        <ImagePickerH5 ref="IPH5"/>
            <h3>抽取的纯html和css布局</h3>
        {1==2?<ImagePicker/>:null}
    <div className={"Components-lib-WXImagePicker-container"}>
            <div className={"am-image-picker"}>
            <div className={"am-image-picker-list"} role="group">
            <div className={"am-flexbox am-flexbox-align-center"}>
            <div className={"am-flexbox-item"}>
            <div className={"am-image-picker-item"}>
            <div className={"am-image-picker-item-remove"} >
            </div>
            <div className={"am-image-picker-item-content"} style={{backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg')",transform:"rotate(0deg)"}}>
    </div>
        </div>
        </div>
        <div className={"am-flexbox-item"}>
            <div className={"am-image-picker-item"}>
            <div className={"am-image-picker-item-remove"} >
            </div>
            <div className={"am-image-picker-item-content"} style={{backgroundImage:"url('https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg')",transform:"rotate(0deg)"}}>
    </div>
        </div>
        </div>
        <div className={"am-flexbox-item"}>
            <div className={"am-image-picker-item am-image-picker-upload-btn"} >
            </div>
            </div>
            <div className={"am-flexbox-item"}>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}