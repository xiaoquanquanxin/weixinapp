/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import MyButton from "../../../pub/MyButton"
import RichTextDisplay from "../../../pub/RichTextDisplay/Component"
import StatusTips from '../../../pub/StatusTips';

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class PhasetwoActivityCancelSuccess extends React.Component {
    componentDidMount() {
        this.props.actions.actionsPhasetwoActivityCancelSuccess.Noticefun()
        window.setWindowTitle("活动详情")
    }
    submit() {
        //this.props.history.push('/HandInBuildingDetails')
    }
    render() {
        const { store, actions, history } = this.props;
        const { storePhasetwoActivityCancelSuccess } = store;
        const { NoticeData } = storePhasetwoActivityCancelSuccess;
        return <div className={"Components-PhasetwoActivityCancelSuccess-container"}>
            <div >{
                <StatusTips
                    type={'sucess'}
                    label={'您的报名已取消感谢你的参与'}
                    describe={<div className={'describe'}>
                    </div>}
                />
            }</div >
            <div className={"btn"} onClick={() => { history.push('/PhasetwoActivitySignUpList') }} >
                <MyButton type={"blue"} label={"返回我的活动"}></MyButton>
            </div>
        </div>;
    }
}