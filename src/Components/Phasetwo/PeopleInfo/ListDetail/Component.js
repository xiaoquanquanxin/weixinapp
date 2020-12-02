/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
import RichTextDisplay from "../../../pub/RichTextDisplay/Component"
/*自定义类*/
import './Component.less'
import header from '../img/header.jpg';
import address from '../img/address.png';


// 公共组件
@inject('store', 'actions')
@observer
export default class PhasetwoPeopleInfoListDetail extends React.Component {
    componentDidMount(){
        window.setWindowTitle("便民信息")
        console.log(6666);
        console.log("11111111111111",this.props.actions);
        this.props.actions.actionsPhasetwoPeopleInfoListDetail.setnoticeDetail(this.props.match.params.id)
    }
    render() {
        const {store, actions} = this.props;
        const { storePhasetwoPeopleInfoListDetail} = store;
        const { actionsPhasetwoPeopleInfoListDetail} = actions;
        //const { setnoticeDetail } = actionsListDetail;
        const { setnoticeDetail } = storePhasetwoPeopleInfoListDetail
        return <div url={"/Notice"} className="Components-PeopleInfoListDetail-container article_img">
            <div className={"title"}>
                {/* <span className={"more"}><img src={more} /></span> */}
                <span className={"text"}>{setnoticeDetail.title}</span>
            </div>
            <div>
                <img src={setnoticeDetail.bigBanner} />
            </div>
            <div className={"address"} onClick={() => window.location.href = setnoticeDetail.addressUrl}>
                <span className={"addressimg"}><img src={address} /></span>
                <span className={"text"}>{setnoticeDetail.projectAddress}</span>
            </div>
            <div className={"bg"}></div>
            <RichTextDisplay>
                {setnoticeDetail.content}
            </RichTextDisplay>
            {/* <img src="https://dss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_09b6296.png" /> */}
        </div>;
    }
}

