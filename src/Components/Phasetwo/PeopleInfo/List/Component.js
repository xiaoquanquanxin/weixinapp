/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Picker, List, PullToRefresh } from 'antd-mobile';

import address from '../img/address.png';
/*当前页面用到的*/
const Item=List.Item

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class PhasetwoPeopleInfoList extends React.Component {
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("便民信息")
        this.props.actions.actionsPhasetwoPeopleInfoList.listfun()
    }
    render() {
        const { store, actions, history } = this.props;
        const { storePhasetwoPeopleInfoList } = store;
        const { newListdata, projectName, refreshing, projectList, actbottom, height } = storePhasetwoPeopleInfoList
        const { actionsPhasetwoPeopleInfoList} = actions;
        const { Pickfun, itemfun, onRefresh} = actionsPhasetwoPeopleInfoList
       // console.log(111, newListdata)
        return <div className={"Components-HomeLetterList-container"}>
   
            {/* <Picker
                data={provincesList}
                cols={2}
                onOk={(v) => { PickProvinces(v) }}
            >
                <List.Item arrow="down" className={"companyNametitle"}>{provincesName}·{cityName}</List.Item>
            </Picker> */}

            <Picker
                data={projectList}
                cols={1}
                onOk={(v) => { Pickfun(v) }}
            >
                <List.Item arrow="down" className={"companyNametitle"}>{projectName}</List.Item>
            </Picker>
            <PullToRefresh
                className={"onRefresh"}
                damping={60}
                direction={'up'}
                style={{
                    height: height,
                    overflow: 'auto',
                }}
                refreshing={refreshing}
                onRefresh={() => {
                    onRefresh()
                }}
            >
            <div className={"list"}>
                {
                        newListdata && newListdata.map((v, i) => {
                        return (
                            <div className={"item"} key={i} >
                                <div className={"img"} onClick={() => { itemfun(history, v) }}><img src={v.bigBanner} /></div>
                                <div className={"title"} onClick={() => { itemfun(history, v) }}>{v.title}</div>
                                <div className={"date"} onClick={() => { window.location.href = v.addressUrl}}><img src={address} /><span>{v.projectAddress}</span></div>
                            </div>
                        )
                    })
                }
                
            </div>
                {newListdata && newListdata.length == 0 ? < div className={"actbottomgray"}>暂无数据</div> :
                    actbottom == 1 ? <div className={"actbottom"}>已经到底部</div> : <div className={"actbottom"}>拉动刷新数据</div>
                }
            </PullToRefresh>
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}