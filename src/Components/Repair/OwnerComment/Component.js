/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
import header from './header.png';
import {WarpperHocComponent} from './WarpperHocComponent/Component';
import QusetionItem from "./QuestionsItem/Component"
import {IconStar} from './IconStar/Component';
import Mybutton from '../../pub/MyButton';
/*antd-mobile*/
import {Flex, Modal, WhiteSpace, WingBlank, TextareaItem} from 'antd-mobile';
/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer

export default class Template extends React.Component {
    componentDidMount(){
        console.clear();
        window.setWindowTitle('业主评价');
        const {id, edit} = this.props.match.params;
        const reportResponsibility = window.getQueryString('reportResponsibility');
        //  是要去评价
        const isSubmit = (+edit === 0);
        const {actionsOwnerComment} = this.props.actions;
        actionsOwnerComment.init();
        (async () => {
            await actionsOwnerComment.newEvaluationItems(reportResponsibility);
            if (!isSubmit) {
                await actionsOwnerComment.newViewReviews(id, reportResponsibility);
            }
        })();
    }

    render(){
        const {store, actions, history, match} = this.props;
        const {id, edit} = match.params;
        const {storeOwnerComment} = store;
        const {actionsOwnerComment} = actions;
        const {questionList, satisfactionList, textareaList, viewUpdate} = storeOwnerComment;
        const {satisfactionFn, questionFn, submit, TextareaFn} = actionsOwnerComment;
        const isSubmit = (+edit === 0);
        const starMap = ["非常不满意", "不满意", "一般", "满意", "非常满意"];
        if (!isSubmit && !viewUpdate) {
            return '';
        }
        return (
            <div className={'Components-Repair-OwnerComment-container'}>
                <div className={'comment'}>
                    {
                        satisfactionList && satisfactionList.map((v, i) => {
                            // console.log(v.fieldValue);
                            return (
                                <div key={i}>
                                    <p>{v.documentDescription}</p>
                                    <IconStar startfun={(val) => satisfactionFn(val, v)}
                                              starValue={v.fieldValue}
                                              starisfalse={isSubmit}/>
                                    <div className={"starttext"}>{starMap[v.fieldValue - 1]}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={"questionitem"}>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    {
                        questionList && questionList.map((v, i) => {
                            return (
                                <div key={i}>
                                    <WingBlank>
                                        <div className={"title"}>{i + 1}、{v.documentDescription}</div>
                                        <Flex>
                                            <Flex.Item>
                                                <div onClick={() => {
                                                    isSubmit && questionFn(v, 1);
                                                }}
                                                     className={`uncheckBox ${questionList[i].fieldValue === 1 ? "true" : ""}`}>是
                                                </div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <div onClick={() => {
                                                    isSubmit && questionFn(v, 0);
                                                }}
                                                     className={`uncheckBox ${questionList[i].fieldValue === 0 ? "true" : ""}`}>否
                                                </div>
                                            </Flex.Item>
                                        </Flex>
                                    </WingBlank>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    textareaList && textareaList.map((item, index) => {
                        return !isSubmit ? (<TextareaItem
                            key={index}
                            value={item.fieldValue}
                            data-seed="logId"
                            className="TextareaItem"
                            autoHeight
                            count={300}
                            rows={6}
                            editable={false}
                        />) : (
                            <TextareaItem
                                key={index}
                                placeholder={item.documentDescription}
                                data-seed="logId"
                                className="TextareaItem"
                                autoHeight
                                count={300}
                                rows={6}
                                editable={true}
                                onChange={(value) => {
                                    TextareaFn(item, value);
                                }}
                            />
                        )
                    })
                }
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WingBlank>
                    {
                        isSubmit && <Mybutton callback={() => {
                            submit(history, id)
                        }} type={'blue'} label="提 交"/>
                    }
                </WingBlank>
            </div>
        );
    }
}
