/*
模板
不需要noMbox功能
*/
/*共用的*/
import React from 'react'
/*antd-mobile*/
// import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { Modal,Button} from 'antd-mobile';
/*当前页面用到的*/
import ImagePickerWXone from '../../../../lib/Components/ImagePickerWXone'
/*自定义类*/
import './Component.less'
export default class TemplateNoMbox extends React.Component {
    alertDebug(title,msg){
        Modal.prompt('调试',title,[
            { text: 'Cancel' },
            { text: 'Submit'},
        ],"msg",JSON.stringify(msg));
    }
    componentDidMount() {
        //console.log('[TemplateNoMbox] componentDidMount..')
        window.setWindowTitle("微信上传图片测试")
       // this.refs.IPWX.addImg("https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg","100")
    }
    /*state = {
        state1: ''
    }*/
    change_ImagePickerWX(t,msg){
        if (typeof msg !="string") msg = JSON.stringify(msg)
        switch(t){
            case "chooseImage":
                //"{\"localIds\":[\"wxLocalResource://587547383922243\",\"wxLocalResource://587547383981244\"],\"sourceType\":\"album\",\"errMsg\":\"chooseImage:ok\"}"
                break;
            case "uploadImage":
                this.alertDebug(t,msg)
                 break;
            case "chooseImage_fail":
                break;
            case "uploadImage_fail":
                break;
        }


    }
    render() {
        let apiupload="user/common/uploadFileByMediaId";
        let apidel="";

        return <div className={"Components-WXImagePickerTest-container"}>
            <h3>微信上传图片测试</h3>
            <ImagePickerWXone ref="IPWX" change={(t,msg)=>this.change_ImagePickerWX(t,msg)} apiupload={apiupload} apidel={apidel}/>
            {/* <Button onClick={()=>alert(JSON.stringify(this.refs.IPWX.getData()))}>获取信息</Button> */}
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}