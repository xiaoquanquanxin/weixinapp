import {action} from 'mobx';
import {Toast, Modal} from 'antd-mobile';

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
        this.pageNum = 1
    }

    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
    @action
    Listfun = async (activityType, pageNum) => {
        console.log(888, activityType, pageNum);
        this.store.tabval = activityType;
        this.pageNum = pageNum;
        let cformData = {
            companyId: JSON.parse(window.getCompanyId()) ? JSON.parse(window.getCompanyId()) : "",
            activityType: this.store.tabval,
            pageNum: pageNum,
            pageSize: 10
        };
        console.log(999, cformData);
        let result = await window.GET({url: 'user/activity/activitiList', cformData});

        if (!result.isSucess) {
            return;
        }
        //console.log(999,pageNum)
        if (+result.resultCode === 0) {
            if (result.data.length === 0) {
                this.store.actbottom = 1
            } else {
                if (pageNum > 1) {
                    this.store.actListdata = this.store.actListdata.concat(result.data)
                } else {
                    //console.log(111999)
                    this.store.actListdata = result.data
                }
                this.store.actbottom = 2
            }
        }
        console.log(this.store.actListdata, "actListdata")
    };
    @action
    tabfun = (index) => {
        console.log("index", index);
        this.pageNum = 1;
        this.store.actListdata = [];
        console.log(this.store.actListdata, "actListdata");
        this.Listfun(index, this.pageNum)
    };
    @action
    onRefresh = () => {
        this.pageNum = this.pageNum + 1;
        this.store.refreshing = true;
        this.Listfun(this.store.tabval, this.pageNum);
        setTimeout(() => {
            this.store.refreshing = false
        }, 1000);
        console.log(this.store.refreshing)
    };

    @action
    signUpfun = async (history, v) => {
        let cformData = {
            activityId: v.activityId
        };
        let result = await window.GET({url: 'user/activity/signup', cformData});
        if (!result.isSucess) {
            return;
        }
        console.log("data", result.data);
        if (+result.data.scopeType === 1) {
            if (+result.data.authStatus === 0) {
                Modal.alert('提示', "该活动需要进行房产认证，请先认证？", [
                    {
                        text: '取消', onPress: () => {
                        }
                    },
                    {
                        text: '确定', onPress: () => {
                            history.push("/SubmitCertification?url=/PhasetwoActivityList")
                        }
                    }
                ])
            } else {
                if (+v.activitytype === 2) {
                    console.log("status", v.status, "joinerId", v.joinerId);
                    window.delLocalData('UserInfodata');
                    window.setLocalData("activityid", parseInt(v.activityId));
                    if (+v.status === 1) {
                        history.push('/PhasetwoActivitySignUpExamine/' + v.joinerId)
                    } else {
                        this.isTrueToJoinActivity(v.activityId, history)
                    }
                } else if (+v.activitytype === 3) {
                    if (+v.status === 1) {
                        history.push('/PhasetwoActivitySignUpExamine/' + v.joinerId);
                    } else {
                        Modal.alert('提示', "该活动报名已结束!", [
                            {
                                text: '确定', onPress: () => {
                                }
                            }
                        ])
                    }

                } else if (+v.activitytype === 4) {
                    if (+v.status === 1) {
                        history.push('/PhasetwoActivitySignUpExamine/' + v.joinerId);
                    } else {
                        Modal.alert('提示', "该活动已结束!", [
                            {
                                text: '确定', onPress: () => {
                                }
                            }
                        ])
                    }
                }
            }


        } else {
            if (+v.activitytype === 2) {
                console.log("status", v.status, "joinerId", v.joinerId);
                window.delLocalData('UserInfodata');
                window.setLocalData("activityid", parseInt(v.activityId));
                if (+v.status === 1) {
                    history.push('/PhasetwoActivitySignUpExamine/' + v.joinerId);
                } else {
                    //history.push('/PhasetwoActivityUserList')
                    this.isTrueToJoinActivity(v.activityId, history);
                }
            } else if (+v.activitytype === 3) {
                if (+v.status === 1) {
                    history.push('/PhasetwoActivitySignUpExamine/' + v.joinerId)
                } else {
                    Modal.alert('提示', "该活动报名已结束!", [
                        {
                            text: '确定', onPress: () => {
                            }
                        }
                    ])
                }
            } else if (+v.activitytype === 4) {
                if (+v.status === 1) {
                    history.push('/PhasetwoActivitySignUpExamine/' + v.joinerId)
                } else {
                    Modal.alert('提示', "该活动已结束!", [
                        {
                            text: '确定', onPress: () => {
                            }
                        }
                    ])
                }
            }
        }
    };

    @action
    isTrueToJoinActivity = async (activityId, history) => {
        let cformData = {
            activityId: activityId
        };
        let result = await window.GET({url: 'user/activity/isTrueToJoinActivity', cformData, isShowLoading: false});
        if (+result.data.isTrue === 1) {
            if (+result.data.canJoin === 0) {
                Toast.info(result.data.msg, 2);
            } else {
                history.push('/PhasetwoActivityUserList_new/' + activityId);
            }
        } else {
            Toast.info(`抱歉，您不在此活动范围内！`, 2);
        }
    }
}

export default Actions;
