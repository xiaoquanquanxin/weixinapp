//import {action } from 'mobx';
// 定义对数据的操作src\Components\Demo\SoundToWord\recordingTip.js
import {action} from 'mobx/lib/mobx';
import {Toast} from 'antd-mobile';
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';
import recordingTip from "../../Demo/SoundToWord/recordingTip.js"
import {ipUri} from "../../../config";

class Actions {
    constructor(store){
        this.store = store;
    }

    _test = async () => {
        this.store.test = await this.incB()
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
        //获取下拉框的数据
        this.store.custInfo = result.data;
        this.store.AddRepair.roomId = this.store.custInfo[0].roomId;
        this.store.AddRepair.roomName = this.store.custInfo[0].roomName;
        this.store.roomData = result.data.map((val, index) => {
            return {label: val.roomName, value: val.roomId}
        })
        this.getUserInfo()

    }
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
        let url = `auth/getUserListByRoomId`
        let cformData = {roomId: this.store.AddRepair.roomId};
        let result = await window.GET({url, cformData});
        if (!result.isSucess) {
            return
        }

        const data = result.data;
        //  去重复-以手机号
        const phoneMap = {};
        data.forEach(item => {
            if (item.phoneNo && !phoneMap[item.phoneNo]) {
                phoneMap[item.phoneNo] = item;
            }
        });
        const getUserInfoData = [];
        data.forEach(item => {
            if (phoneMap[item.phoneNo]) {
                getUserInfoData.push(item);
                delete phoneMap[item.phoneNo];
            }
        });

        this.store.AddRepair.custName = getUserInfoData[0].userName;
        this.store.AddRepair.custPhone = getUserInfoData[0].phoneNo;

        this.store.getUserInfoData = getUserInfoData.map((val, index) => {
            return {label: val.userName, value: val.userName, custPhone: val.phoneNo}
        })
    };

    //更改房间信息和ID
    @action
    getUserInfoRoomfun(v){

        this.store.getUserInfoData.forEach((val, index) => {
            //console.log(222, val.value, v)
            if (val.value == v) {
                this.store.AddRepair.userName = val.value;
                this.store.AddRepair.custPhone = val.custPhone;
            }
        })
        //	console.log(111, this.store.AddRepair)
    }

    //更改房间信息和ID
    @action
    changeRoom(roomID){
        this.store.custInfo.forEach((val, index) => {
            if (val.roomId == roomID) {
                this.store.AddRepair.roomName = val.roomName;
                this.store.AddRepair.roomId = val.roomId;
                this.getUserInfo()
            }
        })
        console.log(1211, this.store.AddRepair)
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
        const {AddRepair} = store;
        AddRepair.questionDesc = '';
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
        const file = imageFile[imageFile.length - 1];
        const formData = new FormData();
        formData.append("file", file);
        window.JQ.ajax({
            type: "POST",
            url: ipUri['/mpi'] + 'user/common/uploadFile',
            data: formData,
            xhrFields: {withCredentials: true}, //允许携带cookie
            contentType: false,
            processData: false,
            beforeSend: function (request){
                request.setRequestHeader("sessionkey", JSON.parse(localStorage.getItem('auth')));
            },
            success: (data) => {
                //  接口没有返回正常的图片地址
                if (data.resultCode === 0) {
                    const fileUrl = data.data[0] || 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg';
                    console.log(fileUrl);
                    file.url = fileUrl;
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
        const {AddRepair, uppimg} = this.store;
        const boolean = VerificationMobileFormat.checkMobile(AddRepair.custPhone);
        if (!boolean) {
            return false;
        }
        let url = 'auth/addRepair';
        let cformData = {
            appealNature: 1,
            receptionMethod: 7,
            pkRoom: AddRepair.roomId,
            petitioner: AddRepair.custName,
            callerNumber: AddRepair.custPhone,
            appoIntegermentTime: AddRepair.appointmentTime,
            imageCollection: uppimg.join(","),
            problemDescription: AddRepair.questionDesc,
            roomName: AddRepair.roomName
        };
        console.log("auth/addRepair提交数据", JSON.parse(JSON.stringify(cformData)));
        let result = await window.POSTJSON({url, cformData});
        if (!result.isSucess) {
            return;
        }
        this.addRepairHistory(result.data, result.resultCode, history);
    };

    //  提交到hachi
    @action
    addRepairHistory = async ({code}, resultCode, history) => {
        let url = 'auth/addRepairHistory';
        const {AddRepair, custInfo, imageFile} = this.store;
        let roomId;
        custInfo.forEach(item => {
            if (AddRepair.roomId === item.roomId) {
                roomId = item.pkDoor;
            }
        });
        let cformData = {
            //  预约时间
            orderTime: AddRepair.appointmentTime,
            //  服务时间(替换预约时间)
            serviceTime: AddRepair.appointmentTime,
            //  房间唯一标识
            roomId,
            //  报修内容
            repairContent: AddRepair.questionDesc,
            //  报修人手机号
            phone: AddRepair.custPhone,
            //  报修人姓名
            repairName: AddRepair.custName,
            //  报修单号/错误码
            repairNo: code,
            //  报修图片
            repairImage: imageFile.join(","),
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
    }
}

export default Actions;


