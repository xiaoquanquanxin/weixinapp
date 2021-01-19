/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
/*antd-mobile*/
import {ImagePicker} from 'antd-mobile';
/*当前页面用到的*/
import ImgItem from '../ImagePickerH5/ImgItem'
import ImgZoomHOC from '../../../src/Components/pub/ImgZoomHOC';

/*自定义类*/
import './Component.less'

@ImgZoomHOC('')
export default class ImagePickerWX extends React.Component {
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
        change: PropTypes.func.isRequired,
        apiupload: PropTypes.string.isRequired,
        apidel: PropTypes.string,//.isRequired
        choosecount: PropTypes.number//.isRequired   //一次上传图片的数量。
    }
    state = {
        imglist: []
    }
    static defaultProps = {
        change: function (){
        }
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
    addImg(url, id, mediaId = "no"){
        var imglist = this.state.imglist
        imglist.push({url, key: url, id, visitUrl: url, mediaId})
        this.setState({imglist: imglist})
    }

    //返回所有数据
    getData(noUrl = true){
        if (noUrl) {
            let imglist = this.state.imglist
            var arr = [];
            for (var i = 0; i < imglist.length; i++) {
                // let {key,id,visitUrl}=imglist[i]
                arr.push(imglist[i])
            }
            return arr;
        }
        return this.state.imglist
    }

    //只返回MediaIds信息，多个用逗号隔开
    getDataMediaIds(){
        let imglist = this.state.imglist
        var arr = [];
        for (var i = 0; i < imglist.length; i++) {
            imglist[i].mediaId && arr.push(imglist[i].mediaId)
        }
        return arr.join(',')
    }

    getDataIds(){
        let imglist = this.state.imglist
        var arr = [];
        for (var i = 0; i < imglist.length; i++) {
            imglist[i].id && arr.push(imglist[i].id)
        }
        return arr.join(',')
    }

    //内部更新state list
    _addImg(url, key = null, id = "no", mediaId = "no"){
        // alert("addImg#1:key:"+key+" id:"+id)
        var imglist = this.state.imglist
        if (!key) key = url
        imglist.push({url, key, id, mediaId})
        this.setState({imglist: imglist})
        if (key.length > 50) key = key.substr(0, 10) + "[图片base64]"
        // alert("addImg:key:"+key+" id:"+id+" imglist:"+this.__getImglistDebugInfo())

    }

    //微信媒体id，上传服务器后返回的id
    _setImgId(key, id, visitUrl, mediaId){
        // alert("_setImgId#1:key:"+key+"id:"+id+" imglist:"+this.__getImglistDebugInfo())
        var isOk = true;
        var imglist = this.state.imglist
        for (var i = 0; i < imglist.length; i++) {
            var item = imglist[i];
            if (item.key == key) {
                imglist[i].id = id;
                imglist[i].visitUrl = visitUrl
                imglist[i].mediaId = mediaId
                isOk = false;
                break;
            }
        }
        // alert("_setImgId:"+this.__getImglistDebugInfo())
        return isOk;
    }

    ImgItemClose(data){
        this.props.ImgItemClosefun(data)
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
        // alert("点击图片:"+JSON.stringify(data))
        console.log("visitUrl", data, data.visitUrl);
        let visitUrl = data.visitUrl;
        this.props.onClick(data.url)
        // wx.previewImage({
        //     current:visitUrl, // 当前显示图片的http链接
        //     urls: [visitUrl] // 需要预览的图片http链接列表
        // });
    }

    async uploadFile(e){
        e.persist();
        console.clear();
        const result = await new Promise(resolve => {
            wx.checkJsApi({
                jsApiList: ['chooseImage', 'uploadImage', 'getLocalImgData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res){
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    // console.clear();
                    const {chooseImage, uploadImage} = res.checkResult;
                    console.log(`chooseImage:${chooseImage} uploadImage:${uploadImage}`);
                    resolve(chooseImage);
                }
            });
        });
        console.log(result);
        if (!result) {
            return;
        }
        console.log('可以打开微信选择图片api');
        const THIS = this;
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            fail: (fail) => {
                console.log('fail');
                console.log(fail);
                // if (JSON.stringify(arguments) !== '{}') {
                //     this.props.change("chooseImage_fail", arguments)
                // }
            },
            success: (res) => {
                const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                // this.props.change("chooseImage",res)
                //返回的格式：
                //["wxLocalResource://xxxxxx"]
                const isIOS = window.OSInfo().toLowerCase() === "ios";
                for (let i = 0; i < localIds.length; i++) {
                    //localData
                    (function (i){
                        if (isIOS) {
                            wx.getLocalImgData({
                                localId: localIds[i], // 图片的localID
                                success: res => {
                                    debugger
                                    var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                                    if (localData.indexOf('data:image') !== 0) {
                                        localData = 'data:image/jpeg;base64,' + localData
                                    }
                                    // alert("getLocalImgData success localId:"+localIds[i]+"localIds:"+JSON.stringify(localIds)+",i:"+i)
                                    THIS._addImg(localData, localIds[i])
                                }
                            });
                        }

                        wx.uploadImage({
                            localId: localIds[i], // 需要上传的图片的本地ID，由chooseImeage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: (res1) => {
                                debugger
                                var serverId = res1.serverId; // 返回图片的服务器端ID
                                THIS.props.change("uploadImage", res1);
                                // alert("uploadImage success serverId:"+serverId)
                                let cformData = {mediaId: serverId};
                                window.POST({url: THIS.props.apiupload, cformData}).then((data) => {
                                    console.log('接口请求');
                                    console.log(data);
                                    debugger;
                                    //成功
                                    // alert("返回的数据:"+JSON.stringify(data))
                                    if (!data.isSucess) return;
                                    const {id, visitUrl, mediaId} = data.data;
                                    THIS.props.getDataImgID(id, visitUrl, mediaId);
                                    if (!isIOS) {
                                        THIS._addImg(visitUrl, localIds[i], id, mediaId);
                                    }
                                    THIS._setImgId(localIds[i], id, visitUrl, mediaId);
                                }, () => {
                                    //失败
                                })
                            },
                            fail: (fail) => {
                                console.log('fail');
                                console.log(fail);
                                // if (JSON.stringify(arguments) !== '{}') {
                                //     // alert("uploadImage fail:",JSON.stringify(arguments))
                                //     THIS.props.change("uploadImage_fail", arguments)
                                // }
                            }
                        });
                    })(i);
                }
            }
        });
    }

    render(){
        let imglist = this.state.imglist;
        return <div className={"Components-ImagePickerWX-container"}>
            <div className={"Components-lib-WXImagePicker-container"}>
                <div className={"am-image-picker"}>
                    <div className={"am-image-picker-list"} role="group">
                        <div className={"am-flexbox am-flexbox-align-center"} style={{flexWrap: "wrap"}}>
                            {imglist.map((item, index) => {
                                let img = item.url;
                                return <ImgItem key={index} data={item} img={img}
                                                remove={(data) => this.ImgItemClose(data)}
                                                click={(data) => this.ImgItemClick(data)}/>
                            })}
                            <div className={"am-flexbox-item"} onClick={(e) => this.uploadFile(e)}>
                                <div className={"am-image-picker-item am-image-picker-upload-btn"}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
