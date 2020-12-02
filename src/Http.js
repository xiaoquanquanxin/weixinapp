import Http from '../lib/utils/Http'
import waitWindow from '../lib/Components/WaitWindow'
import {Modal} from 'antd-mobile';

class MyHttp {
    constructor(){
        this.http = new Http();
    }

    _alert(msg){
        Modal.alert('', msg, [
            {text: '确定'}
        ])
    }

    _checkReulst(result, isAutoError){
        if (typeof result == "undefined" || !result) {
            let resultMsg = "返回变量为空"
            if (isAutoError) this._alert(resultMsg);
            return {resultCode: -1, data: null, resultMsg: resultMsg, isSucess: false}
        }
        if (typeof result.resultCode == "undefined") {
            let resultMsg = "格式不对,缺少#resultCode"
            if (isAutoError) this._alert(resultMsg);
            return {resultCode: -1, data: null, resultMsg: resultMsg, isSucess: false}
        }
        if (typeof result.data == "undefined") {
            let resultMsg = "格式不对,缺少#data"
            if (isAutoError) this._alert(resultMsg);
            return {resultCode: -1, data: null, resultMsg: resultMsg, isSucess: false}
        }
        if (typeof result.resultMsg == "undefined") {
            let resultMsg = "格式不对,缺少#resultMsg"
            if (isAutoError) this._alert(resultMsg);
            return {resultCode: -1, data: null, resultMsg: resultMsg, isSucess: false}
        }
        if (result.resultCode == 0) {
            result.isSucess = true;
        } else {
            result.isSucess = false;
            if (result.resultCode == -1000) {
                //如果是window.JQ.ajax err fail 错误就不弹了错误信息
            } else {
                let msg = result.resultMsg;
                if (isAutoError) this._alert(msg);
            }
        }
        return result
    }

    async get({url, cformData = null, headers = {}, prefix = '', isAutoError = true, isShowLoading = true, isRanTimestamp = true, fun401 = null}){
        if (isShowLoading) waitWindow.show();
        url = prefix + url;
        try {
            let result = await this.http.get({url, cformData, headers, isRanTimestamp, fun401})
            if (isShowLoading) waitWindow.hide()
            return this._checkReulst(result, isAutoError);

        } catch (e) {
            if (isShowLoading) waitWindow.hide()
            this._alert(e);
            return e;
        }
    }

    async post({url, cformData = null, headers = {}, prefix = '', isAutoError = true, isShowLoading = true, isRanTimestamp = true, fun401 = null}){
        if (isShowLoading) waitWindow.show();
        url = prefix + url;
        try {
            let result = await this.http.post({url, cformData, headers, isRanTimestamp, fun401})
            if (isShowLoading) waitWindow.hide()
            return this._checkReulst(result, isAutoError);
        } catch (e) {
            if (isShowLoading) waitWindow.hide()
            this._alert(e);
            return e;
        }
    }
}

export default new MyHttp;
