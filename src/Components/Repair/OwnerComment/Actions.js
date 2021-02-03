import {action} from 'mobx';
import {Modal, Toast} from 'antd-mobile';
import {newEvaluationItems, newViewReviews, submitScore} from "../repairCommonRequest";
//Toast.info('提交成功', 1.5);
// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
    }

    @action
    init = () => {
        const store = this.store;
        //  满意度问题列表
        store.satisfactionList = [];
        //  问题列表
        store.questionList = [];
        //  文本域问题列表
        store.textareaList = [];
        //  查看评价
        store.viewUpdate = false;
    };

    //	评价项 (新)
    @action
    newEvaluationItems = async (reportResponsibility) => {
        const result = await newEvaluationItems(reportResponsibility);
        // console.log('查询评价问题\n', result);
        this.setFieldsFn(result, true);
    };


    //  查看评价（新）
    @action
    newViewReviews = async (id, reportResponsibility) => {
        const result = await newViewReviews(id, reportResponsibility);
        // console.log('查看评价\n', result);
        this.setFieldsFn(result, false);
        this.store.viewUpdate = true;
    };


    @action
    setFieldsFn = (result, isQuestionItem) => {
        const {resultCode, data} = result;
        if (resultCode !== 0) {
            return;
        }
        //  分类问题
        const {questionList, satisfactionList, textareaList} = this.store;
        //  设置默认值
        data.forEach(item => {
            switch (+item.fieldType) {
                //  是非题
                case 1:
                    if (isQuestionItem) {
                        //  设置默认值
                        item.fieldValue = 1;
                        questionList.push(item);
                    } else {
                        questionList.index = questionList.index || 0;
                        Object.assign(questionList[questionList.index], item);
                        questionList.index++;
                    }
                    break;
                //  星级评价
                case 2:
                    if (isQuestionItem) {
                        //  设置默认值
                        item.fieldValue = 5;
                        satisfactionList.push(item);
                    } else {
                        satisfactionList.index = satisfactionList.index || 0;
                        Object.assign(satisfactionList[satisfactionList.index], item);
                        satisfactionList.index++;
                    }
                    break;
                //  描述型
                case 3:
                    if (isQuestionItem) {
                        textareaList.push(item);
                    } else {
                        textareaList.index = textareaList.index || 0;
                        Object.assign(textareaList[textareaList.index], item);
                        textareaList.index++;
                    }
                    break;
                default:
                    throw new Error(`错误的类型${item.fieldType}`);
            }
        });

        // this.store.questionList = JSON.parse(JSON.stringify(questionList));
        // this.store.satisfactionList = JSON.parse(JSON.stringify(satisfactionList));
        // this.store.textareaList = JSON.parse(JSON.stringify(textareaList));
    };

    //  满意度
    @action
    satisfactionFn = (value, item) => {
        item.fieldValue = value;
    };

    //  点击单选
    @action
    questionFn = (item, value) => {
        item.fieldValue = value;
    };
    //  文本域书写
    @action
    TextareaFn = (item, value) => {
        item.fieldValue = value;
    };

    //  提交
    @action
    submit = async (history, id) => {
        const {satisfactionList, questionList, textareaList} = this.store;
        const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
        const evaluateInfo = ([...satisfactionList, ...questionList]).map(item => {
            const {fieldName, fieldType, fieldValue, documentDescription} = item;
            return {
                fieldname: fieldName,
                fieldtype: fieldType,
                fieldvalue: fieldValue,
                documentDescription,
            }
        });
        const describe = (textareaList.map(item => item.fieldValue).join('\n'));
        const evaluateparamsData = {
            userId: +userInfo.id,
            //  客诉id
            id: +id,
            //  文本域-回访描述
            describe,
            //  评价信息
            //  fieldvalue：字段值;  fieldtype:字段类型；fieldname：字段名称
            evaluateInfo,
        };
        evaluateInfo.forEach(item => {
            delete item.documentDescription;
        });
        const evaluateparams = encodeURIComponent(JSON.stringify(evaluateparamsData));
        const data = {
            evaluateparams,
        };
        console.log(evaluateparams);
        console.log(data);
        // return
        //  权鑫测试评价14
        const result = await submitScore(data, evaluateparams);
        console.log(result);
        const {resultCode, resultMsg} = result;
        if (resultCode !== 0) {
            Toast.info(resultMsg, 1);
            return;
        }
        Toast.info('提交成功', 1, () => {
            history.push(`/RepairDetails/${id}`);
        });
    };
}

export default Actions;
