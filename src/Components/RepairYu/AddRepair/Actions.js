import {action} from 'mobx';

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
        //  当前房屋数据
        AddRepair.roomId = roomList[0].roomId;
        AddRepair.roomName = roomList[0].roomName;
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
        contactList.forEach((val, index) => {
            if (val.roomId === roomId) {
                AddRepair.roomId = val.roomId;
                AddRepair.roomName = contactList[index].roomName;
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
        if (+this.store.type === 1) {
            if (this.store.labelName === "室内") {
                this.store.AddRepair["rangeFlag"] = 1;
            } else if (this.store.labelName === "室外") {
                this.store.AddRepair["rangeFlag"] = 0;
            }

        } else {
            this.store.AddRepair["rangeFlag"] = 0;
        }
        this.store.AddRepair.imageCollection = imageCollection;
        let url = 'auth/saveServiceBill';
        let cformData = this.store.AddRepair;
        // console.log("提交的数据格式:",cformData);
        let result = await window.POST({url, cformData});
        if (!result.isSucess) {
            return;
        }
        return result;
    };


}

export default Actions;
