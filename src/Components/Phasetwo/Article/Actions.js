import {observable, action} from 'mobx';

// 定义对数据的操作
class Actions {
    constructor(store, mainStore){
        this.store = store;
        //this.storeNotice = mainStore.storeNotice
    }

    @action
    init(){
        const {setnoticeDetail} = this.store;
        setnoticeDetail.authorName="";
        setnoticeDetail.content="";
        setnoticeDetail.noticeTitle="";
        setnoticeDetail.updateTime="";
    }

    @action
    setnoticeDetail = async (id) => {
        debugger
        let cformData = {
            id: id
        };
        //console.log(55,body)
        this.store.setnoticeDetail = "";
        let result = await window.GET({url: "user/articleDetails", cformData})
        if (!result.isSucess) return;
        //console.log(result.data)
        if (result.data.contentType == 1) {//内容类型（1-自定义内容，2-引用链接）
            this.store.setnoticeDetail = result.data
        } else {
            window.location.href = result.data.content
        }


        //调分享给朋友卡片
        /*	let html=result.data.content || '';
            // let html="<p>fdsafdsafd<p>dddddd</p><p>11111111111<p>22222222222222</p></p></p>";
            let contents=()=>{
                let re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
                return html.replace(re1,'');//执行替换成空字符
            };*/
        let contents = result.data.digest || '';
        wx.ready(function (){   //需在用户可能点击分享按钮前就先调用
            const urlLink = window.location.href;
            wx.onMenuShareAppMessage({
                title: result.data.title || '', // 分享标题
                desc: contents, // 分享描述
                link: urlLink, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: result.data.smallBanner || '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (){
                    // 用户确认分享后执行的回调函数
                    console.log('用户确认分享后执行的回调函数')
                },
                cancel: function (){
                    // 用户取消分享后执行的回调函数
                    console.log('用户取消分享后执行的回调函数')
                }
            });


            //分享朋友圈
            wx.onMenuShareTimeline({
                title: result.data.articleTitle || result.data.title, // 分享标题
                desc: contents, // 分享描述
                link: urlLink, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: result.data.smallBanner || '', // 分享图标
                success: function (){
                    // 用户确认分享后执行的回调函数
                },
                cancel: function (){
                    // 用户取消分享后执行的回调函数
                }
            });


        });

        //JSON.parse(window.getLocalData('setnoticeDetail'))
        //JSON.parse(jsonstr); //可以将json字符串转换成json对象
        //JSON.stringify(window.getLocalData('setnoticeDetail'))
        //console.log("start", this.store.setnoticeDetail,result.data);
        // let hrefsp=window.location.href.split("/#/")[1]
        // let linkurl = window.location.protocol+"//"+window.location.host + "?url=" + hrefsp.split("?")[0] + "&" + hrefsp.split("?")[1]
        // console.log(999, linkurl);

        let linkurl = window.location.protocol + "//" + window.location.host + "?url=PhasetwoArticle/" + id

        function getUrlArgObject(){
            //var args = new Object();
            var args = ""
            if (window.location.href.split("?")[1] != undefined) {
                var query = window.location.href.split("?")[1];//获取查询串
                var pairs = query.split("&");//在逗号处断开
                // console.log("pairs", pairs)
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

                    if (args == "") {
                        args = argname + "=" + value
                    } else {
                        args = args + "&" + argname + "=" + value
                    }
                    // console.log("argname", args)
                    //args[argname] = unescape(value);//存为属性
                }
            }

            return args;//返回对象
        }

        linkurl = linkurl + "&" + getUrlArgObject()
        wx.ready(function (){   //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({
                title: result.data.title, // 分享标题
                desc: result.data.digest, // 分享描述
                link: linkurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: result.data.smallBanner, // 分享图标
                success: function (){
                    // 设置成功
                }
            })
        });

        wx.ready(function (){      //需在用户可能点击分享按钮前就先调用
            wx.updateTimelineShareData({
                title: result.data.title, // 分享标题
                link: linkurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: result.data.smallBanner, // 分享图标
                success: function (){
                    // 设置成功
                },
            })
        });

    }
    @action
    readText = async (originalLink, history) => {
        window.location.href = originalLink
        //history.push('/PhasetwoPeopleInfoList')
    }
}

export default Actions;
