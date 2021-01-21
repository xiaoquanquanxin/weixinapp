/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Tabs, PullToRefresh} from 'antd-mobile';
/*自定义类*/
const tabs = [
    {title: "全部", sub: '0'},
    {title: "进行中", sub: '1'},
    {title: "已结束", sub: '2'},
];
import './Component.less'

@inject('store', 'actions')
@observer
export default class PhasetwoActivityList extends React.Component {
    componentDidMount(){
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("活动列表");
        const {actionsPhasetwoActivityList} = this.props.actions;
        actionsPhasetwoActivityList.init();
        actionsPhasetwoActivityList.Listfun(0, 1);
        wx.ready(function (){
            wx.hideMenuItems({
                menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
            });
        });
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoActivityList} = store;
        const {actionsPhasetwoActivityList} = actions;
        const {actListdata, refreshing, height, actbottom} = storePhasetwoActivityList;
        const {tabfun, onRefresh, signUpfun} = actionsPhasetwoActivityList;
        let stext = ['', '查看报名', '我要报名'];
        //console.log(actListdata && actListdata.length > 0, 111, actListdata.length)
        return <div className={"Components-ActivitySignUpList-container"}
                    style={{
                        height: height,
                        overflow: 'hidden'
                    }}
        >
            <PullToRefresh
                className={"onRefresh"}
                damping={60}
                direction={'up'}
                style={{
                    height: height,
                    overflow: 'auto'
                }}
                refreshing={refreshing}
                onRefresh={() => {
                    onRefresh()
                }}
            >
                <div>
                    <Tabs tabs={tabs}
                          initialPage={0}
                          onChange={(tab, index) => {
                              tabfun(index);
                          }}
                    >
                    </Tabs>
                    <div className={"tab"}>
                        <div className={"list"}>
                            {
                                actListdata && actListdata.map((v, i) => {
                                    return (
                                        <div className={"item"} key={i}>
                                            <div onClick={() => {
                                                //window.location.href = v.visitUrl
                                                history.push('/PhasetwoActivityListDetail/' + v.activityId)
                                            }}>
                                                <div className={"headerimg"}><img src={v.activityBanner}/>
                                                    {v.activityBanner && <sup
                                                        className="flag">{v.remainDay > 0 ? "只剩" + v.remainDay + "天" : "已结束"}</sup>}
                                                </div>
                                                <div className="title">{v.theme}</div>
                                                <div className="text">
                                                    <p>报名时间：{v.signupStartTime}至{v.signupEndTime}</p>
                                                    <p>活动时间：{v.activityStartTime}至{v.activityEndTime}</p>
                                                    <p>活动地点：{v.activityAddress}</p>
                                                    <p>报名人数：{v.signupCount}/{v.signupLimit == 0 ? "不限制" : v.maxSignupCount}</p>
                                                    {v.avtivityTarget && <p>活动对象：{v.avtivityTarget}</p>}
                                                </div>
                                            </div>
                                            {
                                                v.activitytype !== 2 && v.status == 2 ? <div className={"text"}>
                                                        {v.activitytype == 3 && <div className={"btn gray"}>报名已结束</div>}
                                                        {v.activitytype == 4 && <div className={"btn gray"}>活动已结束</div>}
                                                    </div> :
                                                    <div className={"text"} onClick={() => {

                                                        signUpfun(history, v)

                                                    }}>
                                                        <div className={"btn"}>{stext[v.status]}</div>
                                                    </div>
                                            }
                                            <div className={"tag"}>
                                                {/* <StatusFlag
                                                label={stext[v.status]}
                                                color={scolor[v.status]}
                                            // label={constant.ACTIONS_STATUS[1]}         //可填文本
                                            // status={1}                              //接回返回数据
                                            // belongType={constant.STATUSSTYLE[2]}   //所属类型(1:工单，2：活动，3:审核)
                                        /> */}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <div className={"tab"}>
                    2
                </div> */}
                    {actListdata && actListdata.length === 0 ? < div className={"actbottomgray"}>暂无数据</div> :
                        +actbottom === 1 ? <div className={"actbottom"}>已经到底部</div> :
                            <div className={"actbottom"}>拉动刷新数据</div>
                    }
                </div>
            </PullToRefresh>
        </div>;
    }

    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
