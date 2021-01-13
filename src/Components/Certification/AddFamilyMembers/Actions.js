//import {action } from 'mobx';
// 定义对数据的操作
import {action} from 'mobx/lib/mobx';
import config from '../../../config';
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';
import {Toast, Modal} from 'antd-mobile';

class Actions {
    constructor(store){
        this.store = store;
    }

    /*初始化一些*/
    @action
    init = async () => {
        const store = this.store;
        store.Foldval = false;
        store.roomName = "";
        store.ProjectSelectvalarr = [];
        store.roomIdarr = [];
        store.colorStyle = false;
        store.AddFamilyMembers = {
            fullName: '',                 //姓名
            phoneNo: '',                 //电话号码
            identityNo: '',           //身份证
            sex: '',                //姓别
            birthday: '',              //出生年月
            userType: '',       //客户类型
            roomName: ''
        };
        store.getUserInfoByParamval = '';
    };


    /*
添加家庭成员
* */
    @action
    addFamilyUser = async (body) => {
        let url = `auth/addFamilyUser`;
        let obj = {...body};
        let cformData = config.format(obj);
        let result = await window.POST({url, cformData});
        if (!result.isSucess) {
            return;
        }
        this.store.addFamilyUser = result.data;
        return result.resultCode
    };


    /*家庭成员信息* */
    @action
    userFamily = async () => {
        this.init()
        //userType 编辑添加值为1，成员列表为0（可编辑可删除地方）
        let cformData = {
            userType: 1
        }
        let result = await window.GET({url: "auth/getRoomInfo", cformData});
        if (!result.isSucess) {
            return;
        }
        //this.store.getRoomInfo = result.data
        this.store.getRoomInfo = []
        result.data.forEach((item, index) => {
            this.store.getRoomInfo.push({
                roomId: item.roomId,
                roomName: item.roomName,
                editStatus: false
            })
        });

        let editFamilyid = window.getQueryString();
        //console.log(2222, editFamilyid)
        //进入编辑
        if (editFamilyid && editFamilyid.id && editFamilyid.authUserId) {
            console.log('家庭成员-编辑');
            //	console.log(111, JSON.parse(window.getLocalData("editFamily")))
            this.store.AddFamilyMembers = JSON.parse(window.getLocalData("editFamily"))
            //console.log("AddFamilyMembersAddFamilyMembers",this.store.AddFamilyMembers)
            let cformDataedit = {
                userType: this.store.AddFamilyMembers.userType,
                authUserId: editFamilyid.authUserId
            };
            //console.log("cformDataedit", cformDataedit)
            let resultedit = await window.POST({url: "auth/findHouseAuths", cformData: cformDataedit});
            if (!resultedit.isSucess) {
                return;
            }
            resultedit.data.forEach((item, index) => {
                this.store.ProjectSelectvalarr.push(
                    item.name
                );
                this.store.roomIdarr.push(
                    item.id * 1
                )
            });
            this.roomId = this.store.roomIdarr.join(",")
            this.store.roomName = this.store.ProjectSelectvalarr.join(",")
            this.store.AddFamilyMembers.roomName = this.store.roomName
            this._checkForm(this.store.AddFamilyMembers)
            //console.log("AddFamilyMembers11111111111111",this.store.AddFamilyMembers)

        }
        //console.log("家庭成员信息`````````", this.store.getRoomInfo)editFamily
    };


    /*编辑成员* */
    @action
    updateFamilyUser = async (body) => {
        let url = `auth/updateFamilyUser`;
        let obj = {...body};
        let cformData = config.format(obj);
        let result = await window.POST({url, cformData});
        if (!result.isSucess) {
            return;
        }
        //this.store.userFamily=result.data;
        return result.resultCode
    };


    @action
    Fold = (Foldval) => {
        this.store.Foldval = !Foldval
    }
    @action
    ProjectSelectOK = (v) => {
        //console.log(88888888, this.store.roomIdarr, this.store.ProjectSelectvalarr)
        this.roomId = this.store.roomIdarr.join(",")
        this.store.roomName = this.store.ProjectSelectvalarr.join(",")
        this.store.AddFamilyMembers.roomName = this.store.roomName
        console.log("this.store.AddFamilyMembers", this.store.AddFamilyMembers)
        this._checkForm(this.store.AddFamilyMembers)
        //console.log("AddFamilyMembers", this.store.ProjectSelectvalarr, this.store.roomIdarr, this.roomId, this.store.roomName)
        this.Fold(v)
    }
    @action
    ProjectSelectfun = (data, i) => {
        this.store.ProjectSelectvalarr = this.store.ProjectSelectvalarr.includes(data.roomName)
            ? this.store.ProjectSelectvalarr.filter(item => item !== data.roomName)
            : [...this.store.ProjectSelectvalarr, data.roomName]

        this.store.roomIdarr = this.store.roomIdarr.includes(data.roomId * 1)
            ? this.store.roomIdarr.filter(item => item != data.roomId * 1)
            : [...this.store.roomIdarr, data.roomId * 1]
        //console.log(99999999999999999,this.store.ProjectSelectvalarr, this.store.roomIdarr)
    }
    @action
    submit = (history) => {

        if (!window.phone(this.store.AddFamilyMembers.phoneNo)) {
            Toast.info('输入手机格式不对', 1);
            return false
        }
        //window.identity()
        if (this.store.AddFamilyMembers.identityNo == "") {
            Toast.info('身份证不能为空', 1);
            return false
        }

        Modal.alert('提示', '确定要增加？', [
            {text: '关闭', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: async () => {

                    let cformData = {
                        fullName: this.store.AddFamilyMembers.fullName,
                        phoneNo: this.store.AddFamilyMembers.phoneNo,
                        identityNo: this.store.AddFamilyMembers.identityNo,
                        sex: this.store.AddFamilyMembers.sex,
                        birthday: this.store.AddFamilyMembers.birthday,
                        userType: this.store.AddFamilyMembers.userType,
                        roomIds: this.roomId,
                    }
                    let result = await window.POST({url: "auth/addFamilyUser", cformData});
                    if (!result.isSucess) {
                        return;
                    }
                    history.goBack(-1)
                }
            },
        ]);
        //history.push('/Certification/FamilyMembers')
        //console.log(111111111, this.store.cformData, result)
    }

    @action
    submitedit = async (history, id, authUserId) => {
        if (!VerificationMobileFormat.checkMobile(this.store.AddFamilyMembers.phoneNo)) {
            Toast.info('输入手机格式不对', 1);
            return false
        }

        if (this.store.AddFamilyMembers.identityNo == "") {
            Toast.info('身份证不能为空', 1);
            return false
        }

        Modal.alert('提示', '确定要修改？', [
            {text: '关闭', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: async () => {
                    let cformData = {
                        fullName: this.store.AddFamilyMembers.fullName,
                        phoneNo: this.store.AddFamilyMembers.phoneNo,
                        identityNo: this.store.AddFamilyMembers.identityNo,
                        sex: this.store.AddFamilyMembers.sex,
                        birthday: this.store.AddFamilyMembers.birthday,
                        userType: this.store.AddFamilyMembers.userType,
                        roomIds: this.roomId,
                        id: id,
                        authUserId: authUserId,
                    }
                    //console.log("cformData111111111111111111",cformData)
                    let result = await window.POST({url: "auth/updateFamilyUser", cformData});
                    if (!result.isSucess) {
                        return;
                    }
                    history.goBack(-1)
                }
            },
        ]);
        // history.push('/Certification/FamilyMembers')
    }


    //检查按纽状态
    @action
    _checkForm = (data) => {
        const array = [];
        delete data.editStatus;
        //console.log("data2", data)
        const bolean = data instanceof Object || data instanceof Array;
        if (bolean) {
            if (data instanceof Object) {
                for (let ele of Object.values(data)) {
                    array.push(ele);
                }
            }
            //console.log("array", array)
            const value = array.every((item, index) => {
                if (item !== '') {
                    return item !== false
                }					//注:自定义store时，必需为空('')
            });

            //console.log("value",value)
            this.store.colorStyle = !!value;
        } else {
            Toast.info(`只支持数组和对象`, 1);
        }

    };
    //添加手机和身份证获取其他信息
    @action
    getUserInfoByParam = async () => {
        const store = this.store;
        const {AddFamilyMembers, getUserInfoByParamval} = store;
        //window.identity()
        if (AddFamilyMembers.phoneNo.length === 11 && (AddFamilyMembers.identityNo !== "")) {
            // console.log(AddFamilyMembers);
            let cformData = {
                phoneNo: AddFamilyMembers.phoneNo,
                identityNo: AddFamilyMembers.identityNo
            };
            let result = await window.GET({url: "user/getUserInfoByParam", cformData});
            if (!result.isSucess) {
                return;
            }
            const {data} = result;
            if (data && data.id) {
                store.getUserInfoByParamval = data.id;
                AddFamilyMembers.id = data.id;
                AddFamilyMembers.nickName = data.nickName;
                AddFamilyMembers.sex = data.sex;
                AddFamilyMembers.birthday = data.birthday;
                AddFamilyMembers.fullName = data.fullName;
                console.log(data);
            }
        }
    }
}

export default Actions;
