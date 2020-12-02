/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './loaders.min.css'
import './Component.less'
export default class UpLoadOneFile extends React.Component {
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
        height: PropTypes.string.isRequired,//高度
        width: PropTypes.string.isRequired,//宽度
        api: PropTypes.string.isRequired,//接口地址
        callbackState: PropTypes.func.isRequired,//状态回调
        apiHeader: PropTypes.object.isRequired,
        multiple: PropTypes.bool,//多选不是单选
        accept: PropTypes.string//.isRequired,  选重文件类型 audio/*	接受所有的声音文件。   video/*	接受所有的视频文件。 image/*	接受所有的图像文件。
    }
    render() {
        let height=this.props.height
        let width=this.props.width
        let inputP={}
        let _multiple=!!this.props.multiple
        if (_multiple){
            inputP.multiple="multiple"
        }
        let accept=this.props.accept
        if (accept!=""){
            inputP.accept=accept
        }
        this.inputfileId=Math.floor(Math.random() *100000)
        return <div className={"Components-UpLoadOneFile-container"} style={{height:height,width:width}}>
            <div className={"root"} style={{height:height,width:width}}>
                {this.props.children}
                <input id={this.inputfileId} {...inputP} capture="camcorder" onChange={(e)=>this.onChange(e)} className={"input-file"} type="file"  style={{height:height,width:width}}/>
            </div>
        </div>;
    }
    _uploadfileOne(file){
        // console.log("_uploadfileOne:",file)
        var fileReader = new FileReader();
        var THIS=this;
        var callbackState=this.props.callbackState;
        fileReader.onload = function(){
            var result = this.result;
            var formData = new FormData();
            formData.append("file",file);
            //添加其他表单字段
            var headers=THIS.props.apiHeader
            // formData.append('username',document.getElementById("uname").value)
            // formData.append('pwd',document.getElementById("upwd").value);
            var $=window.JQ;
            callbackState(1,"start upload",file)
            window.JQ.ajax({
                type:"post",
                headers: headers,
                url:THIS.props.api,
                async:true,
                processData:false,
                contentType:false,
                data:formData,
                timeout:60000*30,
                xhr:()=>{
                    var xhr = $.ajaxSettings.xhr();
                    if(xhr.upload) {
                        xhr.upload.addEventListener("progress" ,(evt)=>{
                            var loaded = evt.loaded;     //已经上传大小情况
                            var tot = evt.total;      //附件总大小
                            var per = Math.floor(100*loaded/tot);  //已经上传的百分比
                            // console.log("per:"+per)
                            callbackState(2,per,file)
                        }, false);
                        return xhr;
                    }
                },
                success:function (data) {
                    callbackState(3,data,file)
                    console.log('upload success',data)
                },
                error:function (xhr,text) {
                    callbackState(-1,text,file)
                    if(text === 'timeout'){
                        alert("文件太长，请重新上传！")
                        // xhr.abort();
                    }
                }
            });
        }
        fileReader.readAsArrayBuffer(file);
    }
    onChange(e){
        //参考：https://www.fedte.cc/p/442.html
        //input的file类型的accept属性的值 https://blog.csdn.net/u013379933/article/details/77119796
        //css3 加载动画集：https://connoratherton.com/loaders
        // console.log("onChange e.target.files:",e.target.files.length,e.target.files)
        var arrFiles=[];
        var THIS=this;
        for (var i=0;i<e.target.files.length;i++){
            arrFiles.push(e.target.files[i])
        }
        function run(arrFiles) {
            // console.log("arrFiles.length:",arrFiles.length)
            if (arrFiles.length>=1){
                var _file=arrFiles.shift()
                THIS._uploadfileOne(_file)
                window.setTimeout(()=>{
                    run(arrFiles)
                },500)
            }else{
                var file = document.getElementById(THIS.inputfileId);
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值

            }
        }
        run(arrFiles);
    }
    /*componentDidMount(){
    }*/
}