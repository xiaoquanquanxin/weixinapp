import {action, observable} from "mobx";
import {ipUri} from "../../../config";

class Actions {
    constructor(store){
        this.store = store;
    }

    @action
    init(){
        console.log('初始化');
        const store = this.store;
        //  缴费列表
        store.paymentList = [];
        //  当前页码
        store.curPage = 0;
        //  正在请求
        store.refreshing = false;
        //  到底部了
        store.actbottom = true;
    }

    //  获取纹章列表
    @action
    getPropertyAdvanceHistory = async () => {
        const {curPage, pageNum, paymentList} = this.store;
        const result = await new Promise(function (resolve, reject){
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            let data = {
                pageNum,
                curPage,
                //  微信用户id
                userID: userInfo.id,
            };
            const url = `${ipUri["/bpi"]}/property/prepayment/getPropertyAdvanceHistory`;
            window.JQ.ajax({
                url,
                type: "post",
                crossDomain: true,
                contentType: "application/x-www-form-urlencoded",
                data,
                success: (res) => {
                    resolve(res);
                }
            })
        });
        const {code, data} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        console.log(data);
        //  下一页
        this.store.curPage = curPage + 1;
        //  没有更多了，说明到底了
        if (data.length === 0) {
            this.store.actbottom = true
            //Toast.info(`已经到底部`, 1);
        } else {
            if (pageNum > 1) {
                this.store.paymentList = paymentList.concat(data)
            } else {
                this.store.paymentList = data;
            }
            this.store.actbottom = false
        }
    }
}

export default Actions;
