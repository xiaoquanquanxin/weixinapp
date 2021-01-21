/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Flex, Button, WhiteSpace, WingBlank, TabBar} from 'antd-mobile';
/*当前页面用到的*/
import MyButton from "../../../pub/MyButton"
import RichTextDisplay from "../../../pub/RichTextDisplay/Component"

/*自定义类*/
import './Component.less'

@inject('store', 'actions')
@observer
export default class PhasetwoActivityListDetail extends React.Component {

    constructor(){
        super();
        this.state = {
            initStatus: false
        }

    }

    componentDidMount(){
        let id = this.props.match.params.id;
        if (id.includes('&newSessionKey')) {
            id = this.props.match.params.id.split('&newSessionKey')[0]
        }
        this.props.actions.actionsPhasetwoActivityListDetail.Noticefun(id, this.props.history)
        // this.props.actions.actionsPhasetwoActivityListDetail.getSessionKey()
        window.setWindowTitle("活动详情");

        wx.ready(function (){
            wx.showMenuItems({
                menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]   // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
            })
        });
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoActivityListDetail} = store;
        const {actionsPhasetwoActivityListDetail} = actions;
        const {NoticeData, resultCode, activityJoinerDetail} = storePhasetwoActivityListDetail;
        const {historyfun, activityJoinerDetailfun} = actionsPhasetwoActivityListDetail;
        console.log('NoticeData.activityStatus____', NoticeData.activityStatus)
        console.log('activityJoinerDetail.status____', activityJoinerDetail.status)
        return <div className={"Components-PhasetwoActivityListDetail-container article_img"}>
            <div className="content-wrap">
                <div className="top">
                    <div className="title">{NoticeData.articleTitle}</div>
                    {NoticeData.autho &&
                    <div className="sub-title">
                        <span>作者：{NoticeData.author}</span>
                    </div>
                    }
                </div>

                <RichTextDisplay>
                    {NoticeData && NoticeData.content && NoticeData.content.replace(/\n/g, "</br>")}
                </RichTextDisplay>
            </div>
            <div className={"heightbottom"}></div>
            {/*初始进来状态*/}
            {
                !this.state.initStatus && <div className={"fixed initclass"}>
                    <div>{
                        <div className={"center"} onClick={() => {
                            //  todo    修改逻辑
                            // this.setState({
                            //     initStatus: true
                            // });
                            // activityJoinerDetailfun(history, 2, activityJoinerDetail.joinerId)
                            this.props.history.push(`/PhasetwoActivityUserList/${window.getLocalData("activityid")}`);
                        }}>
                            {<MyButton type={"blue"} label={"我要报名"}/>}

                        </div>

                    }</div>
                </div>
            }
            {/*点了按纽，是否用seesionkey，如果有正常切换，如果没有去拿seesionkey,拿到后走原来逻辑*/}
            {
                this.state.initStatus && <div className={"fixed"}>
                    {
                        NoticeData && NoticeData.activityStatus == 2 &&  //活动状态(activityStatus)： （活动状态1-草稿，2-发布，3-报名结束，4-活动结束）
                        <div>{
                            activityJoinerDetail.status == 1 ?   //活动报名(status: 1-已报名-2-未报名)

                                <div className={"center"} onClick={() => {
                                    historyfun(history, 1, activityJoinerDetail.joinerId)
                                }}>
                                    {<MyButton type={"blue"} label={"查看详情"}/>}

                                </div>
                                :
                                <div className={"center"} onClick={() => {
                                    historyfun(history, 2, activityJoinerDetail.joinerId)
                                }}>
                                    {<MyButton type={"blue"} label={"我要报名"}/>}

                                </div>
                        }</div>
                    }

                    {
                        NoticeData && (NoticeData.activityStatus == 4 || NoticeData.activityStatus == 3) && activityJoinerDetail.status == 1 &&
                        <div className={"center"} onClick={() => {
                            historyfun(history, 1, activityJoinerDetail.joinerId)
                        }}>
                            {<MyButton type={"blue"} label={"查看详情"}/>}

                        </div>
                    }

                </div>
            }
        </div>;
    }
}
