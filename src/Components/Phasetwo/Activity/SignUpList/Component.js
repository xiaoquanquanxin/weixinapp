/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Picker, List, DatePicker } from 'antd-mobile';
/*当前页面用到的*/
import StatusFlag from '../../../pub/StatusFlag';
/*自定义类*/
const tabs = [
    { title: "进行中", sub: '1' },
    { title: "已结束", sub: '2' },
];
import './Component.less'
@inject('store', 'actions')
@observer
export default class PhasetwoActivitySignUpList extends React.Component {
    /*state = {
        state1: ''
    }*/
    state = {
        companyNameValue: "实地·广州常春藤",
    };
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("我的活动-列表")
        this.props.actions.actionsPhasetwoActivitySignUpList.Listfun()
    }
    onChangeName = (color) => {
        this.setState({
            companyNameValue: color,
        });
    };
    render() {
        const { store, actions, history } = this.props;
        const { storePhasetwoActivitySignUpList } = store;
        const { companyName, Listdata, timeValues, status } = storePhasetwoActivitySignUpList
        const { actionsPhasetwoActivitySignUpList} = actions;
        const { statusfun, timefun } = actionsPhasetwoActivitySignUpList
        let scolor = ["o", '#4A90E2', '#64C433', '#D0021B', '#9B9B9B', '#64C433']
        //状态（1-待审核，2-报名成功，3-取消报名，4-审核不通过，5-签到完成）
        let stext = ["报名状态", '待审核', '报名成功', '取消报名', '报名失败','签到成功']
        let statusdata=[];
        stext.forEach((v,i)=>{
            statusdata.push({
                label: v,
                value:i
            })
        })
        statusdata.splice(0, 1);
        
        return <div className={"Components-ActivityMyList-container"}>
            <div className={"enroll"}>
                <Picker
                    data={statusdata}
                    cols={1}
                    onChange={(v) => { statusfun(v)}}
                >
                    <List.Item arrow="down" className={"companyNametitle"}>{status == "" ? "报名状态" : stext[status]}</List.Item>
                </Picker>
                <div className={"line"}></div>
                {/* <Picker
                    data={companyName}
                    cols={1}
                    onChange={(v) => { statusfun(v) }}
                >
                    <List.Item arrow="down" className={"companyNametitle"}>时间</List.Item>
                </Picker> */}
                <DatePicker
                    mode="date"
                    extra="请选择"
                    minDate={new Date(1930, 1, 1, 23, 59, 59)}
                    onOk={value => {
                        // console.log(99998776, value, value.format('YYYY-MM-dd'))
                        timefun(value.format('YYYY-MM-dd'))
                    }}
                >
                    <List.Item arrow="down" className={"companyNametitle"}>{timeValues == "" ? "时间" : timeValues}</List.Item>
                </DatePicker>

            </div>
            

                <div className={"tab"}>
                    <div className={"list"}>
                        {
                        Listdata &&Listdata.map((v,i)=>{
                            return(
                            <div className={"item"} key={i} 
                                    onClick={() => { history.push('/PhasetwoActivitySignUpExamine/' + v.joinerId); console.log(2121, v.joinerId)}}>
                                {/* <div className={"headerimg"}><img src={header1} />
                                <sup className="flag">只剩三天</sup>
                            </div> */}
                                <div className="title">{v.theme}</div>
                                <div className="text">
                                    <p>活动时间：{v.activityStartTime}~{v.activityEndTime}</p>
                                    <p>活动地点：{v.activityAddress}</p>
                                    {/* <p>报名人数：142/300</p> */}
                                </div>
                                <div className={"tag"}>
                                    <StatusFlag
                                            label={stext[v.status]}
                                            color={scolor[v.status]}
                                    />
                                </div>
                            </div>
                            )
                        })
                        }
                        

                       
                    </div>
                    
                </div>
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}