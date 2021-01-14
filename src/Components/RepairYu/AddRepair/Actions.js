import {action} from 'mobx';
import {ipUri} from "../../../config";

class Actions {
    constructor(store){
        this.store = store;
    }

    @action
    init = () => {
        const store = this.store;
        store.isValidated = false;
        const {AddRepair} = store;
        AddRepair.roomId = "";
        AddRepair.pkDoor = "";
        AddRepair.roomName = "";

        AddRepair.contactId = '';
        AddRepair.contactName = '';
        AddRepair.phoneNo = '';

        AddRepair.problemDescription = "";
    };

    //  获取房间信息
    @action
    getRoomInfoFn = async () => {
        let url = "auth/getRoomInfo";
        let cformData = {};
        let result = await window.GET({url, cformData});
        if (!result.isSucess) {
            return;
        }
        const {data: roomList} = result;
        //获取下拉框的数据
        const store = this.store;
        const {AddRepair} = store;
        //  组织picker数据
        roomList.forEach(item => {
            item.label = item.roomName;
            item.value = item.roomId;
        });
        //  赋值
        store.roomList = roomList;
        if (!roomList.length) {
            return false;
        }
        const item = roomList[0];
        //  当前房屋数据
        AddRepair.roomId = item.roomId;
        AddRepair.pkDoor = item.pkDoor;
        AddRepair.custId = item.custId;
        AddRepair.roomName = item.roomName;
        return true;
    };

    //  根据roomId拿当前房间下的联系人
    @action
    getUserListByRoomId = async (roomId) => {
        const store = this.store;
        const {AddRepair} = store;
        //  先重置当前联系人的信息
        AddRepair.contactId = '';
        AddRepair.contactName = '';
        const url = `auth/getUserListByRoomId`;
        let cformData = {roomId};
        let result = await window.GET({url, cformData});
        if (!result.isSucess) {
            return;
        }
        const {data: contactList} = result;
        AddRepair.contactList = contactList;
        //  组织picker数据
        contactList.forEach((item, index) => {
            item.label = item.userName;
            item.value = `contactId_${index}`;
        });
        //  筛选数据，至少得有姓名
        store.contactList = contactList.filter(item => {
            return item.userName
        });
        const contactItem = store.contactList[0];
        if (!contactItem) {
            return;
        }
        console.log(JSON.parse(JSON.stringify(contactItem)));
        const {value: contactId, label: contactName, phoneNo} = contactItem;
        AddRepair.contactId = contactId;
        AddRepair.contactName = contactName;
        AddRepair.phoneNo = phoneNo;
    };

    //  更改房间信息和ID
    @action
    changeRoom(roomId){
        const {AddRepair, contactList} = this.store;
        contactList.forEach((item, index) => {
            if (item.roomId === roomId) {
                AddRepair.roomId = item.roomId;
                AddRepair.pkDoor = item.pkDoor;
                AddRepair.custId = item.custId;
                AddRepair.roomName = item.roomName;
            }
        })
    }

    //  更改联系人信息和ID
    @action
    changeContact(contactId){
        const {AddRepair, contactList} = this.store;
        contactList.forEach((contactItem, index) => {
            if (contactItem.contactId === contactId) {
                const {value: contactId, label: contactName, phoneNo} = contactItem;
                AddRepair.contactId = contactId;
                AddRepair.contactName = contactName;
                AddRepair.phoneNo = phoneNo;
            }
        })
    }

    //  检查是否有空项，选修改提交按纽状态
    @action
    _checkForm = () => {
        const {AddRepair} = this.store;
        let keys = ['roomId', 'problemDescription'];
        for (let i = 0; i < keys.length; i++) {
            if (!AddRepair[keys[i]]) {
                this.store.isValidated = false;
                break;
            }
        }
        this.store.isValidated = true;
        console.log(JSON.parse(JSON.stringify(AddRepair)));
    };

    /*提交*/
    @action
    submit = async (imageCollection) => {
        //较验电话号码格式
        // const boolean = VerificationMobileFormat.checkMobile(this.store.AddRepair.custPhone);
        // if (!boolean) return false;
        // if (this.state.fillNofinish) {
        // 	console.log('提交的数据：', AddRepair);
        // 	let address = constant.REPORTREPAIR;										//默认报事报修
        // 	if (this.props.match.params.type * 1 === constant.COMPLAINSUGGESTIONS) {	//投诉建议
        // 		address = constant.COMPLAINSUGGESTIONS
        // 	}
        // 	this.props.history.push(`${router.SubmitSucess}`);
        // 	// this.props.history.push(`${router.RepairList[0]} /${address}`);
        // }
        const {AddRepair, type} = this.store;
        this.store.AddRepair.imageCollection = imageCollection;
        const url = '/auth/saveServiceBill';
        const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
        const cformData = {
            //  客户姓名
            customerName: AddRepair.contactName,
            //  联系方式
            contactNumber: AddRepair.phoneNo,
            //  诉求性质,诉求性质: 1.报事报修,2:咨询建议
            appealNature: type,
            //  客诉描述
            problemDescription: AddRepair.problemDescription,
            //  联系地址
            contactAddress: AddRepair.roomName,
            //  请求人
            petitioner: AddRepair.contactName,
            //  房间ID，同项目主数据
            pkRoom: AddRepair.pkDoor,
            //  房间名称，同项目主数据
            roomName: AddRepair.roomName,
            //  预约时间
            appointmentTime: AddRepair.appointmentTime.format('yyyy-MM-dd'),
            //  图片附件 [{"fileName":"xxx","filePath":"aaaa","sysFileName":"aaaa"}]
            imageCollection,
            //  主数据客户id
            custId: AddRepair.custId,
            //  接待时间，预约时间的一天以后
            receptionistTime: new Date(AddRepair.appointmentTime.getTime() + 1000 * 60 * 60 * 24).format('yyyy-MM-dd'),
            //  客诉创建人
            pkHachiId: userInfo.id,
        };
        console.log("提交的数据格式:", cformData);
        // debugger;
        // window.JQ.ajax({
        //     type: "post",
        //     url: `/life-web/auth/saveServiceBill`,
        //     contentType: "application/x-www-form-urlencoded",
        //     data: cformData,
        //     success: (result) => {
        //         console.log(result);
        //     }
        // });

        let result = await window.POST({url, cformData, prefix: ipUri['/life-web']});
        if (!result.isSucess) {
            return;
        }
        return result;
    };


}

export default Actions;
