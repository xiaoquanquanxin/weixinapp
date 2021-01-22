/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
import RichTextDisplay from "../../pub/RichTextDisplay/Component"
import Layout from "../../pub/LayoutContainersOne";
import {TextareaItem} from 'antd-mobile';
/*自定义类*/
import './Component.less'
import {map} from 'mobx';
import SubmitCertification from '../../Certification/SubmitCertification/Component';
import ImagePickerWX from '../../../../lib/Components/ImagePickerWX'
import ImgZoomHOC from '../../pub/ImgZoomHOC';
// 公共组件
@ImgZoomHOC('')
@inject('store', 'actions')
@observer
export default class PhasetwoMyQuestionnaire extends React.Component {
    componentDidMount(){
        window.setWindowTitle("我的问卷");
        window.setLocalData("pageName", '我的问卷');//存儲token值
        const {params} = this.props.match;
        const {actions} = this.props;
        const {actionsPhasetwoMyQuestionnaire} = actions;
        actionsPhasetwoMyQuestionnaire.init();
        window.setLocalData("PhasetwoMyQuestionnaireType", params.type);//存儲token值
        window.setLocalData("PhasetwoMyQuestionnaireId", params.id);//存儲token值
        const isDone = this.getIsDone(params);
        //	存儲token值
        window.setLocalData("isDone", isDone);
        actionsPhasetwoMyQuestionnaire.questionDetailfun(params.type, params.id, this.props.history, isDone);
        //this.refs.IPWX.addImg("https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg", "100", "111")
    }

    getIsDone(params){
        let isDone;
        let booleanVa = params.isDone ? params.isDone.includes('&isDone') : null;
        if (booleanVa) {
            isDone = params.isDone.split('&isDone')[0];
        } else {
            isDone = params.isDone;
        }
        return isDone;
    }

    render(){
        const {store, actions, history} = this.props;
        const {params} = this.props.match;
        const {storePhasetwoMyQuestionnaire} = store;
        const {actionsPhasetwoMyQuestionnaire} = actions;
        const {radiofun, selectionfun, inputfun, Submitfun, change_ImagePickerWX, ImgItemdatafun} = actionsPhasetwoMyQuestionnaire;
        const {questionDetailDta, showbtn, is_uploadMediaIds} = storePhasetwoMyQuestionnaire;
        const isDone = this.getIsDone(params);

        // console.log(987,questionDetailDta)
        return (<div className="Component-PhasetwoMyQuestionnaire-container">
            <div className={"list"}>
                {
                    questionDetailDta && questionDetailDta.map((v, i) => {
                        return (
                            <div key={i}>
                                {v.questionType == 1 &&
                                <div className={"item"}>
                                    <div className={"tit"}>{i + 1}、{v.questionDesc}</div>
                                    <div className={"questionChoice"}>
                                        {
                                            v.optionList && v.optionList.map((vv, ii) => {
                                                return (
                                                    <div className={"lineproblem"} key={ii} onClick={() => {
                                                        isDone == 2 && radiofun(i, ii, vv.surveyOptionId)
                                                    }}>
                                                        <div className={vv.isSelected == 1 ? "radio-t" : "radio-f"}>
                                                            <div className={"blue"}></div>
                                                        </div>
                                                        <div className={"text"}>
                                                            {vv.optionValue}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                }
                                {v.questionType == 2 &&
                                <div className={"item"}>
                                    <div className={"tit"}>{i + 1}、{v.questionDesc}</div>
                                    <div className={"questionChoice"}>
                                        {
                                            v.optionList && v.optionList.map((vv, ii) => {
                                                return (
                                                    <div className={"line-square"} key={ii} onClick={() => {
                                                        isDone == 2 && selectionfun(i, ii, vv.surveyOptionId)
                                                    }}>
                                                        <div className={vv.isSelected == 1 ? "radio-t" : "radio-f"}>
                                                            <div className={"blue"}></div>
                                                        </div>
                                                        <div className={"text"}>
                                                            {vv.optionValue}
                                                        </div>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
                                </div>
                                }
                                {v.questionType == 3 &&
                                <div className={"item"}>
                                    <div className={"tit Textareatit"}>{i + 1}、{v.questionDesc}</div>
                                    <div className={v.optionList[0].optionValue == "" ? "Textarea_f" : "Textarea_t"}>

                                        <TextareaItem
                                            placeholder={"输入问题描述"}
                                            data-seed="logId"
                                            className="TextareaItem"
                                            autoHeight
                                            disabled={isDone == 2 ? false : true}
                                            count={350}
                                            rows={4}
                                            value={v.optionList[0].optionValue}
                                            editable={true}
                                            onChange={(e) => {
                                                inputfun(i, e)
                                            }}
                                        />
                                    </div>
                                </div>
                                }
                                {v.questionType == 4 && false &&
                                <div className={"item"}>
                                    <div className={"tit Textareatit"}>{i + 1}、{v.questionDesc}</div>
                                    {
                                        isDone == 2 ?
                                            <ImagePickerWX
                                                ref="IPWX"
                                                getDataImgID={(id, visitUrl, mediaId) => change_ImagePickerWX(id, visitUrl, mediaId, i)}
                                                apiupload={"user/common/uploadFileByMediaId"}
                                                apidel={""}
                                                ImgItemClosefun={(ImgItemdata) => {
                                                    ImgItemdatafun(ImgItemdata, i)
                                                }}
                                                // is_upload={!v.optionList.option_value && v.optionList.option_value.split(",").length < 6 ? false : true}
                                            /> :
                                            <div className={"imgarr"}>
                                                {
                                                    !!v.optionList[0].optionValue && v.optionList[0].optionValue.split(",").map((vv, ii) => {
                                                        return (
                                                            <div className={"imgwidth"} key={ii} onClick={() => {
                                                                this.props.onClick(vv)
                                                            }}>
                                                                <img src={vv}/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                    }
                                </div>
                                }
                                {/* <div onClick={() => { change_ImagePickerWX(i, i, i, i) }}>ccddd</div> */}
                            </div>
                        )
                    })
                }


            </div>
            {isDone == 2 && questionDetailDta.length > 0 && <div className={"center"} onClick={() => {
                Submitfun(history)
            }}>
                <div className={"btn"}>提交</div>
            </div>}
        </div>);
    }
}

