/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
import RichTextDisplay from "../../pub/RichTextDisplay/Component"
import Layout from "../../pub/LayoutContainersOne";
/*自定义类*/
import './Component.less'
import {map} from 'mobx';

// 公共组件
@inject('store', 'actions')
@observer
export default class PhasetwoMyQuestionnaireList extends React.Component {
    componentDidMount(){
        window.setWindowTitle("我的问卷");
        this.props.actions.actionsPhasetwoMyQuestionnaireList.Listfun(this.props.match.params.type);
        console.log(this.props.match.params.type);
    }

    render(){
        const {store, history} = this.props;
        const {storePhasetwoMyQuestionnaireList} = store;
        const {ListData, questiontype} = storePhasetwoMyQuestionnaireList;
        let isDone = ["未知", "已填写", "未填写"];
        let sessionKeyurl = "";
        if (window.getLocalData('UserInfodata') !== "") {
            sessionKeyurl = "&sessionKey=" + JSON.parse(window.getLocalData('auth'))
        }
        return (
            <div className="Component-PhasetwoMyQuestionnaireList-container">
                <div className={"list"}>
                    {
                        ListData && ListData.map((v, i) => {
                            return (
                                <div className={"item"} key={i} onClick={() => {
                                    history.push(`/PhasetwoMyQuestionnaire/${questiontype}/${v.surveyId}/${v.isDone}${"?isDone=" + v.isDone + sessionKeyurl}`)
                                }}>
                                    <div className={"tit"}>{v.surveyName}</div>
                                    <div className={"time"}>[调研时间] {v.startTime} - {v.endTime}</div>
                                    <div className={"content"}>{v.surveyDesc}...</div>
                                    <div className={"lag"}>{isDone[v.isDone]}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

