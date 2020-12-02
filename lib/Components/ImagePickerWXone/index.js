/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
/*antd-mobile*/
import { ImagePicker } from 'antd-mobile';
/*当前页面用到的*/
import ImgItem from '../ImagePickerH5/ImgItem'
/*自定义类*/
import './Component.less'
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
    // state = {
    //     imglist:[]
    // }
    // __getImglistDebugInfo(){
    //     var imglist=this.state.imglist
    //     var temInfo=[];
    //     for (var i=0;i<imglist.length;i++) {
    //         var item = imglist[i];
    //         var key=item.key;
    //         var id=item.id;
    //         if (key.length>50) key = key.substr(0,10)+"[图片base64]"
    //         temInfo.push({key,id})
    //     }
    //     return JSON.stringify(temInfo)
    // }
    // //外部调用的,添加列表
    // addImg(url,id){
    //     var imglist=this.state.imglist
    //     //var imglist = []
    //     imglist.push({url,key:url,id,visitUrl:url})
    //     this.setState({imglist:imglist})
    // }
    // getData(noUrl=true){
    //     if (noUrl){
    //         let imglist=this.state.imglist
    //         var arr=[];
    //         for (var i=0;i<imglist.length;i++){
    //             let {key,id,visitUrl}=imglist[i]
    //             arr.push({key,id,visitUrl})
    //         }
    //         return arr;
    //     }
    //     return this.state.imglist
    // }
    // //内部更新state list
    // _addImg(url,key=null,id="no"){
    //     alert("addImg#1:key:"+key+" id:"+id)
    //     var imglist=[this.state.imglist]
    //     if (!key) key=url
    //     imglist.push({url,key,id})
    //     this.setState({imglist:imglist})
    //     if (key.length>50) key = key.substr(0,10)+"[图片base64]"
    //     alert("addImg:key:"+key+" id:"+id+" imglist:"+this.__getImglistDebugInfo())

    // }
    // //微信媒体id，上传服务器后返回的id
    // _setImgId(key,id,visitUrl){
    //     alert("_setImgId#1:key:"+key+"id:"+id+" imglist:"+this.__getImglistDebugInfo())
    //     var isOk=true;
    //     var imglist=this.state.imglist
    //     for (var i=0;i<imglist.length;i++){
    //         var item=imglist[i];
    //         if (item.key==key){
    //             imglist[i].id = id;
    //             imglist[i].visitUrl=visitUrl
    //             isOk=false;
    //             break;
    //         }
    //     }
    //     alert("_setImgId:"+this.__getImglistDebugInfo())
    //     return isOk;
    // }
    // ImgItemClose(data){
    //     let {key,id}=data;
    //     var imglist=this.state.imglist
    //     for (var i=0;i<imglist.length;i++){
    //         var item=imglist[i];
    //         if (item.key==key){
    //             imglist.splice(i, 1);
    //           break;
    //         }
    //     }
    //     this.setState({imglist:imglist})
    // }
    ImgItemClick(data){
       // alert("点击图片:"+JSON.stringify(data))
    }

    uploadFile(){
        if (!window.isWeiXin()){
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
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            fail:(e)=>{
                if (JSON.stringify(arguments)!='{}'){
                    //this.props.change("chooseImage_fail",arguments)
                }
                alert("网络不好，请重新选择")
            },
            success: (res)=>{
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                alert("localIds:"+JSON.stringify(localIds))
                // this.props.change("chooseImage",res)
                //返回的格式：
                //["wxLocalResource://xxxxxx"]
                var THIS=this;
                wx.getLocalImgData({
                    localId: localIds[0], // 图片的localID
                    success: res=> {
                        var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                        if (localData.indexOf('data:image') != 0) {
                            localData = 'data:image/jpeg;base64,' + localData
                        }
                        //alert("getLocalImgData success localId:"+localIds+"localIds:"+JSON.stringify(localIds))
                        // THIS._addImg(localData,localIds)
                    }
                });
                wx.uploadImage({
                    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImeage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success:  (res1) =>{
                        var serverId = res1.serverId; // 返回图片的服务器端ID
                        // this.props.change("uploadImage",res1)
                        //alert("uploadImage success serverId:"+serverId)
                        let cformData={mediaId:serverId}
                        // let prefix="http://211.159.163.183:9090/mock/150/";
                        window.POST({ url: "user/common/uploadFileByMediaId",cformData}).then((data)=>{
                            //成功
                            //alert("返回的数据:"+JSON.stringify(data))
                            if (!data.isSucess) return;
                            // let visitUrl=data.data.visitUrl;
                            let id=data.data.id;
                            let visitUrl=data.data.visitUrl
                        },()=>{
                            //失败
                        })
                    },
                    fail:()=>{
                        if (JSON.stringify(arguments)!='{}'){
                            alert("uploadImage fail:",JSON.stringify(arguments))
                            // this.props.change("uploadImage_fail",arguments)
                        }
                        //alert("失败"+JSON.stringify(arguments))
                    }
                });

            }
        });
    }
    render() {
       // let imglist=this.state.imglist
        return <div className={"Components-ImagePickerWX-container"}>
        {/* {1==2?<ImagePicker/>:null} */}
    <div className={"Components-lib-WXImagePicker-container"}>
            <div className={"am-image-picker"}>
                <div className={"am-image-picker-list"} role="group">
                    <div className={"am-flexbox am-flexbox-align-center"} style={{flexWrap:"wrap"}}>
            {/* {imglist.map((item,index)=>{
                let img=item.url;
                return <ImgItem key={index} data={item} img={img} remove={(data)=>this.ImgItemClose(data)} click={(data)=>this.ImgItemClick(data)}/>
            })} */}
                            <div className={"am-flexbox-item"} onClick={()=>this.uploadFile()}>
                                <div className={"am-image-picker-item am-image-picker-upload-btn"}>
                                    add
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    </div>
        </div>;
    }
}