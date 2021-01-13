/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Picker, List, PullToRefresh} from 'antd-mobile';

import headerimg from '../img/header.jpg';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'

@inject('store', 'actions')
@observer
export default class PhasetwoHomeLetterList extends React.Component {
    componentDidMount(){
        // 项目家书 - 65
        // 工程进展 - 66
        // 社区文化 - 67
        // if (subjectId === 65) {
        //     subjectName = "项目家书";
        //     name = 'yz';
        // } else if (subjectId === 66) {
        //     subjectName = "工程进展";
        //     name = 'yz';
        // } else if (subjectId === 67) {
        //     subjectName = "社区文化";
        //     name = 'yz';
        // } else {
        //     subjectName = "业主家书";
        //     name = 'sd';
        // }


        //  活动文章 1
        //  社区文化 33
        //  城市资讯 34
        //  社区通知 35

        const urlObject = window.getQueryString() || {};
        const subjectId = +urlObject.subjectId;
        let subjectName = '';
        let name = 'yz';
        switch (+urlObject.subjectId) {
            case 1:
                //  不一定有
                subjectName = '活动文章';
                break;
            case 33:
                subjectName = '社区文化';
                break;
            case 34:
                //  不在这里调
                subjectName = '城市资讯';
                break;
            case 35:
                subjectName = '社区通知';
                break;
            default :
                throw new Error('没有subjectId');
        }


        window.setWindowTitle(subjectName);
        console.log('name:', name);
        console.log('subjectId:', subjectId);
        this.props.actions.actionsPhasetwoHomeLetterList.listfun(name, subjectId)
        // this.props.actions.actionsPhasetwoHomeLetterList.articleList(1)
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoHomeLetterList} = store;
        const {actionsPhasetwoHomeLetterList} = actions;
        const {refreshing, listdataval, projectName, actbottom, projectList, name, height} = storePhasetwoHomeLetterList;
        const {Pickfun, itemfun, onRefresh} = actionsPhasetwoHomeLetterList;
        //let urlobj = window.getQueryString();
        // let Pickerfalse=true
        // if (name){
        //     Pickerfalse=false
        // }
        //const {tip}=storeTemplate;
        return <div className={"Components-HomeLetterList-container"}>
            {
                name === "yz" ? "" :
                    <Picker
                        data={projectList}
                        cols={1}
                        onOk={(v) => {
                            Pickfun(v)
                        }}
                    >
                        <List.Item arrow="down" className={"companyNametitle"}>{projectName}</List.Item>
                    </Picker>
            }
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
                        listdataval && listdataval.map((v, i) => {
                            return (
                                <div key={i} className={"item"} onClick={() => {
                                    itemfun(history, v)
                                }}>
                                    <div className={"img"}><img src={v.bigBanner}/></div>
                                    <div className={"title"}>{v.title}</div>
                                    {/* <div className={"date"}>{v.createTime}</div> */}
                                </div>
                            )
                        })
                    }
                </div>
                {listdataval && listdataval.length == 0 ? < div className={"actbottomgray"}>暂无数据</div> :
                    actbottom == 1 ? <div className={"actbottom"}>已经到底部</div> :
                        <div className={"actbottom"}>拉动刷新数据</div>
                }
            </PullToRefresh>
        </div>;
    }

    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
