//扩展全局get,post
import MyHttp from './Http'
import config from './config'
import Storage from 'LibUtils/Storage.js'
import {Modal} from "antd-mobile/lib/index";

//统一追加header auth
function _appendHeader(headers){
    if (!headers) {
        headers = {};
    }
    //headers["Content-type"] = "application/json"
    // console.log("sessionkey:",window.getLocalData('auth'))
    try {
        headers['sessionkey'] = JSON.parse(window.getLocalData('auth'))
        // headers['sessionkey']=JSON.parse('oSuxiwhHkAbgHVnlcF_DXSpiJ-JY')
        // console.log('sessionkey', headers['sessionkey'])

    } catch (e) {
        console.log("追加sessionkey错误:", e)
    }
    return headers
}

function _isGet401(){
    var isOk = !!window.__temhttp401_;
    if (isOk) console.log("当前401,跳过请求")
    let actUrl = window.location.href.includes('/PhasetwoActivityListDetail');
    /*	if (actUrl) {
            return true
        } else {

        }*/
    return isOk
}

window.myFun401 = function (){
    if (!window.__temhttp401_) {
        window.__temhttp401_ = true;

        function refrshe(){
            // todo check debugger;
            window.__temhttp401_ = false;
            // window.location.href="#/Login";
            // let url="login/getWxAuthUrl?forwordUrl="+encodeURI(window.location.href);
            let origin = window.location.origin;
            let PhasetwoActivityListDetail = window.location.href.includes('/PhasetwoActivityListDetail');
            //  todo    wechat-pay  dev和prod不一样，注意时间二级路径
            // let url = "login/getWxAuthUrl?forwordUrl=" + encodeURI(origin + "/index.html?url=/");
            let url = "login/getWxAuthUrl?forwordUrl=" + encodeURI(origin + "/wechat-pay/20210108?url=/");
            let PhasetwoMyQuestionnaire = window.location.href.includes('/PhasetwoMyQuestionnaire');
            let pageName = JSON.stringify(window.getLocalData("pageName"));
            /*活动*/
            if (PhasetwoActivityListDetail) {
                let activityid = window.getLocalData("activityid");
                //  todo    wechat-pay  dev和prod不一样，注意时间二级路径
                // url = "login/getWxAuthUrl?forwordUrl=" + encodeURI(origin + "/index.html?url=/PhasetwoActivityListDetail/" + activityid);
                url = "login/getWxAuthUrl?forwordUrl=" + encodeURI(origin + "/wechat-pay/20210108?url=/PhasetwoActivityListDetail/" + activityid);
            }

            //问卷
            if (pageName && pageName.includes('我的问卷')) {
                let PhasetwoMyQuestionnaireType = JSON.parse(window.getLocalData("PhasetwoMyQuestionnaireType"));
                let PhasetwoMyQuestionnaireId = JSON.parse(window.getLocalData("PhasetwoMyQuestionnaireId"));
                let isDone = JSON.parse(window.getLocalData("isDone"));
                //  todo    wechat-pay  dev和prod不一样，注意时间二级路径
                // let str = encodeURI(origin + "/index.html?url=/PhasetwoMyQuestionnaire/" + PhasetwoMyQuestionnaireType + "/" + PhasetwoMyQuestionnaireId + "/" + isDone);
                let str = encodeURI(origin + "/wechat-pay/20210108?url=/PhasetwoMyQuestionnaire/" + PhasetwoMyQuestionnaireType + "/" + PhasetwoMyQuestionnaireId + "/" + isDone);
                str = encodeURI(str);
                url = "login/getWxAuthUrl?forwordUrl=" + str;
                window.delLocalData('pageName');
                window.delLocalData('PhasetwoMyQuestionnaireType')
                window.delLocalData('PhasetwoMyQuestionnaireId')
                window.delLocalData('isDone')
            }

            window.GETNoAuth({url}).then((data) => {
                setTimeout(() => {
                    if (!data.isSucess) {
                        return
                    }
                    console.log('我要跳转到', data.data);
                    window.location.replace(data.data);
                }, 60);
            });
            console.log('清除所有auth');
            window.clearLocalData();
        }

        refrshe()
    }
}
window.GET = async function ({url, cformData = null, headers = null, prefix = null, isAutoError = true, isShowLoading = true, isRanTimestamp = true, fun401 = null}){
    if (_isGet401()) return;
    if (!fun401) fun401 = window.myFun401;
    if (!prefix) prefix = config.urlPrefix;
    headers = _appendHeader(headers);
    let result = await MyHttp.get({url, prefix, cformData, headers, isAutoError, isShowLoading, isRanTimestamp, fun401})
    //console.log('get result 123:',result)
    return result;
}
window.POST = async function ({url, cformData = null, headers = null, prefix = null, isAutoError = true, isShowLoading = true, isRanTimestamp = true, fun401 = null}){
    if (_isGet401()) return;
    if (!fun401) fun401 = window.myFun401;
    if (!prefix) prefix = config.urlPrefix;
    headers = _appendHeader(headers)
    let result = await MyHttp.post({
        url,
        prefix,
        headers,
        cformData,
        isAutoError,
        isShowLoading,
        isRanTimestamp,
        fun401
    })
    return result;
};
window.POSTJSON = async function ({url, cformData = null, headers = null, prefix = null, isAutoError = true, isShowLoading = true, isRanTimestamp = true, fun401 = null}){
    if (_isGet401()) return;
    if (!fun401) fun401 = window.myFun401;
    if (!headers) headers = {}
    headers["Content-type"] = "application/json"
    cformData = JSON.stringify(cformData)
    let result = await window.POST({
        url,
        prefix,
        headers,
        cformData,
        isAutoError,
        isShowLoading,
        isRanTimestamp,
        fun401
    })
    return result;
};
//不附加auth
window.GETNoAuth = async function ({url, cformData = null, headers = {}, prefix = null, isAutoError = true, isShowLoading = true, isRanTimestamp = true, fun401 = null}){
    if (!fun401) fun401 = window.myFun401;
    if (!prefix) prefix = config.urlPrefix;
    let result = await MyHttp.get({url, prefix, cformData, headers, isAutoError, isShowLoading, isRanTimestamp, fun401})
    //console.log('get result 123:',result)
    return result;
}
//不附加auth
window.POSTNoAuth = async function ({url, cformData = null, headers = {}, prefix = null, isAutoError = true, isShowLoading = true, isRanTimestamp = true, fun401 = null}){
    if (!fun401) fun401 = window.myFun401;
    if (!prefix) prefix = config.urlPrefix;
    let result = await MyHttp.post({
        url,
        prefix,
        headers,
        cformData,
        isAutoError,
        isShowLoading,
        isRanTimestamp,
        fun401
    })
    return result;
};
var ls = new Storage()
window.setLocalData = function (key, value){
    ls.setData(key, value)
}
window.getLocalData = function (key){
    return ls.getData(key)
}
window.delLocalData = function (key){
    ls.del(key)
}
window.clearLocalData = function (){
    ls.clear()
}

//设置标题
window.setWindowTitle = function (title){
    document.title = title
    //解决输入框弹出，页面滚动的bug,点击不了弹框。
    window.JQ('input').on('blur', function (){
        window.scroll(0, 0);
    });
}
/**
 * 时间戳 转换格式：使用方法
 *    new Date(时间戳).format('yyyy/MM/dd');//年/月/日
 *    new Date(时间戳).format('yyyy-MM-dd hh:mm:ss');//年-月-日 时:分:秒
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format){
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
//这样的格试转成 2010-01-14 16:24:33==> 时间戳
window.toTimestamp = function (strDate){
    strDate = strDate.replace(/-/g, '/')
    return new Date(strDate).getTime()
}
//字符串转数字
window.toNumber = function (str){
    var tem = parseInt(str);
    if (isNaN(tem)) return 0;
    return tem;
}
/**
 * 获得url参数值
 * @param name
 * @returns {*}
 */

window.getQueryString = function (name = null){
    var after = window.location.href.split("?")[1];
    if (after && after.length > 1) {
        var arr = after.split("&")
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var tem = arr[i].split('=')
            if (tem.length == 2) obj[tem[0]] = tem[1]
        }
        if (name) return obj[name]
        return obj;
    }
    return null;
}
/**
 * 获取操作系统信息
 * @returns {string}
 * @constructor
 */
window.OSInfo = function (){
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 'android';
    }
    if (isIOS) {
        //这个是ios操作系统
        return 'ios';
    }
};


//转换金额千分位
Number.prototype.reviseToFixed = function (fractionDigits){
    if (this > 0) {
        //没有对fractionDigits做任何处理，假设它是合法输入
        return (parseInt(this * Math.pow(10, fractionDigits) + 0.5) / Math.pow(10, fractionDigits)).toString();
    } else {
        //负数的时候
        return this.toFixed(fractionDigits);
    }
}
window.toFloat = function (s, n){
    if (typeof s == 'undefined') s = 0;
    if (typeof n == 'undefined') n = 2;
    s = s + "";
    s = parseFloat(s)
    s = s.reviseToFixed(n);
    return s;
}
window.toThousands = function (val, isPatchPosition = true){
    if (typeof val == 'undefined') val = 0;
    if (isNaN(val)) {
        return '';
    }
    val = window.toFloat(val || 0);
    var numArr = (val || 0).toString().split('.');
    numArr[0] = numArr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    if (isPatchPosition) {
        //补位小数.00
        if (numArr.length == 1) {
            return numArr.join('.') + '.00'
        } else {
            if (numArr[1].length == 1) {
                return numArr.join('.') + '0';
            }
        }
    }
    return numArr.join('.');
};
window.fmoney = function (s, n){
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1],
        t = "";
    if (n) {
        r = r == undefined ? ".00" : "." + r;
    } else {
        r = r == undefined ? "" : "." + r;
    }
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + r;
}


window.urlToObj = function (str){
    var obj = {};
    var arr1 = str.split("?");
    if (arr1[1]) {
        var arr2 = arr1[1].split("&");
        for (var i = 0; i < arr2.length; i++) {
            var res = arr2[i].split("=");
            obj[res[0]] = res[1];
        }
        return obj;
    }
};

//判断身份证格式，错误返回false,对返回true
window.identity = function (identity){
    if (/^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65)\d{4}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[0-9xX]$/.test(identity)) {
        return true
    } else {
        return false
    }
}

//背景禁止滑動，ture禁止，false釋放禁止
window.rootscroll = function (v){
    if (v) {
        document.body.addEventListener('touchmove', function (e){
            e.preventDefault()
        }, {passive: false})
    } else {
        document.body.addEventListener('touchmove', function (e){
            window.event.returnValue = true
        })
    }

}

window.phone = function (v){
    if (/^1[3456789]\d{9}$/.test(v)) {
        return true
    } else {
        return false
    }

}
window.trim = function (str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//获取全局公司id
window.getCompanyId = function (){
    return window.getLocalData("global_companyId")
}
// console.log("*",window.getCompanyId(),"*")
//设置全局公司id
window.setCompanyId = function (id){
    window.setLocalData("global_companyId", id)
}

window.funcReadImgInfo = function (){
    var imgs = [];
    var imgObj = window.JQ('.article_img img');//这里改成相应的对象
    var protocol = window.location.protocol;//获取协议
    var host = window.location.host;//获取主地址
    var port = window.location.port;//获取端口
    //  console.log("imgObj", imgObj)
    for (var i = 0; i < imgObj.length; i++) {

        var src = imgObj.eq(i).attr('src');
        //判断地址是否有http开头，如果没有补全路径
        src = src.substr(0, 4).toLowerCase() == "http" ? src : protocol + '//' + host + src;

        imgs.push(src);

        imgObj.eq(i).click(function (){
            console.log(i, 11)
            var nowImgurl = window.JQ(this).attr('src');
            nowImgurl = nowImgurl.substr(0, 4).toLowerCase() == "http" ? nowImgurl : protocol + '//' + host + nowImgurl;//改大图的地址，不加会导致本地上传图片，点击查看显示第一张
            nowImgurl = nowImgurl.split('?x-oss')[0]
            console.log(nowImgurl)

            WeixinJSBridge.invoke("imagePreview", {

                "urls": imgs,

                "current": nowImgurl

            });

        });

    }

}
