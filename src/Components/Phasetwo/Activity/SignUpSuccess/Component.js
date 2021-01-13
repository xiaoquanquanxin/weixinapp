/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Flex, Button, WhiteSpace, WingBlank, TabBar} from 'antd-mobile';
/*当前页面用到的*/
import MyButton from "../../../pub/MyButton"
import StatusTips from '../../../pub/StatusTips';

/*自定义类*/
import './Component.less'

@inject('store', 'actions')
@observer
export default class PhasetwoActivitySignUpSuccess extends React.Component {
    componentDidMount(){
        this.props.actions.actionsPhasetwoActivitySignUpSuccess.Noticefun(this.props)
        window.setWindowTitle("活动详情")
    }

    submit(){
        //this.props.history.push('/HandInBuildingDetails')
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoActivitySignUpSuccess} = store;
        const {NoticeData, findInfoByJoinerId} = storePhasetwoActivitySignUpSuccess;
        let uObj = window.getQueryString();
        return <div className={"Components-PhasetwoActivitySignUpSuccess-container"}>
            <div>{
                <StatusTips
                    type={'sucess'}
                    label={'您的信息已提交成功！'}
                    describe={<div className={'describe'}>
                        <p>请及时关注审核状态，我们将在三个工作日内对您的信息进行审核。</p>
                    </div>}
                />
            }</div>
            {findInfoByJoinerId.isOpenPic == 1 &&
            <div className="QRcode">
                <img src={findInfoByJoinerId.picture}></img>
                <div className="QRtext">{findInfoByJoinerId.txtDescribe}</div>
            </div>
            }
            <div className={"btn"}>
                <div onClick={() => {
                    history.push('/PhasetwoActivityList')
                }}>
                    <MyButton width={160} type={"white"} label={"返回列表"}></MyButton>
                </div>
                <div onClick={() => {
                    history.push('/PhasetwoActivitySignUpExamine/' + uObj.joinerId)
                }}>
                    <MyButton width={160} type={"blue"} label={"查看详情"}></MyButton>
                </div>

            </div>
        </div>;
    }
}
