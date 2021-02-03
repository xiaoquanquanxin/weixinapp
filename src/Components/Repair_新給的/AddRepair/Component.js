/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {
    Flex,
    Button,
    Modal,
    Picker,
    InputItem,
    WhiteSpace,
    Toast,
    TabBar,
    TextareaItem,
    DatePicker,
    List,
    ImagePicker,
    WingBlank,
} from 'antd-mobile';

const alert = Modal.alert;
import Mybutton from '../../pub/MyButton';
import ImagePickerWX from '../../../../lib/Components/ImagePickerWX'

const data = [];
import ImgZoomHOC from '../../pub/ImgZoomHOC';

import VerificationMobileFormat from '../../pub/VerificationMobileFormat';


/*当前页面用到的*/
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

/*自定义类*/
import './Component.less';
import Intercept from '../../Intercept';
import RichUploadAttach from "../../../../lib/Components/RichUploadAttach";
import config from "../../../config";

// @Intercept('')
@inject('store', 'actions')
@observer
export default class AddRepair extends React.Component {
    static defaultProps = {};

    constructor(){
        super();
    }

    state = {
        fillNofinish: true,
        files: data,
        multiple: true,
        date: "",
        colorStyle: false,
        questionDesc: "问题描述\n房间+部位+问题  示例：客厅天花筒灯不亮"
    };

    componentDidMount(){
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle('房屋报修');
        const {actionsAddRepair}  = this.props.actions;
        actionsAddRepair.init();
        actionsAddRepair.getRoomInfo();
        //截栏是否认证
    }

    onFocusfun(){
        this.setState({
            questionDesc: ""
        })
    }

    onBlurfun(AddRepairquestionDesc){
        this.setState({
            questionDesc: AddRepairquestionDesc ? "" : "问题描述\n房间+部位+问题  示例：客厅天花筒灯不亮"
        })
    }

    render(){
        const apiupload = "user/common/uploadFileByMediaId";
        const uploadonefile_api = config.urlPrefix + "user/common/uploadFile";
        const {store, actions} = this.props;
        const {storeAddRepair} = store;
        const {actionsAddRepair} = actions;
        const {submit, soundToWord, _checkForm, soundToWordSHOWfun, getUserInfoRoomfun, getDataImgIDfun, ImgItemClosefun} = actionsAddRepair
        const {tip, AddRepair, roomData, colorStyle, soundToWordSHOW, getUserInfoData} = storeAddRepair;
        var datenow = new Date;
        var dateYear = datenow.getFullYear() + 10
        const {questionDesc} = this.state;
        //console.log("dateYear", dateYear)
        //默认预约时间（不选择）
        //AddRepair.appointmentTime = new Date(this.state.date).format('yyyy-MM-dd hh:mm:ss');
        // console.log("roomData", JSON.parse(JSON.stringify(roomData)),);
        // console.log("AddRepair", JSON.parse(JSON.stringify(AddRepair)),);
        return (
            <div className={'Components-Repair-AddRepair-container'}>
                <div style={{display: 'block'}}>
                    <div>
                        <Picker
                            data={roomData}
                            cols={1}
                            extra="请选择"
                            value={[AddRepair.roomId]}
                            onOk={(v) => {
                                console.log(v);
                                AddRepair.roomId = v + '';//注入store
                                actionsAddRepair.changeRoom(...v);
                                _checkForm(AddRepair);	//检查是否有空项，选修改提交按纽状态
                            }
                            }
                        >
                            <List.Item arrow="horizontal" onClick={this.onClick}>房间名称</List.Item>
                        </Picker>
                    </div>
                    <div>
                        <List>
                            {/* <InputItem
					maxLength={100}
					placeholder="请输入联系人"
					value={AddRepair.custName}
					editable={false}
					onChange={(e) => {
						AddRepair.custName = e;
						_checkForm(AddRepair);
					}
					}
				>联系人</InputItem > */}
                            <Picker
                                data={getUserInfoData}
                                cols={1}
                                extra="请选择"
                                value={[AddRepair.custName]}
                                onOk={(v) => {
                                    console.log(v);
                                    AddRepair.custName = v + '';//注入store
                                    actionsAddRepair.getUserInfoRoomfun(...v);
                                    _checkForm(AddRepair);	//检查是否有空项，选修改提交按纽状态
                                }
                                }
                            >
                                <List.Item arrow="horizontal">联系人</List.Item>
                            </Picker>

                            <InputItem
                                align={'right'}
                                maxLength={11}
                                placeholder="请输入联系电话"
                                value={AddRepair.custPhone}
                                onChange={(e) => {
                                    VerificationMobileFormat.setCallerNumber(e) ? AddRepair.custPhone = e : AddRepair.custPhone = '';
                                    _checkForm(AddRepair);
                                }
                                }
                            >联系电话</InputItem>
                        </List>
                    </div>
                    <div>
                        <DatePicker
                            mode="datetime"
                            extra="请选择预约时间"
                            maxLength={100}
                            value={this.state.date}
                            onChange={date => {
                                console.log(date);
                                this.setState({date});
                            }}
                            maxDate={new Date(dateYear, 11, 31, 23, 59, 59)}
                            onOk={(v) => {
                                AddRepair.appointmentTime = new Date(v).format('yyyy-MM-dd hh:mm:ss');
                                _checkForm(AddRepair);
                            }
                            }
                        >
                            <List.Item arrow="horizontal">预约时间</List.Item>
                        </DatePicker>
                    </div>
                    <WhiteSpace size="lg"/>
                    <div>
                        <TextareaItem
                            className={AddRepair.questionDesc ? "" : "grayval"}
                            placeholder=""
                            data-seed="logId"
                            autoHeight
                            count={200}
                            rows={6}
                            editable={true}
                            value={questionDesc + AddRepair.questionDesc}
                            onChange={(e) => {
                                AddRepair.questionDesc = e;
                                _checkForm(AddRepair);
                            }
                            }
                            onFocus={(e) => {

                                this.onFocusfun()
                                soundToWordSHOWfun()
                            }}
                            onBlur={() => {
                                this.onBlurfun(AddRepair.questionDesc)
                            }}
                        />
                    </div>
                    <WhiteSpace size="lg"/>
                </div>
                <div className={"gray"}/>
                <WingBlank>
                    <div className={'upload-img'}>
                        <p className={'upload-img-title'}>图片</p>
                        <div className={'upload-img-list'}>
                            {/*<div data-msg='第一版源码' style={{display: 'none'}}>第一版源码*/}
                            {/*    <RichUploadAttach ref="RUA" debug={false}*/}
                            {/*                      change={(t, msg) => {*/}
                            {/*                          console.log('上传成功');*/}
                            {/*                          console.log(t);*/}
                            {/*                          console.log(msg);*/}
                            {/*                          actionsAddRepairYu._checkForm();*/}
                            {/*                      }}*/}
                            {/*                      apiupload={apiupload}*/}
                            {/*                      apidel={''}*/}
                            {/*                      uploadonefile_api={uploadonefile_api}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div data-msg='第二版源码'>
                                <ImagePickerWX ref="IPWX"
                                               apiupload={"user/common/uploadFileByMediaId"}
                                               apidel={""}
                                               getDataImgID={(id, visitUrl, mediaId) => {
                                                   console.log('getDataImgID');
                                                   console.log(`id ${id} , visitUrl ${visitUrl} , mediaId ${mediaId}`);
                                                   getDataImgIDfun(id, visitUrl, mediaId)
                                               }}
                                               ImgItemClosefun={(data) => {
                                                   console.log('ImgItemClosefun');
                                                   console.log(data);
                                                   ImgItemClosefun(data)
                                               }}
                                />
                            </div>
                            {/*<div data-msg='antd mobile'>antd mobile*/}
                            {/*    <ImagePicker*/}
                            {/*        onChange={this.onChangeImg}*/}
                            {/*        onImageClick={(index, fs) => {*/}
                            {/*            this.props.onClick(fs[index].url);*/}
                            {/*        }}  //点击图片触发的回调*/}
                            {/*        multiple={this.state.multiple}     //总共上传图片的数量*/}
                            {/*        onFail={this.onFailImg}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </WingBlank>
                <WhiteSpace size="lg"/><WhiteSpace size="lg"/>
                <WingBlank>
                    <Mybutton callback={() => {
                        colorStyle ? submit(this.props.history, this.refs) : undefined
                    }}
                              type={colorStyle ? 'blue' : 'grey'} label="提交"/>
                </WingBlank>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
            </div>
        )
    }

}


