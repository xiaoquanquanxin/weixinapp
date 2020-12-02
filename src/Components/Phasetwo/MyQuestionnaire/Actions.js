import { observable, action } from 'mobx';
import { Toast, Modal } from 'antd-mobile';
// 定义对数据的操作
class Actions {
	constructor(store, mainStore) {
		this.store = store;
		this.surveyId = "";
		this.type="";
		this.is_uploadMediaIds={}
	}




	/*分享link*/
	@action
	 shareFun = async(type,id) =>{
	 const isDone = window.getQueryString('isDone');
	 let headStr1='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx94c24d52e8352f8a&redirect_uri=https%3A%2F%2Fwx-life.seedland.cc%2Fwechat-mobile%2Fwx%2Fredirect%3FforwordUrl%3Dhttps%3A%2F%2Fwx-life.seedland.cc%2Findex.html%3Furl%3D';
	 let middle=encodeURIComponent('PhasetwoMyQuestionnaire/'+type+'/'+id+'/'+isDone);
		 middle=encodeURIComponent(middle);
	 let tailStrl='%26snsApi%3Dsnsapi_base&response_type=code&scope=snsapi_base&state=1599488950768#wechat_redirect';
	 let url=window.location.origin;
	 let value=url.includes('asm-test');
	 //测试
 	 console.log('value:',value)
		 if (value) {
	 	headStr1='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8866227d8f6286bb&redirect_uri=https%3A%2F%2Fasm-test.seedland.cc%2Fwechat-mobile%2Fwx%2Fredirect%3FforwordUrl%3Dhttps%253A%252F%252Fasm-test.seedland.cc%252Findex.html%253Furl%253D';
	 }
	 console.log('shareLink__:',headStr1+middle+tailStrl)
	return headStr1+middle+tailStrl
	};



	@action
	questionDetailfun = async (type, id,history,isDone) =>{
		//this.store.is_uploadMediaIds = []
		this.store.showbtn=false;
		this.surveyId = id;
		this.type = type;
		let shareSurveyName='';
		let shareSurveyDesc='';

		// console.log("type",this.type )

		// this.store.isDone = "";
	/*	let urlobj = window.getQueryString();
		if (urlobj) {
			if (urlobj.isDone) this.store.isDone = urlobj.isDone||c_isDone
		}*/
		// this.store.isDone=c_isDone

		if (type==1){
			let cformData = {
				surveyId: id,
				isDone: isDone
			};
			let result = await window.GET({ url: "user/questionaire/questionDetail", cformData, isAutoError:false })
			//if (!result.isSucess) return;
			if (result.resultCode==0){
				this.store.questionDetailDta = result.data.questionList;
				 shareSurveyName=result.data.survey.surveyName;
				 shareSurveyDesc=result.data.survey.surveyDesc;
			}
			if (result.resultCode == 1) {
				Modal.alert('提示', result.resultMsg, [
					{
						text: '确定', onPress: () => {
							history.goBack()
						}
					},
				])
			}
			if (result.resultCode == 500) {
				Modal.alert('提示', result.resultMsg, [
					{
						text: '确定', onPress: () => {
							history.goBack()
						}
					},
				])
			}

		} else if (type == 2){
			let cformData = { surveyId: id}
			let result = await window.GET({ url: "user/questionaire/questionReplyDetail", cformData })
			if (!result.isSucess) return;
			this.store.questionDetailDta = result.data.questionList
			this.store.showbtn=true;
			shareSurveyName=result.data.survey.surveyName;
			shareSurveyDesc=result.data.survey.surveyDesc;
		} else {
			let cformData = { surveyId: id }
			let result = await window.GET({ url: "user/questionaire/questionMouldDetail", cformData })
			if (!result.isSucess) return;
			this.store.questionDetailDta = result.data.questionList
			this.store.showbtn = true;
			shareSurveyName=result.data.survey.surveyName;
			shareSurveyDesc=result.data.survey.surveyDesc;
		}


		// const isDone = window.getQueryString('isDone');


		console.log('1_________', shareSurveyName)
		console.log('2_________',shareSurveyDesc)


		//分享给朋友
		wx.ready(function () {
			wx.onMenuShareAppMessage({
				title: shareSurveyName || '', // result.data.survey && result.data.survey.surveyName && result.data.survey.surveyName分享标题
				desc: shareSurveyDesc || '', //result.data.survey.surveyDesc 分享描述
				link: window.location.href,	  // 分享链接，该链接域名必须与当前企业的可信域名一致
				imgUrl:  '', // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户确认分享后执行的回调函数
					console.log('用户确认分享后执行的回调函数')
				},
				cancel: function () {

					// 用户取消分享后执行的回调函数
					console.log('用户取消分享后执行的回调函数')
				}
			});



			//分享朋友圈
			wx.onMenuShareTimeline({
				title: shareSurveyName || '', // 分享标题
				desc: shareSurveyDesc || '', // 分享描述
				link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
				imgUrl: '', // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});

		});



	};

	@action
	radiofun = (i,ii, surveyOptionId)=>{
		// this.store.questionDetailDta[i].optionList[ii].surveyOptionId = surveyOptionId
		this.store.questionDetailDta[i].optionList.forEach((vvv,iii)=>{
			this.store.questionDetailDta[i].optionList[iii].isSelected=2
		})
		this.store.questionDetailDta[i].optionList[ii].isSelected=1
		console.log(8118,this.store.questionDetailDta)
	}
	@action
	selectionfun = (i, ii, surveyOptionId) => {
		if (this.store.questionDetailDta[i].optionList[ii].isSelected == 1){
			this.store.questionDetailDta[i].optionList[ii].isSelected=2
		}else{
			this.store.questionDetailDta[i].optionList[ii].isSelected = 1
		}
	}
	@action
	inputfun = (i, optionValue)=>{
		this.store.questionDetailDta[i].optionList[0].optionValue = optionValue
		console.log("inputfun",this.store.questionDetailDta)
	}

	@action
	Verificationfun=()=>{
		let Verificationval =0
		for (let i = 0; this.store.questionDetailDta.length > i; i++) {
			let v = this.store.questionDetailDta[i]
			if (v.questionType == 1 || v.questionType == 2) {
				for (let ii = 0; v.optionList.length > ii; ii++) {
					let vv = v.optionList[ii]
					if (vv.isSelected==1){
						Verificationval = Verificationval+1
						break
					}
				}
			}
			if (v.questionType == 3){
				if (v.optionList[0].optionValue!=""){
					Verificationval = Verificationval + 1
				}

			}
			if (v.questionType == 4) {
				Verificationval = Verificationval + 1
			}

		}
		// console.log("Verificationval", Verificationval)
		if (this.store.questionDetailDta.length == Verificationval){
			return true
		}else{
			return false
		}

	}

	@action
	Submitfun = async(history) => {
		if (this.type==3){
			Modal.alert('提示', "此问卷为预览状态，不能提交", [
				{
					text: '确定', onPress: () => {
					}
				}
			])
		}else{
			console.log(9898, this.Verificationfun())
			if (this.Verificationfun()) {
				this.store.answerDetailList = []
				let surveyOptionId = ""
				this.store.questionDetailDta.forEach((v, i) => {
					// this.store.answerDetailList.push({
					//     surveyDetailId: v.surveyDetailId,
					// })
					v.optionList.forEach((vv, ii) => {
						if (v.questionType == 1) {
							if (vv.isSelected == 1) {
								this.store.answerDetailList.push({
									surveyDetailId: v.surveyDetailId,
									surveyOptionId: vv.surveyOptionId,
									answerContent: vv.optionValue
								})
								// this.store.answerDetailList[i].surveyOptionId = vv.surveyOptionId;
								// this.store.answerDetailList[i].answerContent = vv.optionValue;
							}
						}
						if (v.questionType == 2) {
							if (vv.isSelected == 1) {
								this.store.answerDetailList.push({
									surveyDetailId: v.surveyDetailId,
									surveyOptionId: vv.surveyOptionId,
									answerContent: vv.optionValue
								})
								// if (surveyOptionId==""){
								//     surveyOptionId = vv.surveyOptionId
								// }else{
								//     surveyOptionId = surveyOptionId + "," + vv.surveyOptionId
								// }

							}
						}
						if (v.questionType == 3) {
							this.store.answerDetailList.push({
								surveyDetailId: v.surveyDetailId,
								surveyOptionId: vv.surveyOptionId,
								answerContent: vv.optionValue
							})
							// this.store.answerDetailList[i].answerContent = vv.optionValue;
						}
						if (v.questionType == 4) {
							this.store.answerDetailList.push({
								surveyDetailId: v.surveyDetailId,
								surveyOptionId: vv.surveyOptionId,
								answerContent: vv.optionValue
							})
						}

					})
				})
				console.log("cformData", JSON.stringify(this.store.answerDetailList))
				let type = this.type
				let cformData = {
					answerDetailList: this.store.answerDetailList,
					surveyId: this.surveyId
				}
				let result = await window.POSTJSON({ url: 'user/questionaire/replayQuestion', cformData });
				if (!result.isSucess) return;
				Toast.info(`提交成功`, 1);
				if (result.resultCode == 0) {
					setTimeout(function () { history.push(`/PhasetwoMyQuestionnaireList/${type}`) }, 1000)
				}

				//console.log(result)
			} else {
				Toast.info(`内容不能为空`, 1);
			}
		}


	}
	@action
	change_ImagePickerWX = (id, visitUrl, mediaId, i)=>{
		// console.log("msg", id, i,id)
		if (!!id){
			if (!this.store.is_uploadMediaIds["fj" + i]) this.store.is_uploadMediaIds["fj" + i] = []
			// console.log("没加进前", this.store.is_uploadMediaIds["fj" + i])

			this.store.is_uploadMediaIds["fj"+i].push(id)

			// console.log("加进后", this.store.is_uploadMediaIds["fj" + i])
			this.store.questionDetailDta[i].optionList[0].optionValue = this.store.is_uploadMediaIds["fj" + i].join(',')

			// this.store.is_uploadMediaIds.push(msg.mediaId)serverId
			// console.log("is_uploadMediaIds结果:", this.store.is_uploadMediaIds["fj" + i])
			// console.log("optionValue结果:",  this.store.questionDetailDta[i].optionList[0].optionValue)
			console.log("z总", this.store.is_uploadMediaIds)
		}

	}
	@action
	ImgItemdatafun = (ImgItemdata,i)=>{
		//console.log("数据拿取", ImgItemdata.id, ImgItemdata,i)
		for (let t = 0; this.store.is_uploadMediaIds["fj"+i].length>t;t++){
			if (this.store.is_uploadMediaIds["fj"+i][t] == ImgItemdata.id){
				this.store.is_uploadMediaIds["fj"+i]=this.store.is_uploadMediaIds["fj"+i].splice(1,t)
			}
		}
		this.store.questionDetailDta[i].optionList[0].optionValue = this.store.is_uploadMediaIds["fj" + i].join(',')
		//console.log("删除结果数组is_uploadMediaIds", this.store.is_uploadMediaIds["fj"+i])
		console.log("删除结果optionValue", this.store.questionDetailDta[i].optionList[0].optionValue)
	}

}
export default Actions;
