/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
import RichTextDisplay from "../../../pub/RichTextDisplay/Component"
/*自定义类*/
import './Component.less'

// 公共组件
@inject('store', 'actions')
@observer
export default class PhasetwoHomeLetterListDetail extends React.Component {
    componentDidMount(){
        window.setWindowTitle("公告详情")
        //this.props.actions.actionsNoticeDetail.setnoticeDetail(this.props.match.params.noticeId)
    }
    render() {
        const {store, actions} = this.props;
        const { storePhasetwoHomeLetterListDetail} = store;
        const { actionsPhasetwoHomeLetterListDetail} = actions;
        //const { setnoticeDetail } = actionsListDetail;
        const { setnoticeDetail } = storePhasetwoHomeLetterListDetail
        return <div url={"/Notice"} className="Components-Notice-container article_img">
            
            <div className="content-wrap">
                <div className="content">
                    <div className="top">
                        <div className="title">{setnoticeDetail.noticeTitle}</div>
                        <div className="sub-title">
                            <span>作者：{setnoticeDetail.authorName}</span>
                            <span className="date">{setnoticeDetail.updateTime && setnoticeDetail.updateTime.split(" ")[0]}</span>
                        </div>
                    </div>
                    <div className="center">
                        <RichTextDisplay>
                            {setnoticeDetail.content}
                        </RichTextDisplay>
                    </div>
                </div>
            </div>
        </div>;
    }
}

