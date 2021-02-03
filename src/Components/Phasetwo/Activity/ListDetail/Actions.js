import {action } from 'mobx';
import { Toast, Modal } from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }



    //初始时候去查sessionkey
    @action
	getSessionKey=async(id, history) =>{
		const sessionKeyurl = window.getLocalData('auth');
		const activityid = window.getLocalData('activityid') || id;
		if (!sessionKeyurl) {
			let origin=window.location.origin;
			let url="login/getWxAuthUrl?forwordUrl="+encodeURI(origin+"/index.html?url=/PhasetwoActivityListDetail/"+activityid);
			window.GETNoAuth({url}).then((data)=> {
				if (!data.isSucess) return;
				window.location.href=data.data
			});
		}
	};



    @action
    Noticefun = async (id, history) => {
        window.delLocalData('UserInfodata')
        console.log(222211112, parseInt(id))
        window.setLocalData("activityid", parseInt(id));
		// alert('!初始sessionKey___:'+sessionKeyurl)
        this.Detailid = id;
        let cformData = {
            activityId: id
        };
        const result = await window.GET({ url: "user/activity/activitiDetail", cformData, fun401:true });
        if (result.resultCode == 0)
        // { this.store.resultCode=1}
        console.log(1111, result, this.store.resultCode);
        if (!result.isSucess) return;
        this.store.resultCode = result.data.status;
    //     if (result.data.status==1){
    //       //  history.push('/PhasetwoActivitySignUpExamine/' + result.data.joinerId)

    //    }else{
    //         //history.push('/PhasetwoActivityUserList')
    //    }
        this.store.NoticeData = result.data;
        this.sharefun(result.data.title, result.data.digest, result.data.smallBanner, id)

		let contents=result.data.digest || '';
		wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
			const urlLink=window.location.href;
			wx.onMenuShareAppMessage({
				title: result.data.title || '', // 分享标题
				desc: contents, // 分享描述
				link: urlLink, // 分享链接，该链接域名必须与当前企业的可信域名一致
				imgUrl:  result.data.smallBanner || '', // 分享图标
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
				title: result.data.articleTitle || result.data.title, // 分享标题
				desc: contents, // 分享描述
				link: urlLink, // 分享链接，该链接域名必须与当前企业的可信域名一致
				imgUrl:  result.data.smallBanner || '', // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
		});

		this.getSessionKey(id, history)

    }
    @action
    sharefun = async (title, digest, smallBanner, id) => {

        let hrefsp = window.location.href.split("/#/")[1]
        let linkurl = window.location.protocol + "//" + window.location.host + "?url=PhasetwoActivityListDetail/" + id
        // if (hrefsp.split("?")[1]!=undefined){
        //     let linkurl = window.location.protocol + "//" + window.location.host + "?url=" + hrefsp.split("?")[0] + "&" + hrefsp.split("?")[1]
        //     console.log(11, hrefsp.split("?")[1])
        // }
        //console.log(88, window.location.href.split("?")[1], getUrlArgObject())
        function getUrlArgObject() {
            //var args = new Object();
            var args =""
            if (window.location.href.split("?")[1]!=undefined){
                var query = window.location.href.split("?")[1];//获取查询串
                var pairs = query.split("&");//在逗号处断开
                console.log("pairs", pairs)
                for (var i = 0; i < pairs.length; i++) {
                    var pos = pairs[i].indexOf('=');//查找name=value
                    if (pos == -1) {//如果没有找到就跳过
                        continue;
                    }
                    var argname = pairs[i].substring(0, pos);//提取name
                    var value = pairs[i].substring(pos + 1);//提取value
                    if (argname == "sessionKey") {//如果没有找到就跳过
                        continue;
                    }

                    if (args==""){
                        args = argname + "=" + value
                    }else{
                        args = args+"&" + argname + "=" + value
                    }
                   // console.log("argname", args)
                    //args[argname] = unescape(value);//存为属性
                }
            }

            return args;//返回对象
        }

        linkurl=linkurl + "&" + getUrlArgObject()
        console.log(999998, linkurl )
        let cformData = {
            forwordUrl: linkurl
        };
        let isShowLoading = false;
        let result = await window.GET({ url: "login/getWxAuthUrl", cformData, isShowLoading });
        if (result.resultCode == 0)

       // console.log(999, linkurl);
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({
                title: title, // 分享标题
                desc: digest, // 分享描述
                link: result.data, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: smallBanner, // 分享图标
                success: function () {
                    // 设置成功
                },
                // fail: (res) => {
                //     alert("tiao" + JSON.stringify(arguments) + JSON.stringify(res) )
                // }
            })
        });

        wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
            wx.updateTimelineShareData({
                title: title, // 分享标题
                link: result.data, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: smallBanner, // 分享图标
                success: function () {
                    // 设置成功
                },
                // fail: () => {
                //     alert("tiao" + JSON.stringify(arguments))
                // }
            })
        });
    };




    /*活动详情之活动数据*/
    @action
	activityJoinerDetailfun = async (history, type, joinerId) => {
		const activityid=window.getLocalData("activityid");
		const sessionKeyurl = window.getLocalData('auth');
		// alert('点击后sessionKeyurl:'+sessionKeyurl);
		//有sessionkey
		let cformData = {
			activityId: activityid
		};
		let result = await window.GET({ url: "user/activity/activityJoinerDetail", cformData });
		this.store.activityJoinerDetail=result && result.data;
		/*报名状态，直接跳入报名，不要用户在页面点报名按纽*/
		const activityStatus=this.store.NoticeData.activityStatus;
		if (activityStatus==2 && result.data.status !=1) {
			this.signup(history, type, joinerId)
		}



	/*	if (!sessionKeyurl) {
			let origin=window.location.origin;
			let url="login/getWxAuthUrl?forwordUrl="+encodeURI(origin+"/index.html?url=/PhasetwoActivityListDetail/"+this.Detailid);
			window.GETNoAuth({url}).then((data)=> {
				if (!data.isSucess) return;
				window.location.href=data.data
			});
		} else {


		}*/
        //return result.resultCode
    };



    /*回调作用*/
    @action
    historyfun = async (history, type, joinerId) => {
		//活动详情之活动数据
		/*	 const o=this.activityJoinerDetailfun();
			o.then((text)=>{
			})*/

		this.signup(history, type, joinerId)

    };




    /*活动报名*/
    @action
	signup=async(history, type, joinerId)=>{
		let cformData = {
			activityId: this.Detailid
		};
		let result = await window.GET({ url: 'user/activity/signup', cformData });
		if (!result.isSucess) return;
		console.log("result", result.data);
		if (result.data.scopeType == 1) {  //推送范围（0-全部，1-项目认证用户，2-城市用户）
			if (result.data.authStatus == 0) {
				//console.log("Detailid",this.Detailid)
				Modal.alert('提示', "该活动需要进行房产认证，请先认证？", [
					{
						text: '取消', onPress: () => {
						}
					},
					{
						text: '确定', onPress: () => {
							history.push("/SubmitCertification?url=/PhasetwoActivityListDetail/" + this.Detailid)
						}

					}
				])
			} else {
				if (type == 1) {  //活动报名(status: 1-已报名-2-未报名)
					history.push('/PhasetwoActivitySignUpExamine/' + joinerId)  //活动报名详情
				} else {
					this.isTrueToJoinActivity(this.Detailid, history)			//我要报名
					//history.push('/PhasetwoActivityUserList')
				}
			}

		}
		else {
			if (type==1){
				history.push('/PhasetwoActivitySignUpExamine/' + joinerId)  //活动报名详情
			}else{
				this.isTrueToJoinActivity(this.Detailid, history)			//我要报名
				//history.push('/PhasetwoActivityUserList')
			}
		}

	};

    @action
    isTrueToJoinActivity = async (activityId, history) => {
        let cformData = {
            activityId: activityId
        };
        let result = await window.GET({ url: 'user/activity/isTrueToJoinActivity', cformData, isShowLoading: false });

        if (result.data.isTrue == 1) {
			if (result.data.canJoin == 0) {
				Toast.info(result.data.msg, 2)
			} else {
				history.push('/PhasetwoActivityUserList_new/' + activityId)		//我要报名页面
			}
        } else {
            Toast.info(`抱歉，您不在此活动范围内！`, 2)
        }



    }
}
export default Actions;
