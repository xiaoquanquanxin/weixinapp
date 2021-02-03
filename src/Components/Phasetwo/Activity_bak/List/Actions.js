import {action} from 'mobx';
import {Toast, Modal} from 'antd-mobile';

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
        this.pageNum = 1
    }

    //  初始化
    @action
    init(){
        const store = this.store;
        store.actListdata = [];
        store.refreshing = false;
        store.tabval = null;
        store.actbottom = 2;
    }

    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
    @action
    Listfun = async (activityType, pageNum) => {
        this.store.tabval = activityType;
        this.pageNum = pageNum;
        let cformData = {
            companyId: JSON.parse(window.getCompanyId()) ? JSON.parse(window.getCompanyId()) : "",
            activityType,
            pageNum,
            pageSize: 10
        };
        console.log('请求数据', cformData);
        let result = await window.GET({url: 'user/activity/activitiList', cformData});
        if (!result.isSucess) {
            return;
        }
        if (+result.resultCode === 0) {
            if (result.data.length === 0) {
                this.store.actbottom = 1;
            } else {
                if (pageNum > 1) {
                    this.store.actListdata = this.store.actListdata.concat(result.data);
                } else {
                    this.store.actListdata = result.data;
                }
                this.store.actbottom = 2;
            }
        }
        console.log(JSON.parse(JSON.stringify(this.store.actListdata)), "列表数据");
    };
    @action
    tabfun = (index) => {
        // console.log("index", index);
        this.pageNum = 1;
        this.store.actListdata = [];
        console.clear();
        console.log('删除列表数据');
        this.Listfun(index, this.pageNum);
    };
    @action
    onRefresh = () => {
        this.pageNum = this.pageNum + 1;
        this.store.refreshing = true;
        this.Listfun(this.store.tabval, this.pageNum);
        setTimeout(() => {
            this.store.refreshing = false;
        }, 1000);
        console.log(this.store.refreshing);
    };

    @action
    signUpfun = async (history, v) => {
        //  0-全部，1-项目认证用户，2-城市用户
        const scopeType = +v.scopeType;
        //  status  当前活动报名状态：【1：当前人已报名，2：当前人未报名】
        const status = +v.status;
        //   activitytype  当前活动状态：【1-草稿，2-发布，3-报名结束，4-活动结束）】
        const activitytype = +v.activitytype;
        const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
        //  已报名，跳转到报名状态页
        if (status === 1) {
            history.push('/PhasetwoActivitySignUpExamine/' + v.joinerId);
            return;
        }
        //  活动已结束
        if (activitytype > 2) {
            Modal.alert('提示', activitytype === 3 ? "该活动报名已结束!" : '该活动已结束!', [
                {
                    text: '确定', onPress: () => {
                    }
                }
            ]);
            return;
        }
        //  需要认证的活动
        if (scopeType === 1 && +userInfo.authStatus === 0) {
            Modal.alert('提示', "该活动需要进行房产认证，请先认证？", [
                {
                    text: '取消', onPress: () => {
                    }
                },
                {
                    text: '确定', onPress: () => {
                        history.push("/SubmitCertification?url=/PhasetwoActivityList");
                    }
                }
            ]);
            return;
        }
        //  正在进行中
        if (activitytype === 2) {
            console.log("status", status, "joinerId", v.joinerId);
            window.delLocalData('UserInfodata');
            window.setLocalData("activityid", parseInt(v.activityId));
            this.isTrueToJoinActivity(v.activityId, history);
        }
    };

    @action
    isTrueToJoinActivity = async (activityId, history) => {
        let cformData = {
            activityId,
        };
        let result = await window.GET({url: 'user/activity/isTrueToJoinActivity', cformData, isShowLoading: false});
        const {isTrue, canJoin, msg} = result.data;
        if (+isTrue === 1) {
            if (+canJoin === 0) {
                Toast.info(msg, 2);
            } else {
                //  todo    用老的报名
                // history.push('/PhasetwoActivityUserList_new/' + activityId);
                history.push('/PhasetwoActivityUserList/' + activityId);
            }
        } else {
            Toast.info(`抱歉，您不在此活动范围内！`, 2);
        }
    }
}

export default Actions;
