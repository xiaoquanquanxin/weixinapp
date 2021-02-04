//import {action } from 'mobx';
// 定义对数据的操作src\Components\Demo\SoundToWord\recordingTip.js
import {action} from 'mobx/lib/mobx';
import {Toast} from 'antd-mobile';
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';
import recordingTip from "../../Demo/SoundToWord/recordingTip.js"
import {ipUri} from "../../../config";
import {createHeader} from "../repairCommonRequest";
import {upDateUserInfo} from "../../../../lib/utils/utils";

class Actions {
    constructor(store){
        this.store = store;
    }

    _test = async () => {
        this.store.test = await this.incB()
    };
    /*
   获取用户信息
   * */
    @action
    userInfo = async () => {
        let url = `user/userInfo`;
        let cformData = {};
        let result = await window.GET({url, cformData});
        upDateUserInfo(false, result.data, false);
    };

    /*获取业主信息*/
    @action
    getRoomInfo = async () => {
        this.store.uppimg = [];
        this.store.imageFile = [];
        let url = "auth/getRoomInfo";
        let cformData = {userType: 0};
        let result = await window.GET({url, cformData});
        if (!result.isSucess) {
            return
        }
        const {AddRepair} = this.store;
        //获取下拉框的数据
        this.store.custInfo = result.data;
        AddRepair.roomId = result.data[0].roomId;
        AddRepair.roomName = result.data[0].roomName;
        AddRepair.custId = result.data[0].custId;
        this.store.roomData = result.data.map((val, index) => {
            return {label: val.roomName, value: val.roomId}
        });
        this.getUserInfo();
    };
    //user/userInfo
    /*认证*/
    @action
    userAuth = async (body) => {
        let url = `user/userAuth`;
        let cformData = {
            returnUrl: window.location.href,
        };
        //let cformData = config.format(obj);
        let result = await window.POST({url, cformData});
        if (!result.isSucess) {
            return
        }
        this.store.userAuthInfo = result.data;
        return result.resultCode
    };
    /*获取用户信息*/
    @action
    getUserInfo = async (body) => {
        const url = 'auth/getUserListByRoomId';
        const cformData = {roomId: this.store.AddRepair.roomId};
        const result = await window.GET({url, cformData});
        if (!result.isSucess) {
            return;
        }
        const data = result.data;
        //  去重复-以memberId
        const memberIdMap = {};
        data.forEach(item => {
            console.log(item.memberId, item.phoneNo, item.fullName);
            if (item.memberId && item.phoneNo && item.fullName && !memberIdMap[item.memberId]) {
                memberIdMap[item.memberId] = item;
            }
        });
        const getUserInfoData = [];
        //  过滤方法1，保留有memberId的用户
        // data.forEach(item => {
        //     if (memberIdMap[item.memberId]) {
        //         getUserInfoData.push(item);
        //         delete memberIdMap[item.memberId];
        //     }
        // });
        //  过滤方法2，仅能使用自己
        const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
        data.forEach(item => {
            if (item.phoneNo === userInfo.phoneNo) {
                getUserInfoData.push(item);
            }
        });
        if (!getUserInfoData.length) {
            return
        }
        const {AddRepair} = this.store;
        AddRepair.custName = getUserInfoData[0].fullName;
        AddRepair.custPhone = getUserInfoData[0].phoneNo;
        this.store.getUserInfoData = getUserInfoData.map((val, index) => {
            return {label: val.fullName, value: val.fullName, custPhone: val.phoneNo}
        })
    };

    //  更改房间信息和ID
    @action
    getUserInfoRoomfun(v){
        this.store.getUserInfoData.forEach((val, index) => {
            if (val.value === v) {
                const {AddRepair} = this.store;
                AddRepair.userName = val.value;
                AddRepair.custPhone = val.custPhone;
            }
        })
    }

    //更改房间信息和ID
    @action
    changeRoom(roomID){
        this.store.custInfo.forEach((val, index) => {
            if (val.roomId === roomID) {
                const {AddRepair} = this.store;
                AddRepair.roomName = val.roomName;
                AddRepair.roomId = val.roomId;
                this.getUserInfo();
            }
        });
    }

    @action
    ImgItemdatafun(data){
        console.log("ImgItemdatafun", data)
    }


    @action
    soundToWordSHOWfun = () => {
        this.store.soundToWordSHOW = true;
    }
    @action
    soundToWord = () => {
        //alert("soundToWord..");
        //开始录音
        var $tip = recordingTip();
        wx.startRecord();
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: (res) => {
                $tip.remove();
                // var localId = res.localId;
                // this.translateVoice(localId)
            }
        });

        $tip.click(() => {
            $tip.remove();
            this.store.soundToWordSHOW = false;
            wx.stopRecord({
                success: (res) => {
                    var localId = res.localId;
                    wx.translateVoice({
                        localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: (res) => {

                            //alert("translateVoice success:" + JSON.stringify(res))
                            if (res.translateResult == "undefined" || res.translateResult == "" || res.translateResult == undefined) {
                                this.store.AddRepair.questionDesc = this.store.AddRepair.questionDesc + ""
                            } else {
                                this.store.AddRepair.questionDesc = this.store.AddRepair.questionDesc + res.translateResult
                            }
                            //this.store.AddRepair.questionDesc = res.translateResult == "undefined" ? this.store.AddRepair.questionDesc + "" : this.store.AddRepair.questionDesc + res.translateResult
                            //console.log(111,res)
                            // alert(res.translateResult); // 语音识别的结果
                            this._checkForm(this.store.AddRepair)
                        },
                        fail: () => {
                            // alert("转换失败，当前手机版本不支持" + JSON.stringify(arguments))
                            alert("转换失败，请用输入法输入")
                        }
                    });
                    //this.translateVoice(localId)
                }/*,
                fail: function() => {
                    alert("stopRecord error:" + JSON.stringify(arguments))
                }*/
            });
        })
    }
    @action
    init = () => {
        //初始化store变量，都放这里
        const store = this.store;
        store.uppimg = [];
        store.imageFile = [];
        store.colorStyle = false;
        const {AddRepair} = store;
        AddRepair.appointmentTime = '';
        AddRepair.custId = '';
        AddRepair.custName = '';
        AddRepair.custPhone = '';
        AddRepair.questionDesc = '';
        AddRepair.roomId = '';
    };

    @action
    _checkForm = (data) => {
        const array = [];
        const bolean = data instanceof Object || data instanceof Array;
        if (bolean) {
            if (data instanceof Object) {
                console.log(JSON.parse(JSON.stringify(data)));
                for (let ele of Object.values(data)) {
                    array.push(ele);
                }
            }
            const value = array.every((item, index) => {
                return item !== '';							//注:自定义store时，必需为空('')
            });
            this.store.colorStyle = !!value;
        } else {
            Toast.info(`只支持数组和对象`, 1);
        }
    };

    //  添加图片到list
    @action
    getDataImgIDfun = (id, visitUrl, mediaId) => {
        console.log('新增了一条图片');
        console.log(id, visitUrl, mediaId);
        if (id) {
            this.store.uppimg.push(id);
            this.store.imageFile.push(visitUrl);
        }
    };
    //  刪除图片从list
    @action
    ImgItemClosefun = (data) => {
        const {imageFile, uppimg} = this.store;
        for (let i = 0; uppimg.length > i; i++) {
            if (data.id === uppimg[i]) {
                uppimg.splice(i, 1);
                imageFile.splice(i, 1);
            }
        }
    };


    //  antd 的上传回调，不需要了
    //  图片picker变化
    imgPickerOnChange = (imageFile, type, index) => {
        console.log(imageFile, type, index);
        //  删除
        if (index !== undefined) {
            this.store.imageFile = imageFile;
            return;
        }
        //  上传
        const fileItem = imageFile[imageFile.length - 1];
        const formData = new FormData();
        const {file, url} = fileItem;
        formData.append("file", file);
        formData.append('fileFormat', file.name);
        fileItem.url = url;
        window.JQ.ajax({
            type: "POST",
            data: formData,
            xhrFields: {withCredentials: true}, //允许携带cookie
            contentType: false,
            processData: false,
            headers: createHeader(),
            url: `${ipUri["/workorder"]}/fileUpload`,
            success: (data) => {
                //  接口没有返回正常的图片地址
                if (data.resultCode === 0) {
                    fileItem.fileUlr = data.data.fileUlr;
                    this.store.imageFile = imageFile;
                }
            },
            error: function (err){
                console.log(err);
            }
        });
    };

    //  提交
    @action
    submit = async (history, refs) => {
        const {AddRepair, uppimg, custInfo, imageFile} = this.store;
        const boolean = VerificationMobileFormat.checkMobile(AddRepair.custPhone);
        if (!boolean) {
            return false;
        }
        //  可以提交了
        let result = await new Promise(resolve => {
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const data = {
                // 客户主数据id
                custId: AddRepair.custId,
                // 诉求性质: 1.报事报修,2:咨询建议
                appealNature: 1,
                //  手机号
                contactNumber: AddRepair.custPhone,
                //  客诉描述详情
                problemDescription: AddRepair.questionDesc,
                //  联系地址
                contactAddress: AddRepair.roomName,
                //  客诉报事/报修人 (不必填)
                petitioner: AddRepair.custName,
                //  房间ID，同项目主数据
                pkRoom: this.getPkRoom(),
                //  房间名称，同项目主数据
                roomName: AddRepair.roomName,
                //  预约时间 （不必填）
                appointmentTime: AddRepair.appointmentTime.slice(0, 16),
                //  图片附件	以“，”逗号分隔，url格式 （不必填）
                imageCollection: imageFile.map(item => {
                    return item.fileUlr;
                }).join(),
                //  语音文件	以“，”逗号分隔，url格式 （不必填） 应该不需要这个参数 暂时先写上
                recordCollection: '',
                //  接待时间
                receptionistTime: '',
                //  客诉创建人
                pkHachiId: userInfo.id,
                //  业主
                customerName: AddRepair.custName,
            };
            window.JQ.ajax({
                crossDomain: true,//兼容ie8,9
                type: "POST",
                headers: createHeader(),
                url: `${ipUri["/workorder"]}/newWorkOrder`,
                data,
                success: (result) => {
                    resolve(result);
                }
            })
        });
        console.log(result);
        const {resultCode, data} = result;
        const {code} = data;
        this.addRepairHistory(history, code, resultCode);
    };

    //  提交到hachi
    @action
    addRepairHistory = async (history, code, resultCode,) => {
        let url = 'auth/addRepairHistory';
        const {AddRepair, custInfo, imageFile} = this.store;
        let cformData = {
            //  预约时间
            orderTime: AddRepair.appointmentTime,
            //  服务时间(替换预约时间)
            serviceTime: AddRepair.appointmentTime,
            //  房间唯一标识
            roomId: this.getPkRoom(),
            //  报修内容
            repairContent: AddRepair.questionDesc,
            //  报修人手机号
            phone: AddRepair.custPhone,
            //  报修人姓名
            repairName: AddRepair.custName,
            //  报修单号/错误码
            repairNo: code,
            //  报修图片
            repairImage: '',
            //  信息/错误信息
            note: code,
            //  是否报修成功 0 成功 1失败
            repairStatus: resultCode,
        };
        console.log('auth/addRepairHistory', JSON.parse(JSON.stringify(cformData)));
        let result = await window.POSTJSON({url, cformData});
        if (!result.isSucess) {
            return;
        }
        console.log(result);
        history.replace(`/SubmitSucess?code=${code}`);
    };

    @action
    getPkRoom(){
        let pkRoom = '';
        const {AddRepair, custInfo} = this.store;
        custInfo.forEach(item => {
            if (AddRepair.roomId === item.roomId) {
                pkRoom = item.pkDoor;
            }
        });
        console.log(`房间主数据id是 ${pkRoom}`);
        return pkRoom;
    }
}

export default Actions;


