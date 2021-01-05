import {action} from "mobx";
import {ipUri} from "../../../config";

class Actions {
    constructor(store){
        this.store = store;
    }

    //  获取纹章列表
    @action
    getPropertyAdvanceHistory = async () => {
        const {curPage, pageNum, paymentList} = this.store;
        console.clear();
        const result = await new Promise(function (resolve, reject){
            let data = {
                pageNum,
                curPage,
                //  微信用户id  todo    将来是用户的id
                userID: 1,
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
        console.log(result);
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
