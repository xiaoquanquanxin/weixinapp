/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { List, InputItem, Picker, DatePicker, WhiteSpace, TextareaItem,WingBlank} from 'antd-mobile';
import Mybutton from "../../pub/MyButton";
/*自定义类*/
import './Component.less'
/*当前页面用到的*/
// const data1 = Array.from(new Array(3)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//     text: `name${i}`,
// }));
const Item = List.Item;
const sex = [
    [
        {
            label: '男',
            value: '男',
        },
        {
            label: '女',
            value: '女',
        },
    ]
];
const clientType =[
    [
        {
            label: '业主',
            value: '业主',
        },
    ]
]
const clothsSize = [
    [
        {
            label: 'M',
            value: 'M',
        },
        {
            label: 'L',
            value: 'L',
        },
        {
            label: 'XL',
            value: 'XL',
        },
    ]
]
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    /*state = {
        state1: ''
    }*/
    constructor(props) {
        super(props);
        this.state = {
            sexValue: [],//性别的值
            date: "",
            clientType:[],
        }
    }
    //下一步
    Next() {

    }
    submit(){

    }
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("我的报名")
    }
    render() {
        const { store, actions } = this.props;
        const { storeTemplate } = store;
        //const { actionsTemplate} = actions;
        const { tip } = storeTemplate;
        return <div className={"Components-AddActiveStaff-container"}>
            <div className="error-Tip">

            </div>
            <List renderHeader={() => '报名信息'}>
                <InputItem
                    type={"text"}
                    placeholder="姓名"
                    onChange={(v) => { console.log('onChange', v); }}
                    onBlur={(v) => { console.log('onBlur', v); }}
                >姓名</InputItem>
                <InputItem
                    type={"phone"}
                    placeholder="手机号码"
                    onChange={(v) => { console.log('onChange', v); }}
                    onBlur={(v) => { console.log('onBlur', v); }}
                >手机号码</InputItem>
                <InputItem
                    type={"phone"}
                    placeholder="text"
                    onChange={(v) => { console.log('onChange', v); }}
                    onBlur={(v) => { console.log('onBlur', v); }}
                >身份证号码</InputItem>
                <Picker
                    data={sex}
                    title="选择性别"
                    cascade={false}
                    value={this.state.sexValue}
                    onChange={v => this.setState({sexValue:v})}
                    onOk={v => this.setState({sexValue:v })}
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
                <DatePicker
                    mode="date"
                    title="出生日期"
                    extra="请选择"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">出生日期</List.Item>
                </DatePicker>
                <InputItem
                    type={"number"}
                    placeholder=""
                    onChange={(v) => { console.log('onChange', v); }}
                    onBlur={(v) => { console.log('onBlur', v); }}
                >年龄</InputItem>
                <Picker
                    data={clientType}
                    title="客户类型"
                    cascade={false}
                    value={this.state.clientType}
                    onChange={v => this.setState({ clientType: v })}
                    onOk={v => this.setState({ clientType: v })}
                >
                    <List.Item arrow="horizontal">客户类型</List.Item>
                </Picker>
                <Picker
                    data={clothsSize}
                    title="服装尺码"
                    cascade={false}
                    value={this.state.clothsSize}
                    onChange={v => this.setState({ clothsSize: v })}
                    onOk={v => this.setState({ clothsSize: v })}
                >
                    <List.Item arrow="horizontal">服装尺码</List.Item>
                </Picker>
            </List>
            <WhiteSpace />
            <List>
                <TextareaItem
                    placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室、公司地址等"
                    data-seed="logId"
                    ref={el => this.autoFocusInst = el}
                    rows={3}
                />
            </List>
            <WhiteSpace size="lg"/>
            <WingBlank>
                <Mybutton callback={this.submit} type="blue" label={"确认报名"}/>
                <WhiteSpace size="lg" />
                <p className="redSpan">需要提交身份证号或年龄，服装尺码</p>
            </WingBlank>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}