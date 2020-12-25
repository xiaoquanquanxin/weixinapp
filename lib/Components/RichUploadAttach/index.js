/*共用的*/
import React from 'react'
//import PropTypes from 'prop-types'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import {ImagePicker, Modal} from 'antd-mobile';


import ImgItem from './ImgItem'
import opentIframeView from '../IframeView'
/*当前页面用到的*/
import SoundPad from '../SoundPad'
import ImgBtn from '../ImgBtn'
import UpLoadOneFile from '../UpLoadOneFile'
import imgbtn from './imgbtn.png';
import soundbtn from './soundbtn.png';
import vidiobtn from './vidiobtn.png';
import WaitingTip from '../UpLoadOneFile/WaitingTip.js'
import VideoItem from './VideoItem.js'
/*自定义类*/
import './Component.less'
import PropTypes from "prop-types";

export default class RichUploadAttach extends React.Component {
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
        change: PropTypes.func.isRequired,//type img_upload,img_click,img_del,video_click,video_del
        apiupload: PropTypes.string.isRequired,
        apidel: PropTypes.string,//.isRequired
        choosecount: PropTypes.number,//.isRequired   //一次上传图片的数量。
        debug: PropTypes.bool//.isRequired,
    }
    state = {
        imglist: [],
        voicelist: []
    }

    __getImglistDebugInfo(){
        var imglist = this.state.imglist
        var temInfo = [];
        for (var i = 0; i < imglist.length; i++) {
            var item = imglist[i];
            var key = item.key;
            var id = item.id;
            if (key.length > 50) key = key.substr(0, 10) + "[图片base64]"
            temInfo.push({key, id})
        }
        return JSON.stringify(temInfo)
    }

    //外部调用的,添加列表
    addImg(url, id){
        var imglist = this.state.imglist
        imglist.push({url, key: url, id, visitUrl: url})
        this.setState({imglist: imglist})
    }

    getData(noUrl = true){
        var arrReturn = {}
        arrReturn.voicelist = this.state.voicelist
        if (noUrl) {
            let imglist = this.state.imglist
            var arr = [];
            for (var i = 0; i < imglist.length; i++) {
                let {key, id, visitUrl} = imglist[i]
                arr.push({key, id, visitUrl})
            }
            arrReturn.ivlist = arr
            return arrReturn;
        }
        arrReturn.ivlist = this.state.imglist
        return arrReturn
    }

    //内部更新state list
    _addImg(url, key = null, id = "no"){
        // alert("addImg#1:key:"+key+" id:"+id)
        var imglist = this.state.imglist
        if (!key) key = url
        imglist.push({url, key, id})
        this.setState({imglist: imglist})
        if (key.length > 50) key = key.substr(0, 10) + "[图片base64]"
        // alert("addImg:key:"+key+" id:"+id+" imglist:"+this.__getImglistDebugInfo())
    }

    //微信媒体id，上传服务器后返回的id
    _setImgId(key, id, visitUrl){
        // alert("_setImgId#1:key:"+key+"id:"+id+" imglist:"+this.__getImglistDebugInfo())
        var isOk = true;
        var imglist = this.state.imglist
        for (var i = 0; i < imglist.length; i++) {
            var item = imglist[i];
            if (item.key == key) {
                imglist[i].id = id;
                imglist[i].visitUrl = visitUrl
                imglist[i].url = visitUrl
                isOk = false;
                break;
            }
        }
        this.setState({imglist: imglist})
        // alert("_setImgId:"+this.__getImglistDebugInfo())
        return isOk;
    }

    ImgItemClose(data){
        let {key, id} = data;
        var imglist = this.state.imglist
        for (var i = 0; i < imglist.length; i++) {
            var item = imglist[i];
            if (item.key == key) {
                imglist.splice(i, 1);
                break;
            }
        }
        this.setState({imglist: imglist})
    }

    ImgItemClick(data){
        debugger
        console.log("点击图片:" + JSON.stringify(data))
        let url = data.visitUrl
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        });
        this.props.change("img_click", data);
        // window.location.href=data.visitUrl
    }

    videoItemClose(data){
        // alert("视频close data:"+JSON.stringify(data))
        this.ImgItemClose(data)
        this.props.change("img_del", data);
    }

    videoItemClick(data){
        // alert("查看视频 data:"+JSON.stringify(data))
        opentIframeView("videoview", data.visitUrl)
        this.props.change("video_click", data);
    }

    closevoicelist(data){
        console.log("closevoicelist:", data, "voicelist:", voicelist)
        var voicelist = this.state.voicelist
        for (var i = 0; i < voicelist.length; i++) {
            var item = voicelist[i];
            if (data.id == item.id) {
                voicelist.splice(i, 1)
                break;
            }
        }
        this.setState({voicelist: voicelist})
        this.props.change("sound_del", data);
    }

    uploadImgFile(){
        if (!window.isWeiXin()) {
            alert("请用微信打开")
        }
        /*wx.checkJsApi({
            jsApiList: ['chooseImage','uploadImage','getLocalImgData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                alert("checkJsApi:"+JSON.stringify(res))
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });*/
        debugger
        let choosecount = this.props.choosecount || 1
        wx.chooseImage({
            count: choosecount, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            fail: () => {
                if (JSON.stringify(arguments) != '{}') {
                    this.props.change("chooseImage_fail", arguments)
                }
            },
            success: (res) => {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                // this.props.change("chooseImage",res)
                //返回的格式：
                //["wxLocalResource://xxxxxx"]
                var THIS = this;
                for (var i = 0; i < localIds.length; i++) {
                    //localData
                    (function (i){
                        wx.getLocalImgData({
                            localId: localIds[i], // 图片的localID
                            success: res => {
                                var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                                if (localData.indexOf('data:image') != 0) {
                                    localData = 'data:image/jpeg;base64,' + localData
                                }
                                // alert("getLocalImgData success localId:"+localIds[i]+"localIds:"+JSON.stringify(localIds)+",i:"+i)
                                THIS._addImg(localData, localIds[i])
                            }
                        });
                        wx.uploadImage({
                            localId: localIds[i], // 需要上传的图片的本地ID，由chooseImeage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: (res1) => {
                                var serverId = res1.serverId; // 返回图片的服务器端ID
                                // this.props.change("uploadImage",res1)
                                // alert("uploadImage success serverId:"+serverId)
                                let cformData = {mediaId: serverId}
                                window.POST({url: THIS.props.apiupload, cformData}).then((data) => {
                                    //成功
                                    // alert("返回的数据:"+JSON.stringify(data))
                                    if (!data.isSucess) return;
                                    // let visitUrl=data.data.visitUrl;
                                    let id = data.data.id;
                                    let visitUrl = data.data.visitUrl
                                    THIS.props.change("img_upload", data);
                                    THIS._setImgId(localIds[i], id, visitUrl)
                                }, () => {
                                    //失败
                                })
                            },
                            fail: () => {
                                if (JSON.stringify(arguments) != '{}') {
                                    alert("uploadImage fail:", JSON.stringify(arguments))
                                    // this.props.change("uploadImage_fail",arguments)
                                }
                            }
                        });
                    })(i)
                }
            }
        });
    }

    UpLoadOneFile_callbackState(t, msg, file){
        console.log("UpLoadOneFile_callbackState:", file)
        switch (t) {
            case 1://开始
                console.log("开始:", msg)
                this.props.change("video_upload", "开始");
                if (this.$upLoadOneFile_waitingTip) {
                    this.$upLoadOneFile_waitingTip.remove();
                    this.$upLoadOneFile_waitingTip_tip = null;
                    this.$upLoadOneFile_waitingTip = null;
                }
                this.$upLoadOneFile_waitingTip = WaitingTip.show("上传")
                this.$upLoadOneFile_waitingTip_tip = this.$upLoadOneFile_waitingTip.find(".loading-tip .txt-tip")
                break;
            case 2://上传中
                // console.log("上传中:",msg)
                if (!this.$upLoadOneFile_waitingTip) {
                    this.$upLoadOneFile_waitingTip = WaitingTip.show("上传")
                    this.$upLoadOneFile_waitingTip_tip = this.$upLoadOneFile_waitingTip.find(".loading-tip .txt-tip")
                }
                this.$upLoadOneFile_waitingTip_tip.html("上传" + msg)
                this.props.change("video_upload", msg);
                break;
            case 3://上传完成
                // console.log("上传完成:",msg)
                if (this.$upLoadOneFile_waitingTip) {
                    if (this.$upLoadOneFile_waitingTip) {
                        this.$upLoadOneFile_waitingTip_tip = null;
                        this.$upLoadOneFile_waitingTip.remove();
                        this.$upLoadOneFile_waitingTip = null;
                    }
                }
                let visitUrl = msg.data[0].visitUrl;
                this.addImg(visitUrl, msg.data[0].id)
                // this.props.change("video_upload","上传完成");
                break;
            case -1: //出错
                // console.log("出错:",msg)
                if (this.$upLoadOneFile_waitingTip) {
                    if (this.$upLoadOneFile_waitingTip) {
                        this.$upLoadOneFile_waitingTip_tip = null;
                        this.$upLoadOneFile_waitingTip.remove();
                        this.$upLoadOneFile_waitingTip = null;
                    }
                }
                break;
            default:
                break;
        }
    }

    updateSound(localId){
        var THIS = this;
        wx.uploadVoice({
            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res){
                var serverId = res.serverId; // 返回音频的服务器端ID
                let cformData = {mediaId: serverId}
                window.POST({url: THIS.props.apiupload, cformData}).then((data) => {
                    //成功
                    // alert("返回的数据:"+JSON.stringify(data))
                    THIS.props.change("voice_upload", data)
                    if (!data.isSucess) return;
                    // let visitUrl=data.data.visitUrl;
                    // let visitUrl=data.data.visitUrl
                    let voicelist = THIS.state.voicelist
                    voicelist.push(data.data)
                    THIS.setState({voicelist: voicelist})

                }, () => {
                    //失败
                })
            }
        });
    }

    soundRecording(e){
        if (!window.isWeiXin()) {
            alert("请用微信打开")
        }
        var THIS = this;
        Modal.alert('开始录音', '正在录音中..', [
            {
                text: '停止', onPress: () => {
                    wx.stopRecord({
                        fail: () => {
                            alert("stopRecord fail:" + JSON.stringify(arguments))
                        },
                        success: (res) => {
                            // alert(JSON.stringify(res))
                            var localId = res.localId;
                            // alert(JSON.stringify(localId))
                            // alert(THIS.updateSound)
                            THIS.updateSound(localId)
                        }
                    });
                }
            },
        ])
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: (res) => {
                var localId = res.localId;
                // alert(JSON.stringify(localId))
                // alert(THIS.updateSound)
                THIS.updateSound(localId)
            }
        });
        wx.startRecord();
    }

    isVideo(url){
        // console.log("isVideo:",url,typeof url)
        if (typeof url == "string") {
            let arr = url.split(".")
            let ext = arr[arr.length - 1].toLowerCase()
            // alert("video ext:"+ext)
            if (ext == "mp4" || ext == "mov") return true
        }
        return false;

    }

    render(){
        let imglist = this.state.imglist
        let voicelist = this.state.voicelist
        var UpLoadOneFile_api = this.props.uploadonefile_api;
        var sessionKey = window.getLocalData("auth")
        var UpLoadOneFile_apiHeader = {sessionKey}
        var isDebug = !!this.props.debug;


        return <div className={"Components-RichUploadAttach-container"}>
            {1 == 2 ? <ImagePicker/> : null}
            <div className={"am-image-picker"}>
                <div className={"am-image-picker-list"} role="group">
                    <div className={"am-flexbox am-flexbox-align-center"} style={{flexWrap: "wrap"}}>
                        {imglist.map((item, index) => {
                            let img = item.url;
                            if (this.isVideo(img)) {
                                return <VideoItem key={index} data={item} click={(data) => this.videoItemClick(data)}
                                                  close={(data) => this.videoItemClose(data)}/>
                            } else {
                                return <ImgItem key={index} data={item} img={img}
                                                remove={(data) => this.ImgItemClose(data)}
                                                click={(data) => this.ImgItemClick(data)}/>
                            }
                        })}
                    </div>
                </div>
            </div>
            <div>{voicelist.map((item, index) => {
                return <SoundPad key={index} data={item} close={(data) => this.closevoicelist(data)}/>
            })}</div>
            <div className={"btnpadlist"}>
                <ImgBtn src={imgbtn} click={(e) => this.uploadImgFile(e)}/>
                {/*  <UpLoadOneFile multiple={true} accept={"video/*"} height={"0.38rem"} width={"0.38rem"} api={UpLoadOneFile_api} apiHeader={UpLoadOneFile_apiHeader} callbackState={(t,msg,file)=>this.UpLoadOneFile_callbackState(t,msg,file)}>
                    <ImgBtn src={vidiobtn}/>
                </UpLoadOneFile>*/}
                <ImgBtn src={soundbtn} click={(e) => this.soundRecording(e)}/>
                {isDebug &&
                <ImgBtn src={soundbtn} click={(e) => alert("调试信息:获取数据:" + JSON.stringify(this.getData()))}/>}
            </div>
        </div>;
    }
}
