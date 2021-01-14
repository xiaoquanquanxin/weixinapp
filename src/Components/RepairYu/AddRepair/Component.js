/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {
    Picker,
    WhiteSpace,
    Toast,
    TextareaItem,
    List,
    WingBlank, InputItem, DatePicker,
} from 'antd-mobile';

import Mybutton from '../../pub/MyButton';
import router from '../../../router'
import RadioLine from "./RadioBoxItem"
import ImgZoomHOC from '../../pub/ImgZoomHOC';
import RichUploadAttach from '../../../../lib/Components/RichUploadAttach'

/*自定义类*/
import './Component.less';
import config from '../../../config.js'

@ImgZoomHOC('')
// @Intercept('')
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    static defaultProps = {};
    state = {
        date: "",
        isValidated: false,
        radioDate: [
            {label: "室内", value: "1"},
            {label: "室外", value: "2"}
        ]
    };

    componentDidMount(){
        const {store, actions} = this.props;
        const {storeAddRepairYu} = store;
        const {actionsAddRepairYu} = actions;
        actionsAddRepairYu.init();
        storeAddRepairYu.type = +this.props.match.params.type;
        window.setWindowTitle(storeAddRepairYu.type === 1 ? '房屋报修' : '投诉建议');
        (async () => {
            const result = await actionsAddRepairYu.getRoomInfoFn();
            if (!result) {
                return;
            }
            const {AddRepair} = storeAddRepairYu;
            await actionsAddRepairYu.getUserListByRoomId(AddRepair.roomId);
        })();
    }

    //提交
    submit = () => {
        const {store, actions} = this.props;
        const {storeAddRepairYu} = store;
        const {isValidated, AddRepair} = storeAddRepairYu;
        const {problemDescription} = AddRepair;
        if (!isValidated) {
            if (!problemDescription || problemDescription === "") return Toast.info(`请填写问题描述`, 1);
            Toast.info(`填写不全`, 1);
            return;
        }

        // console.log("submit:",JSON.stringify(this.refs.RUA.getData()))
        const aData = this.refs.RUA.getData();
        const ivlist = aData.ivlist;
        const imageCollection = [];
        for (let i = 0; i < ivlist.length; i++) {
            //判断是不是图片
            const filePath = ivlist[i].visitUrl;
            const id = ivlist[i].id;
            //获取最后一个.的位置
            const index = filePath.lastIndexOf(".");
            //获取后缀
            const ext = filePath.substr(index + 1);
            if (isAssetTypeAnImage(ext)) {
                imageCollection.push(id);
            }
        }

        function isAssetTypeAnImage(ext){
            return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
        }

        console.log("imageCollection:", imageCollection);


        const {actionsAddRepairYu} = actions;
        actionsAddRepairYu.submit(imageCollection.join(',')).then((data) => {
            //console.log("上报成功");
            //this.props.history.push(`${router.SubmitSucessYu}?id=${data.data.id}&code=${data.data.code}$type=${storeAddRepairYu.type}`);
            // console.log("判断三生三世", this.props.match.params.type)
            this.props.history.push(`${router.SubmitSucessYu[0]}` + "/" + this.props.match.params.type);
        })
    };

    render(){
        const apiupload = "user/common/uploadFileByMediaId";
        const apidel = "";
        const uploadonefile_api = config.urlPrefix + "user/common/uploadFile";
        const {store, actions} = this.props;
        const {files} = this.state;
        const {storeAddRepairYu} = store;
        const {actionsAddRepairYu} = actions;
        const {isValidated, AddRepair, roomList, contactList} = storeAddRepairYu;
        return (
            <div className={'Components-RepairYu-AddRepair-container'}>
                <List className={'RepairYu-List'}>
                    <Picker
                        data={roomList}
                        cols={1}
                        extra="请选择房间"
                        value={[AddRepair.roomId]}
                        onOk={(roomId) => {
                            roomId = roomId[0];
                            //  防止重复
                            if (AddRepair.roomId === roomId) {
                                return
                            }
                            AddRepair.roomId = roomId;
                            actionsAddRepairYu.changeRoom(roomId);
                            actionsAddRepairYu.getUserListByRoomId(roomId);
                            actionsAddRepairYu._checkForm();
                        }}
                    >
                        <List.Item arrow="horizontal" multipleLine>房间名称</List.Item>
                    </Picker>

                    <Picker
                        data={contactList}
                        cols={1}
                        extra="请选择联系人"
                        value={[AddRepair.contactId]}
                        onOk={(contactId) => {
                            contactId = contactId[0];
                            //  防止重复
                            if (AddRepair.contactId === contactId) {
                                return
                            }
                            AddRepair.contactId = contactId;
                            actionsAddRepairYu.changeContact(contactId);
                            actionsAddRepairYu._checkForm();
                        }}
                    >
                        <List.Item arrow="horizontal" multipleLine>联系人</List.Item>
                    </Picker>

                    <InputItem
                        value={AddRepair.phoneNo}
                        type="phone"
                        placeholder="请输入手机号"
                        onChange={(phoneNo) => {
                            AddRepair.phoneNo = phoneNo;
                            actionsAddRepairYu._checkForm();
                        }}
                    >手机号码</InputItem>

                    <DatePicker
                        value={AddRepair.appointmentTime}
                        maxDate={new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10)}
                        onChange={(datePicker) => {
                            AddRepair.appointmentTime = datePicker;
                            actionsAddRepairYu._checkForm();
                        }}
                    >
                        <List.Item arrow="horizontal">预约时间</List.Item>
                    </DatePicker>
                </List>

                <WhiteSpace size="lg"/>
                <p className="text-areaTitle">问题描述</p>
                <div style={{paddingRight: '15px'}}>
                    <TextareaItem
                        placeholder="输入问题描述"
                        data-seed="logId"
                        autoHeight
                        count={200}
                        rows={6}
                        editable={true}
                        onChange={(e) => {
                            AddRepair.problemDescription = e;
                            actionsAddRepairYu._checkForm();
                        }}
                    />
                </div>
                <WhiteSpace size="lg"/>

                <WingBlank>
                    <div className={'upload-img'}>
                        <p className={'upload-img-title'}>图片</p>
                        <div className={'upload-img-list'}>
                            <RichUploadAttach ref="RUA" debug={false}
                                              change={(t, msg) => {
                                                  console.log('上传成功');
                                                  console.log(t);
                                                  console.log(msg);
                                                  actionsAddRepairYu._checkForm();
                                              }}
                                              apiupload={apiupload}
                                              apidel={apidel}
                                              uploadonefile_api={uploadonefile_api}
                            />
                        </div>
                    </div>
                </WingBlank>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WingBlank>
                    <Mybutton callback={this.submit}
                              type={isValidated ? 'blue' : 'grey'} label="提交"/>
                </WingBlank>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
            </div>
        );
    }

}
