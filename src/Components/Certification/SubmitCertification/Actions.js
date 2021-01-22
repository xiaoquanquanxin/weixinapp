//import {action } from 'mobx';
// 定义对数据的操作
import {action} from 'mobx/lib/mobx';
import {Modal, Toast} from 'antd-mobile';

class Actions {
    constructor(store){
        this.store = store;
    }

    @action
    colorStylefun = () => {
        this.store.colorStyle = (this.store.phoneNo && this.store.identityNo && this.store.validCode);
    };
    //输入框赋值
    @action
    inputfun = (v, tar) => {
        this.store[tar] = v;
        this.colorStylefun()
        //console.log(v)
    };
    /*
  房产认证
  * */
    @action
    userInfo = async (history) => {
        this.store.authshow = 0;
        this.store.colorStyle = false;
        this.store.phoneNo = "";
        this.store.identityNo = "";
        this.store.validCode = "";
        let result = await window.GET({url: 'user/userInfo'});
        if (!result.isSucess) return;
        this.store.authshow = 1;
        if (result.data.authStatus === 1) {
            history.replace("/");
        }
    };

    @action
    submit = async (history) => {
        if (window.phone(this.store.phoneNo)) {
            //window.identity()
            if (this.store.identityNo !== "") {
                let url = `user/userAuth`;
                const domain = window.location.origin;
                //跳回认购列表(HandInBuilding/List)
                let toUrl = window.getQueryString("url");
                let returnurl = '';
                const v = toUrl && toUrl.includes('HandInBuildingList');
                if (toUrl && v) {
                    // let sessionKeyurl = "?sessionKey=" + JSON.parse(window.getLocalData('auth'));
                    // let othereURL=encodeURIComponent('/HandInBuildingList'+sessionKeyurl)
                    returnurl = toUrl;
                }


                let cformData = {
                    phoneNo: this.store.phoneNo,
                    identityNo: this.store.identityNo,
                    validCode: this.store.validCode,
                    // returnUrl: domain+'/mlistMiddle.html'
                    // returnUrl: toUrl ? returnurl: domain+'/index.html?url=/MineList'
                    // returnUrl: (toUrl && v) ? returnurl: toUrl ? toUrl: '/MineList'
                    returnUrl: (toUrl && v) ? returnurl : toUrl ? toUrl : window.location.href,
                };
                console.log('cformData.returnUrl', cformData.returnUrl);
                //let cformData = config.format(obj);
                let result = await window.POSTJSON({url, cformData});
                // if (!result.isSucess) return;
                this.store.userAuthInfo = result.data;
                /*
                * resultCode: 300 已登录未认证 跳法大大的url https://t-test.fadada.com/Gcz7a1iNV
                * resultCode: 1	  未登录，未认证
                * resultCode: 0	  已登录，已认证
                * */
                if (result.resultCode === 0) {
                    let toUrl = window.getQueryString("url");
                    const v = toUrl && toUrl.includes('HandInBuildingList');
                    if (toUrl && v) {
                        //HandInBuildingList?sessionKey=oSuxiwn41M_6q6h3ZTRyyYThytZg
                        let sessionKeyurl = "?sessionKey=" + JSON.parse(window.getLocalData('auth'));
                        history.replace('/HandInBuildingList' + sessionKeyurl);
                    } else {
                        const replaceUrl = decodeURIComponent(window.getQueryString("url") || '');
                        //  todo    需要验证
                        console.log('需要验证，跳转规则');
                        history.replace(replaceUrl || '/');
                    }
                } else if (result.resultCode === 300) {
                    window.location.href = result.data.url
                }
                //return result.resultCode
            } else {
                Toast.info('请输入正确的身份号码', 2);
            }
        } else {
            Toast.info('请输入正确的手机号码', 2);
        }
    };

    /*初始化一些东东*/
    @action
    init = async (obj) => {
    }


}

export default Actions;
