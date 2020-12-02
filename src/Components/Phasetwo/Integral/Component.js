/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
import RichTextDisplay from "../../pub/RichTextDisplay/Component"
import Layout from "../../pub/LayoutContainersOne";
/*自定义类*/
import './Component.less'
import { map } from 'mobx';

// 公共组件
@inject('store', 'actions')
@observer
export default class PhasetwoIntegral extends React.Component {
    componentDidMount(){
        window.setWindowTitle("公告详情")
        this.props.actions.actionsPhasetwoIntegral.scoreDetailList()
    }
    render() {
        const {store, actions} = this.props;
        const { storePhasetwoIntegral} = store;
        const { actionsPhasetwoIntegral} = actions;
        //const { setnoticeDetail } = actionsListDetail;
        const { scoreDetailList } = storePhasetwoIntegral
        return (<div className="Component-PhasetwoIntegral-container" >
            <Layout>
                <div type="header">
                    <div className="Fraction">{scoreDetailList.memberScore&&scoreDetailList.memberScore}</div>
                    <div className={"list"}>
                        <div className={"list-content"}>
                            {
                                scoreDetailList.scoreList && scoreDetailList.scoreList.map((v,i)=>{
                                    return(
                                        <div className={"item-padding"} key={i}>
                                            <div className={"item-li"}>
                                                <div className={"left"}>
                                                    <div className={"text"}>{v.scoreName}</div>
                                                    <div className={"time"}>{v.createTime}</div>
                                                </div>
                                                <div className={"right"}>
                                                    +{v.score}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                            <div className={"item-padding"}>
                                <div className={"item-li"}>
                                    <div className={"left"}>
                                        <div className={"text"}>参加活动</div>
                                        <div className={"time"}>2019-11-03 12:23:45</div>
                                    </div>
                                    <div className={"right"}>
                                        +100
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            
        </div >);
    }
}

