/*
模板
不需要noMbox功能
*/
/*共用的*/
import React from 'react'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import RichUploadAttachDisplay from "../../../../lib/Components/RichUploadAttachDisplay"
/*自定义类*/
import './Component.less'
export default class RichUploadAttachDisplayTest extends React.Component {
    componentDidMount() {
        //console.log('[TemplateNoMbox] componentDidMount..')
        window.setWindowTitle("页面名称")
    }
    /*state = {
        state1: ''
    }*/
    render() {
        let imglist=[
            //视频
            {
                "fileName": "58808260724__9F264F80-48D7-4120-8F1C-BB447050772C.MOV",
                "sysFileName": "643a1c2c152549fdacbb269543619491.MOV",
                "fileSize": 136414,
                "filePath": "video/20190821/643a1c2c152549fdacbb269543619491.MOV",
                "visitUrl": "http://kftest.yuzhou-group.com/file-service/video/20190902/662be9fd88dd49709c66d42e659274fc.mp4",
                "id": 379,
                "suffix": "mp4"
            },
            //图片
            {
                "fileName": "1z9u43ktwlLT-Yor5oHRFpNQGUx-YopUmP7Fe73ARfMtNfB0zd-Ejj-L3Smlo9bf.jpg",
                "sysFileName": "29b399562b604f7983ec93e92d88d061.jpg",
                "fileSize": 351188,
                "filePath": "image/20190821/29b399562b604f7983ec93e92d88d061.jpg",
                "visitUrl": "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg",
                "id": 380,
                "suffix": "jpg",
                "mediaId": "1z9u43ktwlLT-Yor5oHRFpNQGUx-YopUmP7Fe73ARfMtNfB0zd-Ejj-L3Smlo9bf"
            }
        ]
        let voicelist=[
            {
                "fileName": "caL4cDRhbIQ2Y47sPTyvP_0qrSC4hDF5nFDpZC8KlszFohVics7XBKCjR7gvqX8E.amr",
                "sysFileName": "74611e28daab4a42b339be56356fd614.mp3",
                "fileSize": 2512,
                "filePath": "other/20190821/74611e28daab4a42b339be56356fd614.amr",
                "visitUrl": "http://kftest.yuzhou-group.com/file-service/other/20190827/6840b27ad767497089ca0c8434fa14c1.mp3",
                "id": 381,
                "suffix": "mp3",
                "mediaId": "caL4cDRhbIQ2Y47sPTyvP_0qrSC4hDF5nFDpZC8KlszFohVics7XBKCjR7gvqX8E"
            }
        ]
        return <div className={"Components-RichUploadAttachDisplayTest-container"}>
            <h3>模板-RichUploadAttachDisplayTest</h3>
            <RichUploadAttachDisplay imglist={imglist} voicelist={voicelist}/>
        </div>;
    }
}