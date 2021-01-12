/*共用的*/
import React from 'react'
/*antd-mobile*/
import {ImagePicker, Modal} from 'antd-mobile';
import ImgItem from './ImgItem'
/*当前页面用到的*/
import ImgBtn from '../ImgBtn'
import imgbtn from './img/imgbtn.png';
/*自定义类*/
import './Component.less'
import PropTypes from "prop-types";

export default class RichUploadAttach extends React.Component {
    static propTypes = {
        change: PropTypes.func.isRequired,
        apiupload: PropTypes.string.isRequired,
        apidel: PropTypes.string,//.isRequired
        choosecount: PropTypes.number,//.isRequired   //一次上传图片的数量。
        debug: PropTypes.bool//.isRequired,
    };
    state = {
        imglist: [],
    };

    //  外部调用的,添加列表
    addImg(url, id){
        var imglist = this.state.imglist;
        imglist.push({url, key: url, id, visitUrl: url});
        this.setState({imglist: imglist})
    }


    //  内部更新state list
    _addImg(url, key = null, id = "no"){
        const imglist = this.state.imglist;
        if (!key) {
            key = url;
        }
        imglist.push({url, key, id});
        this.setState({imglist});
        if (key.length > 50) key = key.substr(0, 10) + "[图片base64]"
    }

    //  微信媒体id，上传服务器后返回的id
    _setImgId(key, id, visitUrl){
        // alert("_setImgId#1:key:"+key+"id:"+id+" imglist:"+this.__getImglistDebugInfo())
        var isOk = true;
        var imglist = this.state.imglist;
        for (var i = 0; i < imglist.length; i++) {
            var item = imglist[i];
            if (item.key === key) {
                imglist[i].id = id;
                imglist[i].visitUrl = visitUrl;
                imglist[i].url = visitUrl;
                isOk = false;
                break;
            }
        }
        this.setState({imglist: imglist});
        return isOk;
    }

    ImgItemClose(data){
        let {key} = data;
        var imglist = this.state.imglist;
        for (var i = 0; i < imglist.length; i++) {
            var item = imglist[i];
            if (item.key === key) {
                imglist.splice(i, 1);
                break;
            }
        }
        this.setState({imglist: imglist})
    }

    ImgItemClick(data){
        debugger
        console.log("点击图片:" + JSON.stringify(data));
        let url = data.visitUrl;
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        });
        this.props.change("img_click", data);
        // window.location.href=data.visitUrl
    }

    uploadImgFile = async (e) => {
        e.persist();
        const result = new Promise(resolve => {
            wx.checkJsApi({
                jsApiList: ['chooseImage', 'uploadImage', 'getLocalImgData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res){
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    console.clear();
                    console.log(res.checkResult);
                    resolve(true);
                }
            });
        });
        if (!result) {
            return;
        }

        console.log(this);
        let choosecount = this.props.choosecount || 1;
        wx.chooseImage({
            count: choosecount, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            fail: () => {
                if (JSON.stringify(arguments) !== '{}') {
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
                                if (localData.indexOf('data:image') !== 0) {
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
                                let cformData = {mediaId: serverId};
                                window.POST({url: THIS.props.apiupload, cformData}).then((data) => {
                                    //成功
                                    // alert("返回的数据:"+JSON.stringify(data))
                                    if (!data.isSucess) return;
                                    // let visitUrl=data.data.visitUrl;
                                    let id = data.data.id;
                                    let visitUrl = data.data.visitUrl;
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
    };

    isVideo(url){
        // console.log("isVideo:",url,typeof url)
        if (typeof url == "string") {
            let arr = url.split(".");
            let ext = arr[arr.length - 1].toLowerCase();
            // alert("video ext:"+ext)
            if (ext === "mp4" || ext === "mov") {
                return true
            }
        }
        return false;
    }


    render(){
        let imglist = this.state.imglist;
        return <div className={"Components-RichUploadAttach-container"}>
            {false ? <ImagePicker/> : null}
            <div className={"am-image-picker"}>
                <div className={"am-image-picker-list"} role="group">
                    <div className={"am-flexbox am-flexbox-align-center"} style={{flexWrap: "wrap"}}>
                        {imglist.map((item, index) => {
                            let img = item.url;
                            if (this.isVideo(img)) {
                                // return <VideoItem key={index} data={item} click={(data) => this.videoItemClick(data)}
                                //                   close={(data) => this.videoItemClose(data)}/>
                            } else {
                                return <ImgItem key={index} data={item} img={img}
                                                remove={(data) => this.ImgItemClose(data)}
                                                click={(data) => this.ImgItemClick(data)}/>
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className={"btnpadlist"}>
                <ImgBtn src={imgbtn} click={(e) => this.uploadImgFile(e)}/>
            </div>
        </div>;
    }
}
