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
import openIframeView from '../../../../lib/Components/IframeView'
/*自定义类*/
import './Component.less'
export default class TemplateNoMbox extends React.Component {
    componentDidMount() {
        console.log('[WXTest] componentDidMount..')
        window.setWindowTitle("WXTest")
        //如果微信config没有初始化成功，刷新当前页面。
        if (!window.__initWX__isReady){
            //location.reload();
            console.log("微信初始化没有准备好..")
        }



		/*let overTimeSessionKey=()=>{
			function getLocalStorage(key) {
				// var exp = 60 ; //
				var exp = 60 * 60 * 24; // 一天的秒数
				if(localStorage.getItem(key)) {
					var auth = localStorage.getItem(key); // 获取本地存储的值
					var authTime= localStorage.getItem('authTime');
					// var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
					// 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
					var isTimed = (new Date().getTime() - authTime) > exp;

					if(isTimed) {
						console.log("存储已过期");
						localStorage.removeItem(key);
						localStorage.removeItem('authTime');
						return null;
					} else {
						var newValue = auth;
					}
					return newValue;
				} else {
					return null;
				}
			}

			var authTime= JSON.parse(window.getLocalData('authTime'));
			if (!authTime) {
				var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
				window.setLocalData('authTime', curtime)
			}

			var localKey = getLocalStorage('auth');
			console.log('localKey_____________', localKey);

		};
		overTimeSessionKey.call();*/
	}
    state = {
        soundRecording_start:false,
        soundToWord_start:false
    }
    soundRecording_id=""
    soundToWord_id=""
    reload(){
        location.reload();
    }
    playVoice(){

    }
    scanQRCode(){
        if (!window.__initWX__isReady){
            alert("微信api未准备好")
            return;
        }
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                alert(result)
            }
        });
    }
    soundRecording(){
        let {soundRecording_start}=this.state
        soundRecording_start=!soundRecording_start;
        this.setState({soundRecording_start})
        if (soundRecording_start){
            alert("准备-开始录音")
            wx.onVoiceRecordEnd({
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: (res)=> {
                    var localId = res.localId;
                    this.soundRecording_id=localId
                    //测试用，具体业务，这里要删除
                    wx.playVoice({
                        localId: localId// 需要播放的音频的本地ID，由stopRecord接口获得
                    });
                }
            });
            wx.startRecord();
        }else{
            alert("准备-结束录音")
            wx.stopRecord({
                fail:()=>{
                    alert("stopRecord fail:"+JSON.stringify(arguments))
                },
                success:(res)=> {
                    alert(JSON.stringify(res))
                    var localId = res.localId;
                    this.soundRecording_id=localId
                    //测试用，具体业务，这里要删除
                    wx.playVoice({
                        localId: localId// 需要播放的音频的本地ID，由stopRecord接口获得
                    });
                }
            });
        }
    }
    translateVoice(localId){
        wx.translateVoice({
            localId:localId, // 需要识别的音频的本地Id，由录音相关接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: (res)=>{
                alert("translateVoice success:"+JSON.stringify(res))
                // alert(res.translateResult); // 语音识别的结果
            },
            fail:()=>{
                alert("translateVoice fail:"+JSON.stringify(arguments))
            }
        });
    }
    openiframe(){
        openIframeView("webview2019","http://www.baidu.com")
    }
    soundToWord(){
        this.props.history.push('/Demo/SoundToWord')
        /*let {soundToWord_start}=this.state
        soundToWord_start=!soundToWord_start
        this.setState({soundToWord_start})
        if (soundToWord_start){
            wx.startRecord();
            wx.onVoiceRecordEnd({
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: (res)=>{
                    var localId = res.localId;
                    this.soundToWord_id=localId
                    this.translateVoice(localId)
                }
            });
        }else{
            wx.stopRecord({
                success:(res)=>{
                    var localId = res.localId;
                    this.soundToWord_id=localId
                    this.translateVoice(localId)
                }
            });
        }*/
    }
    fun1(){
        debugger
        let url="login/getWxAuthUrl?forwordUrl="+encodeURI(window.location.href);
        window.GETNoAuth({url}).then((data)=> {
            console.log("超时系统准备刷新:",data)
            if (!data.isSucess) return;
            // alert("调试："+data.data)
           console.log(data.data)
        })
    }
    render() {
        let {soundRecording_start,soundToWord_start}=this.state
        let soundRecording_tip=soundRecording_start?"开始":"结束"
        let soundToWord_tip=soundToWord_start?"开始":"结束"
        return <div className={"Components-WXTest-container"}>
            <h3>WXTest</h3>
            <Button onClick={()=>alert(window.isWeiXin())}>当前浏览器是不是微信</Button>
            <Button onClick={()=>this.fun1()}>login/getWxAuthUrl test</Button>
            <Button onClick={()=>wx.closeWindow()}>关闭</Button>
            <Button onClick={()=>alert(window.location.href)}>当前地址栏信息</Button>
            <Button onClick={()=>alert(navigator.userAgent)}>navigator.userAgent</Button>
            <Button onClick={()=>alert(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))}>是否是IOS</Button>
            <Button onClick={()=>this.scanQRCode()}>扫描二维码</Button>
            <Button onClick={()=>this.openiframe()}>打开全屏iframe</Button>
            <br/>
            <Button onClick={()=>this.soundRecording()}>录音-{soundRecording_tip}</Button>
            <br/>
            <Button onClick={()=>this.soundToWord()}>语音转文件-{soundToWord_tip}</Button>
            <br/>
            <Button onClick={()=>this.props.history.push('/Demo/WXImagePickerTest')}>微信图片上传</Button>
            <br/>
            <Button onClick={()=>this.reload()}>刷新当前页</Button>
        </div>;
    }
}
