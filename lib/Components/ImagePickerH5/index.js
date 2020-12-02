/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
/*antd-mobile*/
import { ImagePicker } from 'antd-mobile';
/*当前页面用到的*/
import UpLoadOneFile from '../UpLoadOneFile'
import ImgItem from './ImgItem'
/*自定义类*/
import './Component.less'
export default class TemplateComponent extends React.Component {
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
    state = {
        imglist:[]
    }
    addImg(url){
        var imglist=this.state.imglist
        imglist.push({url})
        this.setState({imglist:imglist})
    }
    ImgItemClose(data){
        alert("关闭:"+JSON.stringify(data))
    }
    ImgItemClick(data){
        alert("点击图片:"+JSON.stringify(data))
    }
    pLoadOneFile_callbackState(t,msg,file) {
        switch (t) {
            case 1://开始
                console.log("开始:", msg)
                break;
            case 2://上传中
                console.log("上传中:", msg)
                break;
            case 3://上传完成
                console.log("上传完成:", msg)
                break;
            case -1: //出错
                console.log("出错:", msg)
                break;
            default:
                break;
        }
    }
    render() {
        let imglist=this.state.imglist

            var UpLoadOneFile_api="http://yxfy-uat.coli688.com:8080/file/upload";
            var sessionKey="a35c5f1b1444131fe9c1d459474646c9_1565765127126"
            var UpLoadOneFile_apiHeader={sessionKey}
        return <div className={"Components-ImagePickerH5-container"}>
        {1==2?<ImagePicker/>:null}
    <div className={"Components-lib-WXImagePicker-container"}>
            <div className={"am-image-picker"}>
                <div className={"am-image-picker-list"} role="group">
                    <div className={"am-flexbox am-flexbox-align-center"}>
            {imglist.map((item,index)=>{
                let img=item.url;
                return <ImgItem key={index} data={item} img={img} remove={(data)=>this.ImgItemClose(data)} click={(data)=>this.ImgItemClick(data)}/>
            })}
                            <div className={"am-flexbox-item"}>
                                <div className={"am-image-picker-item am-image-picker-upload-btn"}>
            <UpLoadOneFile multiple={true} accept={"image/*"} height={"1rem"} api={UpLoadOneFile_api} apiHeader={UpLoadOneFile_apiHeader} callbackState={(t,msg,file)=>this.UpLoadOneFile_callbackState(t,msg,file)}>
    </UpLoadOneFile>
                                </div>
                            </div>


                    </div>
                </div>
            </div>
    </div>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}