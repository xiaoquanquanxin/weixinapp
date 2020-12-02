/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import {
	Modal,
	Picker,
	WhiteSpace,
	Toast,
	TextareaItem,
	List,
	WingBlank,
} from 'antd-mobile';

import Mybutton from '../../pub/MyButton';
import router from '../../../router'
import constant from '../../../constant';
import VerificationParameter from '../../pub/VerificationParameter';
import RadioLine from "./RadioBoxItem"
import ImgZoomHOC from '../../pub/ImgZoomHOC';
// import EmptyStoreData from '../../pub/EmptyStoreData';
import RichUploadAttach from '../../../../lib/Components/RichUploadAttach'
/*当前页面用到的*/
/*const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);*/

/*自定义类*/
import './Component.less';
import Intercept from '../../Intercept';
import config from '../../../config.js'
@ImgZoomHOC('')
// @Intercept('')
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	static defaultProps = {};
	state = {
		date: "",
		colorStyle: false,
		radioDate : [
			{label:"室内",value:"1"},
			{label:"室外",value:"2" }
		]
	};
	componentDidMount () {
		//console.log('[Template] componentDidMount..')
		const { store, actions } = this.props;
		const { storeAddRepairYu } = store;
		const { actionsAddRepairYu } = actions;
        actionsAddRepairYu.init();
		storeAddRepairYu.type = this.props.match.params.type;
		//console.log(123441,storeAddRepairYu.type)
		//storeAddRepairYu.AddRepair.type = this.props.match.params.type;
		window.setWindowTitle(this.props.match.params.type==1?'房屋报修':'投诉建议');
		actionsAddRepairYu.getRoomInfo();
		//获取该报修/投诉的下拉框选项
		actionsAddRepairYu.getRadioInfo();
        // this.refs.RUA.addImg("abc.mp4","abc.mp4")
	}
	//检查按纽状态
	
	/*输入描述*/
	onChange = (e) => {
		const { store } = this.props;
		const { storeAddRepairYu } = store;
		const { AddRepair } = storeAddRepairYu;
		
	};
	//提交
	submit = () =>{
        const { store, actions} = this.props;
        const {colorStyle}= store.storeAddRepairYu
        const {problemDescription,appealNature} = store.storeAddRepairYu.AddRepair
        // console.log("colorStyle,appealNature,problemDescription",colorStyle,appealNature,problemDescription)
        if (!colorStyle){
        	if (!appealNature||appealNature=="") return Toast.info(`请选择类型`, 1);
        	if (!problemDescription||problemDescription=="")  return Toast.info(`请填写问题描述`, 1);
            Toast.info(`填写不全`, 1);
        	return;
		}

        // console.log("submit:",JSON.stringify(this.refs.RUA.getData()))
		let aData=this.refs.RUA.getData();
        let voicelist=aData.voicelist;
        let recordCollection=[]
		for (var i=0;i<voicelist.length;i++){
            recordCollection.push(voicelist[i].id)
		}
        let ivlist=aData.ivlist;
        let imageCollection=[]
        let videoCollection=[]
        function isAssetTypeAnImage(ext) {
            return [
                'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
            indexOf(ext.toLowerCase()) !== -1;
        }
        for (var i=0;i<ivlist.length;i++){
        	//判断是不是图片
			var filePath=ivlist[i].visitUrl
			var id=ivlist[i].id
            //获取最后一个.的位置
            var index= filePath.lastIndexOf(".");
			//获取后缀
            var ext = filePath.substr(index+1);
            if (isAssetTypeAnImage(ext)){
                imageCollection.push(id)
			}else{
                videoCollection.push(id)
			}
        }
        // console.log("videoCollection:",videoCollection)
        // console.log("imageCollection:",imageCollection)
        // console.log("recordCollection:",recordCollection)
        videoCollection=videoCollection.join(',')
        imageCollection=imageCollection.join(',')
        recordCollection=recordCollection.join(',')


		const { actionsAddRepairYu } = actions;
		actionsAddRepairYu.submit(videoCollection,imageCollection,recordCollection).then((data)=>{
			//console.log("上报成功");
			//this.props.history.push(`${router.SubmitSucessYu}?id=${data.data.id}&code=${data.data.code}$type=${storeAddRepairYu.type}`);
			// console.log("判断三生三世", this.props.match.params.type)
			this.props.history.push(`${router.SubmitSucessYu[0]}` + "/" + this.props.match.params.type);
		})
	}
    change_RichUploadAttach(t,msg) {
        console.log("change_RichUploadAttach:",t,msg)
    }
	render () {
        let apiupload="user/common/uploadFileByMediaId";
        let apidel="";
        let uploadonefile_api=config.urlPrefix+"user/common/uploadFile";
		const { store, actions } = this.props;
		const { files } = this.state;
		const { storeAddRepairYu } = store;
		const { actionsAddRepairYu} = actions;
		const { colorStyle, AddRepair, roomData} = storeAddRepairYu;
		const { _checkForm } = actionsAddRepairYu
		//默认预约时间（不选择）
		//AddRepair.appointmentTime = new Date(this.state.date).format('yyyy-MM-dd hh:mm:ss');
		return <div className={'Components-RepairYu-AddRepair-container'} >
			<List className={'RepairYu-List'}>
				<Picker
					data={roomData}
					cols={1}
					extra="请选择"
					value={[AddRepair.pkRoom]}
					// onChange={v => {
					// 	//this.setState({ sValue: v });
					// }}
					onOk={(v) => {
						AddRepair.pkRoom = v + '';//注入store
						//this.setState({ sValue: v });
						actionsAddRepairYu.changeRoom(...v);
						_checkForm(AddRepair);	//检查是否有空项，选修改提交按纽状态
					}
					}
				>
					<List.Item arrow="horizontal" multipleLine >房间名称</List.Item >
				</Picker >
				<List.Item multipleLine>
					<RadioLine callback={actionsAddRepairYu.radioCheck} data={storeAddRepairYu.radioData}/>
				</List.Item >
			</List>
			<WhiteSpace size="lg" />
				<p className="text-areaTitle">问题描述</p>
				<TextareaItem
					placeholder="输入问题描述"
					data-seed="logId"
					autoHeight
					count={350}
					rows={6}
					editable={true}
					onChange={(e)=>{
						AddRepair.problemDescription = e;
						_checkForm(AddRepair);
					}
						}
					/>
			<WhiteSpace size="lg" />

			<WingBlank >

				<div className={'upload-img'} >
					<p className={'upload-img-title'} >附件</p >
					<div className={'upload-img-list'} >
						<RichUploadAttach ref="RUA"  debug={false} change={(t,msg)=>this.change_RichUploadAttach(t,msg)} apiupload={apiupload} apidel={apidel} uploadonefile_api={uploadonefile_api}/>
					</div >
				</div >
			</WingBlank >
			<WhiteSpace size="lg" /><WhiteSpace size="lg" />
			<WingBlank >
				<Mybutton callback={this.submit}
					type={colorStyle ? 'blue' : 'grey'} label="提交" />
			</WingBlank >
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
		</div >;
	}

}