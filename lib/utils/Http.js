//https://github.com/matthew-andrews/isomorphic-fetch
import {Modal} from 'antd-mobile';
import router from "../../src/router";

class Http {
    get({url, cformData = null, headers = {}, isRanTimestamp = true, fun401 = null}){
        let method = 'get';
        return this.curl({url, method, cformData, headers, isRanTimestamp, fun401})
    }

    post({url, cformData = null, headers = {}, method = 'post', isRanTimestamp = true, fun401 = null}){
        return this.curl({url, method, cformData, headers, isRanTimestamp, fun401})
    }

    curl({url, method = 'get', cformData = null, headers = {}, isRanTimestamp = true, fun401 = null}){
        // console.log('https_____________________',fun401)
        // console.log('window.__temhttp401___________________',window.__temhttp401_)
        if (!fun401) {
            fun401 = function (){
                if (!window.__temhttp401_) {
                    window.__temhttp401_ = true;
                    Modal.alert('提示', "超时请重新登录", [
                        {
                            text: '确定', onPress: () => {
                                window.__temhttp401_ = false;
                                // window.location.href="#/Login";
                                window.location.href = location.origin + location.pathname + "#/SubmitCertification";
                                // this.props.history.push("/SubmitCertification?url="+item.link);
                                window.clearLocalData();
                            }
                        }
                    ])
                }
            }
        }
        //method=method.toLowerCase()
        /*
        headers
         'Accept': 'application/json',
         'Content-Type': 'application/json;charset=utf-8'
         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        */
        if (isRanTimestamp) {
            if (url.indexOf("?") == -1) {
                url += "?"
            } else {
                url += "&"
            }
            url = url + "rTimestamp=" + parseInt(new Date().getTime() / 1000) + ''
        }
        jQuery.support.cors = true;//兼容ie8,9
        return new Promise(function (resolve, reject){
            // console.log('Promise________________', cformData)
            window.JQ.ajax({
                crossDomain: true,//兼容ie8,9
                headers: headers,
                type: method,
                url: url,
                dataType: "json",
                data: cformData,
                //crossDomain: true,
                statusCode: {//http状态处理方法
                    403: function (){
                        const url = `${location.origin + location.pathname}/#/HouseAuthentication?url=${encodeURIComponent(location.hash.split('#')[1])}`;
                        console.log('需要认证，跳转到完整url 有风险', url);
                        window.location.replace(url);
                    },
                    401: function (){
                        //console.log("http code 401:")
                        //标记一下，如果弹过一次401,就不要再
                        fun401()
                    }/*,
                    200: function(r) {
                        //console.log("http code 200:")
                    }*/
                }
            }).then(function (data){
                resolve(data)
            }).fail(function (err){
                console.log("用户未认证,访问不了后端链接！", err)
                resolve({
                    data: err,
                    resultCode: -1000,
                    resultMsg: "用户未认证！"
                })
                // reject(err);
            })
        });


        /*return new Promise(function (resolve, reject){
            console.log('method:'+method);
            fetch(url, {
                method:method,
                headers:headers,
                body:cformData
            }).then(r=>{
                if (r.ok){
                    var data=null;
                    try{
                        data=r.json()
                        resolve(data)
                    }catch(e){
                        reject('json解析失败:'+e.message);
                    }
                }else{
                    if (r.status==404){
                        reject('连接失败(404)');
                    }else{
                        reject('失败:'+JSON.stringify(r));
                    }
                }
            },r=>{
                reject(r.message);
            })
        });*/

    }
}

export default Http;
