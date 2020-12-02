/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import {ImagePicker } from 'antd-mobile';
/*当前页面用到的*/
import VideoItem from '../RichUploadAttach/VideoItem.js'
import ImgItem from '../RichUploadAttach/ImgItem'
import SoundPad from '../SoundPad'
import playimg from '../IframeView/playimg.js'
import playvideo from '../IframeView/playvideo.js'
/*自定义类*/
import './Component.less'
export default class RichUploadAttachDisplayComponent extends React.Component {
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
        imglist: PropTypes.array.isRequired,
        voicelist: PropTypes.array.isRequired
    }
    /*state = {
        state1: ''
    }*/
    videoItemClick(data){
// alert("查看视频:"+JSON.stringify(data))
        playvideo("videoviewRichUploadAttach",data.visitUrl)
    }
    ImgItemClick(data){
        // console.log("点击图片:"+JSON.stringify(data))
        let url=data.visitUrl
        wx.previewImage({
            current:url, // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        });
    }
    isVideo(url){
        // console.log("isVideo:",url,typeof url)
        if (typeof url =="string"){
            let arr=url.split(".")
            let ext=arr[arr.length-1].toLowerCase()
            // alert("video ext:"+ext)
            if (ext=="mp4"||ext =="mov") return true
        }
        return false;
    }
    close(data){
        console.log(data)
    }
    render() {
        let imglist=this.props.imglist
        let voicelist=this.props.voicelist
        return <div className={"Components-RichUploadAttachDisplay-container"}>
            {1==2?<ImagePicker/>:null}
            <div className={"am-image-picker"}>
                <div className={"am-image-picker-list"} role="group">
                    <div className={"am-flexbox am-flexbox-align-center"} style={{flexWrap:"wrap"}}>
                        {imglist.map((item,index)=>{
                            let img=item.visitUrl;
                            if (this.isVideo(img)){
                                return <VideoItem key={index} data={item} click={(data)=>this.videoItemClick(data)}/>
                            }else{
                                return <ImgItem key={index} data={item} img={img} click={(data)=>this.ImgItemClick(data)}/>
                            }
                        })}
                    </div>
                </div>
            </div>
            <div>{voicelist.map((item,index)=>{
                return <SoundPad key={index} data={item}/>
            })}</div>
        </div>;
    }
}