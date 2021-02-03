/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
import SolidLine from '../../pub/SolidLine';

/*antd-mobile*/
import {
    InputItem,
    WhiteSpace,
    List,
    WingBlank,
} from 'antd-mobile';

import personId from './img/personId.png'
import cardid from './img/cardId.png'
import Mybutton from '../../pub/MyButton';

import ImgZoomHOC from '../../pub/ImgZoomHOC';

/*当前页面用到的*/

/*自定义类*/
import './Component.less';
import Choicephone from './Choicephone';


@ImgZoomHOC('')
@inject('store', 'actions')
@observer

export default class CertificationModifySelfInfo extends React.Component {

    componentDidMount(){
        window.setWindowTitle('修改号码');
        this.props.actions.actionsCertificationModifySelfInfo.UploadSelfInfofun()
    }


    render(){
        const {store, actions} = this.props;
        const {storeCertificationModifySelfInfo} = store;
        const {actionsCertificationModifySelfInfo} = actions
        const {SignSavefun, colorStylefun, uploadimgone, getverificationfun, inputfun} = actionsCertificationModifySelfInfo
        const {colorStyle, identityImg, faceImg, authPhoto, getverificationval, timesecond, heightval} = storeCertificationModifySelfInfo
        //console.log(223344,uploadimgone())
        return <div className={'Components-EntrustedUploadSelfInfo-container'} style={{height: heightval}}>

            {/* <WhiteSpace size="lg" />
			<WingBlank >
				<Flex>
					<Flex.Item className={"project-name"}> <i className={'flag'} /> {saveEntrustInfo&&saveEntrustInfo.roomName} </Flex.Item>
				</Flex>
			</WingBlank > */}


            <SolidLine/>
            <List>
                <InputItem
                    maxLength={40}
                    placeholder="请输入联系人"
                    onChange={(e) => {
                        // AddRepair.trustName=e
                        // colorStylefun()
                        inputfun(e, "Nameval")
                    }
                    }
                >姓名</InputItem>
                <InputItem
                    align={'right'}
                    maxLength={11}
                    placeholder="请输入联系电话"
                    onChange={(e) => {
                        // AddRepair.trustPhoneNo = e
                        // colorStylefun()
                        inputfun(e, "phoneval")
                    }
                    }
                >新手机号</InputItem>

                <div className={"verification"}>
                    <InputItem
                        placeholder="请输入验证码"
                        maxLength={4}
                        onChange={(e) => {
                            inputfun(e, "verificationval")
                        }}
                    >验证码</InputItem>
                    <div className={"getverification"}
                         onClick={() => {
                             getverificationval ? getverificationfun() : ""
                         }}
                    >{getverificationval ? "获取" : timesecond + "秒"}</div>
                </div>
            </List>

            <WingBlank>
                <div className={"borderline"}>
                    <List>
                        <div className={'card-list'}>
                            <div className={'card'} onClick={() => {
                                uploadimgone("identityImg")
                            }}>
                                {/* {10+identityPhotoFront} */}

                                <div>
                                    <img className={"cimg"} src={personId}/>
                                    <span>上传身份证正面照</span>
                                </div>

                                {
                                    identityImg == "" ? "" :
                                        <div className={"cimgap"}>
                                            <div className={"cimgflex"}>
                                                <img className={"cimgb"} src={identityImg}/>
                                            </div>
                                        </div>
                                }

                            </div>
                            <div className={'card'} onClick={() => {
                                uploadimgone("faceImg")
                            }}>
                                {/* {11+authPhoto} */}

                                <div>
                                    <img className={"cimg"} src={cardid}/>
                                    <span>上传本人正面照</span>
                                </div>
                                {
                                    faceImg == "" ? "" :
                                        <div className={"cimgap"}>
                                            <div className={"cimgflex"}>
                                                <img className={"cimgb"} src={faceImg}/>
                                            </div>
                                        </div>

                                }
                            </div>
                        </div>
                    </List>
                </div>
            </WingBlank>
            <WhiteSpace size="lg"/><WhiteSpace size="lg"/>
            <WingBlank>
                <div onClick={() => {
                    colorStyle ? SignSavefun(this.props.history) : ""
                }}>
                    <Mybutton
                        type={colorStyle ? 'blue' : 'grey'} label="提交"/>
                </div>

            </WingBlank>
            {/* <WhiteSpace size="lg" /> */}
            <Choicephone childrenphone={this.props}/>
        </div>;
    }

}
