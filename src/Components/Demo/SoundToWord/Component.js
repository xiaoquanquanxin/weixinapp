/*
模板
不需要noMbox功能
*/
/*共用的*/
import React from 'react'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { Button} from 'antd-mobile';
/*当前页面用到的*/
import "./loaders.min.css"
// import './recordingTip.less'
import recordingTip from "./recordingTip.js"
/*自定义类*/
import './Component.less'
export default class SoundToWordNoMbox extends React.Component {
    componentDidMount() {
        //console.log('[TemplateNoMbox] componentDidMount..')
        window.setWindowTitle("页面名称")
    }
    /*state = {
        state1: ''
    }*/
    render() {
        return <div className={"Components-SoundToWordNoMbox-container"}>
            <h3>模板-SoundToWord</h3>
            <Button onClick={()=>this.soundToWord()}>#语音转文字#</Button>
        </div>;
    }
    translateVoice(localId,formt){
        // alert("localId:"+JSON.stringify(localId)+",formt:"+formt)
        wx.translateVoice({
            localId:localId, // 需要识别的音频的本地Id，由录音相关接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: (res)=>{
                alert("translateVoice success:"+JSON.stringify(res))
                // alert(res.translateResult); // 语音识别的结果
            },
            fail: function(a,b,c){
                var tip="";
                if (a) tip =tip+",a:"+JSON.stringify(a)
                if (b) tip =tip+",b:"+JSON.stringify(b)
                if (c) tip =tip+",c:"+JSON.stringify(c)
                alert("转换失败，请重试#1" + JSON.stringify(arguments)+" tip:"+tip)
            }
        });
    }
    soundToWord(){
        //alert("soundToWord..");
        //开始录音
        wx.startRecord();
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: (res)=>{
                var localId = res.localId;
                this.translateVoice(localId,1)
            }
        });
        var $tip=recordingTip();
        $tip.click(()=>{
            $tip.remove();
            wx.stopRecord({
                success:(res)=>{
                    var localId = res.localId;
                    this.translateVoice(localId,2)
                },
                fail: function(a,b,c){
                    var tip="";
                    if (a) tip =tip+",a:"+JSON.stringify(a)
                    if (b) tip =tip+",b:"+JSON.stringify(b)
                    if (c) tip =tip+",c:"+JSON.stringify(c)
                    alert("stopRecord error: "+ JSON.stringify(arguments)+",tip:"+tip)
                }
            });
        })
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}