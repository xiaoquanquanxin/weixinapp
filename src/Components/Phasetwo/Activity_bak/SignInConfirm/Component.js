/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import MyButton from "../../../pub/MyButton"

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class PhasetwoActivitySignInConfirm extends React.Component {
    componentDidMount() {
        this.props.actions.actionsPhasetwoActivitySignInConfirm.Noticefun(this.props.match.params.activityId)
        window.setWindowTitle("活动详情")
    }
    submit() {
        //this.props.history.push('/HandInBuildingDetails')
    }
    render() {
        const { store, actions } = this.props;
        const { storePhasetwoActivitySignInConfirm } = store;
        const { actionsPhasetwoActivitySignInConfirm } = actions;
        const { Interestfun, btnfun } = actionsPhasetwoActivitySignInConfirm;
        const { NoticeData, renList, Interestselects } = storePhasetwoActivitySignInConfirm;
        let setstatus=['','男','女']
        return <div className={"Components-PhasetwoActivitySignInConfirm-container"}>
            <div className={"userlist"}>
                {/* <div className={"user"}>
                    <div className="checkboxFive">
                        <input type="radio" checked={false} onChange={() => { }} />
                        <label></label>
                    </div>
                    <div className={"info"}>
                        <div className={"name"}><span>林小杰【业主】</span></div>
                        <div className={"phone"}><span>性别：男</span></div>
                        <div className={"phone"}><span>电话：13567895647</span></div>
                    </div>
                </div> */}
                {
                    NoticeData&&NoticeData.map((va, ia) => {
                        
                        return(
                            <div className={"user"} key={ia} onClick={() => { Interestfun(va.joinerInfoId) }}>
                                <div className="checkboxFive">
                                    <div className={`${Interestselects.includes(va.joinerInfoId) ? "li on" : 'li'}`} ></div>
                                    {/* <label></label> */}
                                </div>
                                <div className={"info"}>
                                    {
                                        va.paramArray.map((vv, ii) => {
                                            let ext = ""
                                            if (Array.isArray(toJS(vv.extValues))) {
                                                ext = vv.extValues.join(',')
                                            } else {
                                                ext = vv.extValues
                                            }
                                            return (
                                                <div key={ii}>
                                                    <div className={"phone"}><span>{vv.extTitle}：{ext}</span></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        
                    )})
                }
                
            </div>

            {NoticeData.length > 0 ?
                <div className={"btn"} onClick={() => { btnfun(this.props) }}>
                    <MyButton type={"blue"} label={"确定签到"} />
                </div>
            :
                    <div className={"btn"} onClick={() => { history.push(`/PhasetwoActivitySignUpExamine/${this.props.match.params.joinerId}`) }}>
                <MyButton type={"blue"} label={"返回扫码签到"} />
            </div>
            }

        </div>;
    }
}