/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import soundtip from './soundtip.png';
/*自定义类*/
import './Component.less'
export default class SoundPad extends React.Component {
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
       data: PropTypes.object.isRequired, //播放需要的参数
       playtype: PropTypes.string//播放方式 1 微信jssdk 2 h5 mp3
   }
    static defaultProps = {
        playtype: 2
    }
    state = {
        isplay:false
    }
    play(){
        var playtype=this.props.playtype
        var data=this.props.data;
        var visitUrl=data.visitUrl;
        if(playtype=="1"){
            var mediaId=data.mediaId;
            // console.log("声音mediaId:"+mediaId)
            // console.log("播放声音:"+JSON.stringify(data))
            var THIS=this;
            wx.downloadVoice({
                serverId: mediaId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var localId = res.localId; // 返回音频的本地ID
                    console.log("声音function:"+mediaId)
                    wx.onVoicePlayEnd({
                        success: function (res) {
                            var localId = res.localId; // 返回音频的本地ID
                            THIS.setState({isplay:false})
                        }
                    });
                    let isplay=!!THIS.state.isplay
                    if (isplay){
                        wx.stopVoice({
                            localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
                        });
                        THIS.setState({isplay:false})
                    }else{
                        wx.playVoice({
                            localId:localId // 需要播放的音频的本地ID，由stopRecord接口获得
                        });
                        THIS.setState({isplay:true})
                    }
                }
            });
        }else{
            //jquery插入一下audio标签，播放声音
            function playAudio(url) {
                var $=window.JQ;
                if (window.$_____abc___dd_playAudio){
                    window.$_____abc___dd_playAudio.remove()
                }
                var $target=$(`<audio src="${url}" controls hidden></audio>`)
                window.$_____abc___dd_playAudio=$target
                $("body").append($target)
                $target[0].play()
            }
            playAudio(visitUrl);
            //SoundPad
        }
    }
    render() {
        let isplay=!!this.state.isplay
        var data=this.props.data;
        var isclose=!!this.props.close
        return <div className={"Components-SoundPad-container"}>
            <img src={soundtip} onClick={(e)=>{this.play()}}/><div className="tip" onClick={(e)=>{this.play()}}>{isplay?'播放':'停止'}</div>
            {isclose&&<div className={"closeico"} onClick={(e)=>{this.props.close(data)}}>
                <svg t="1566388372948" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2019" width="100%" height="100%"><path d="M546.942134 511.818772l327.456957-326.128977c9.617355-9.577423 9.648071-25.135361 0.070648-34.751692-9.577423-9.617355-25.137409-9.647048-34.750668-0.070648L512.119795 477.137729 184.520518 150.868479c-9.616331-9.577423-25.176316-9.545683-34.751692 0.070648-9.577423 9.616331-9.545683 25.174268 0.070648 34.751692l327.457981 326.127953-327.457981 326.128978c-9.616331 9.577423-9.647048 25.135361-0.070648 34.751692a24.496456 24.496456 0 0 0 17.41117 7.231702 24.500552 24.500552 0 0 0 17.340522-7.162078L512.119795 546.499816l327.599276 326.26925a24.492361 24.492361 0 0 0 17.340522 7.162078 24.5026 24.5026 0 0 0 17.41117-7.231702c9.577423-9.617355 9.545683-25.175292-0.070648-34.751692L546.942134 511.818772z" fill="#ffffff" p-id="2020"></path></svg>
            </div>}
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}