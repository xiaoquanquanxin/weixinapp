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
    WingBlank,
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
        colorStyle: false,
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
        actionsAddRepairYu.getRoomInfo();
    }

    //检查按纽状态

    /*输入描述*/
    onChange = (e) => {
        const {store} = this.props;
        const {storeAddRepairYu} = store;
        const {AddRepair} = storeAddRepairYu;

    };
    //提交
    submit = () => {
        const {store, actions} = this.props;
        const {colorStyle} = store.storeAddRepairYu;
        const {problemDescription, appealNature} = store.storeAddRepairYu.AddRepair;
        // console.log("colorStyle,appealNature,problemDescription",colorStyle,appealNature,problemDescription)
        if (!colorStyle) {
            if (!appealNature || appealNature === "") return Toast.info(`请选择类型`, 1);
            if (!problemDescription || problemDescription === "") return Toast.info(`请填写问题描述`, 1);
            Toast.info(`填写不全`, 1);
            return;
        }

        // console.log("submit:",JSON.stringify(this.refs.RUA.getData()))
        const aData = this.refs.RUA.getData();
        const voicelist = aData.voicelist;
        const recordCollection = [];
        for (let i = 0; i < voicelist.length; i++) {
            recordCollection.push(voicelist[i].id)
        }
        const ivlist = aData.ivlist;
        const imageCollection = [];
        const videoCollection = [];

        function isAssetTypeAnImage(ext){
            return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
        }

        for (var i = 0; i < ivlist.length; i++) {
            //判断是不是图片
            const filePath = ivlist[i].visitUrl;
            const id = ivlist[i].id;
            //获取最后一个.的位置
            const index = filePath.lastIndexOf(".");
            //获取后缀
            const ext = filePath.substr(index + 1);
            if (isAssetTypeAnImage(ext)) {
                imageCollection.push(id);
            } else {
                videoCollection.push(id);
            }
        }
        console.log("videoCollection:", videoCollection);
        console.log("imageCollection:", imageCollection);
        console.log("recordCollection:", recordCollection);


        const {actionsAddRepairYu} = actions;
        actionsAddRepairYu.submit(videoCollection.join(','), imageCollection.join(','), recordCollection.join(',')).then((data) => {
            //console.log("上报成功");
            //this.props.history.push(`${router.SubmitSucessYu}?id=${data.data.id}&code=${data.data.code}$type=${storeAddRepairYu.type}`);
            // console.log("判断三生三世", this.props.match.params.type)
            this.props.history.push(`${router.SubmitSucessYu[0]}` + "/" + this.props.match.params.type);
        })
    };

    change_RichUploadAttach(t, msg){
        console.log("change_RichUploadAttach:", t, msg)
    }

    render(){
        const apiupload = "user/common/uploadFileByMediaId";
        const apidel = "";
        const uploadonefile_api = config.urlPrefix + "user/common/uploadFile";
        const {store, actions} = this.props;
        const {files} = this.state;
        const {storeAddRepairYu} = store;
        const {actionsAddRepairYu} = actions;
        const {colorStyle, AddRepair, roomData} = storeAddRepairYu;
        const {_checkForm} = actionsAddRepairYu;
        //默认预约时间（不选择）
        //AddRepair.appointmentTime = new Date(this.state.date).format('yyyy-MM-dd hh:mm:ss');
        return <div className={'Components-RepairYu-AddRepair-container'}>
            <List className={'RepairYu-List'}>
                <Picker
                    data={roomData}
                    cols={1}
                    extra="请选择"
                    value={[AddRepair.pkRoom]}
                    onOk={(pkRoom) => {
                        //  防止重复
                        if (AddRepair.pkRoom === pkRoom) {
                            return
                        }
                        AddRepair.pkRoom = pkRoom;
                        //this.setState({ sValue: pkRoom });
                        actionsAddRepairYu.changeRoom(...pkRoom);
                        _checkForm(AddRepair);	//检查是否有空项，选修改提交按纽状态
                    }}
                >
                    <List.Item arrow="horizontal" multipleLine>房间名称</List.Item>
                </Picker>


            </List>

            <WhiteSpace size="lg"/>
            <p className="text-areaTitle">问题描述</p>
            <TextareaItem
                placeholder="输入问题描述"
                data-seed="logId"
                autoHeight
                count={350}
                rows={6}
                editable={true}
                onChange={(e) => {
                    AddRepair.problemDescription = e;
                    _checkForm(AddRepair);
                }
                }
            />
            <WhiteSpace size="lg"/>

            <WingBlank>
                <div className={'upload-img'}>
                    <p className={'upload-img-title'}>附件</p>
                    <div className={'upload-img-list'}>
                        <RichUploadAttach ref="RUA" debug={false}
                                          change={(t, msg) => this.change_RichUploadAttach(t, msg)}
                                          apiupload={apiupload}
                                          apidel={apidel}
                                          uploadonefile_api={uploadonefile_api}
                        />
                    </div>
                </div>
            </WingBlank>
            <WhiteSpace size="lg"/><WhiteSpace size="lg"/>
            <WingBlank>
                <Mybutton callback={this.submit}
                          type={colorStyle ? 'blue' : 'grey'} label="提交"/>
            </WingBlank>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
        </div>;
    }

}
