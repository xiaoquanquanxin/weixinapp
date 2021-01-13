import {action} from "mobx";
import {Modal, Toast} from 'antd-mobile';
import router from "../../../router";

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
    }

    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
    @action
        //退出
    loginOut = () => {
        console.log(this.store);
        /* this.store.type = "white";
         this.store.label = "登陆";*/
        Modal.alert('警告', '你确定要退出吗？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: () => {
                    window.delLocalData('auth')
                    wx.closeWindow();
                }
            },
        ])
    };

    /*
    获取用户信息
    * */
    @action
    userInfo = async () => {
        let url = `user/userInfo`;
        let cformData = {};
        //let cformData = config.format(obj);
        let result = await window.GET({url, cformData});
        this.store.useInfo = result.data;
        window.setLocalData('userInfo', result.data);
        return result.resultCode
    }


    /*微信端法大大认证接口* */
    @action
    qryPersonalCertification = async (body) => {
        let url = `user/personalCertification`;
        let cformData = {
            ...body
        };
        let result = await window.GET({url, cformData});
        this.store.userAuthInfo = result.data;
        window.location.href = result.data.url //跳法大大的链接
    };


    @action
    tongbufun = async () => {
        Modal.alert('提示', '你确定是否同步？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: async () => {
                    let url = `/auth/syncRooms`;
                    let result = await window.GET({url});
                    if (result.resultCode === 0) {
                        Toast.info('房产同步成功', 1.5);
                    }
                }
            },
        ])
    }
    @action
    tuichu = async () => {
        Modal.alert('提示', '你确定是否退出？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: async () => {
                    let url = `user/logout`;
                    let result = await window.GET({url});
                    if (result.resultCode === 0) {
                        Toast.info('退出成功', 1.5);
                        setTimeout(function (){
                            location.reload()
                        }, 1000)
                    }
                }
            },
        ])
    };
}

export default Actions;
