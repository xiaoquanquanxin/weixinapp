/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import {Icon, InputItem, Checkbox, Flex, WhiteSpace, WingBlank, Toast, Modal, Button} from 'antd-mobile';
import Mybutton from '../../pub/MyButton/index';
import StatusTips from '../../pub/StatusTips/index';
import VerificationCode from '../../pub/VerificationCode/index';

const CheckboxItem = Checkbox.CheckboxItem;
import VerificationParameter from '../../pub/VerificationParameter';
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';
import {Link} from 'react-router-dom';
import TopBar from '../../CloudPayment/pub/TopBar-cloudPayment';
import logoIcon from './logo.png';
import bgIcon from './bg.png';

const alert = Modal.alert;

/*当前页面用到的*/

/*自定义类*/
import './Component.less';
import router from '../../../router';
import EmptyStoreData from '../../pub/EmptyStoreData';
import constant from '../../../constant';

@inject('store', 'actions')
@observer
export default class SubmitCertification extends React.Component {
    state = {
        colorStyle: false,
        fillNofinish: true
    };

    componentDidMount(){
        //  todo
        // console.log('140702199902227135');
        console.log('15712852037');
        window.setWindowTitle('登录');
        const {store, actions} = this.props;
        const {actionsSubmitCertification} = actions;
        actionsSubmitCertification.init();
    }

    componentWillUnmount(){
        const {store, actions} = this.props;
        const {actionsSubmitCertification} = actions;
        actionsSubmitCertification.init();
    }
    //检查按纽状态
    _checkForm = (data) => {
        const array = [];
        const bolean = data instanceof Object || data instanceof Array;
        if (bolean) {
            if (data instanceof Object) {					//对象转数组
                for (let ele of Object.values(data)) {
                    array.push(ele);
                }
            }
            const value = array.every((item, index) => {
                return item != '';							//注:自定义store时，必需为空('')
            });
            if (value) {
                this.setState({
                    colorStyle: true
                });
            } else {
                this.setState({
                    colorStyle: false
                });
            }
        } else {
            Toast.info(`只支持数组和对象`, 1);
        }

    };

    render(){
        const {store, actions, history} = this.props;
        const {storeSubmitCertification} = store;
        const {actionsSubmitCertification} = actions;
        const {submitCertification, authshow, colorStyle, phoneNo} = storeSubmitCertification;
        const {submit, inputfun} = actionsSubmitCertification;
        return (
            <div className={'Components-HouseAuthentication-container'}>
                <div className={"g-padding"}>
                    <TopBar
                        hostry={this.props.history}
                        title={'登录'}
                        right={null}
                        opacity={'0'}
                    />
                    <div className={'bg'}><img src={bgIcon} alt={''}/></div>
                    <div className={'login-padding'}>
                        <div className={'login-box'}>
                            <div className={'logo-icon'}>
                                <img src={logoIcon} alt=''/>
                            </div>
                            <div>

                                {/* <div className={"phonecss "}>
						<div className={"am-list-line right"}>请输入购房时登记的手机号</div>
					</div> */}
                                <WhiteSpace/>
                                <InputItem
                                    placeholder="请输入购房时登记的手机号"
                                    //value={submitCertification.tel}
                                    maxLength={11}
                                    onChange={(e) => {
                                        // VerificationMobileFormat.setCallerNumber(e) ? submitCertification.tel = e : submitCertification.tel = '';
                                        // this._checkForm(submitCertification);
                                        inputfun(e, "phoneNo")
                                    }
                                    }
                                ><i className={'font_family icon-shoujihaoma input-icon'}> </i></InputItem>

                                <WhiteSpace/>

                                <Flex className={'getCodeParentDode'}>
                                    <Flex.Item className={'fristNode'}>
                                        <InputItem
                                            placeholder="请输入验证码"
                                            maxLength={4}
                                            //value={submitCertification.VerificationCode}
                                            onChange={(e) => {
                                                // submitCertification.VerificationCode = e;
                                                // this._checkForm(submitCertification);
                                                inputfun(e, "validCode")
                                            }}
                                        ><i className={'font_family icon-yanzhengma input-icon'}> </i>
                                        </InputItem>
                                    </Flex.Item>
                                    <Flex.Item className={'lastNode'}>
                                        <VerificationCode
                                            tel={phoneNo}
                                            label={this.props}
                                        />
                                    </Flex.Item>
                                </Flex>

                            </div>
                            {/*<div>*/}
                            {/*    <Link className={"choicephone"} to={'/CertificationModifySelfInfo'}>手机号更改申请<Icon*/}
                            {/*        type={'right'}/></Link>*/}
                            {/*</div>*/}
                            <WhiteSpace size="lg"/>
                            <WhiteSpace/>
                            <div onClick={() => {
                                colorStyle ? submit(history) : undefined
                            }}>
                                <Button type="primary" className={'btn'}>立即登录</Button>
                            </div>
                            {/*<div className={'tips'}>温馨提示</div>
                        <div className={'tips-content'}>
                            您是否已实名认证，若没有实名认证将跳转法大大进行实名认证。
                        </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // componentWillUnmount () {
    // 	const { store } = this.props;
    // 	const { storeSubmitCertification } = store;
    // 	const { submitCertification } = storeSubmitCertification;
    // 	const SubmitCertificationStore = EmptyStoreData.getCurrentInstance();
    // 	const props = {
    // 		initValue: '',					 											//store里面初始值状态，如'',[],null ,undefined;
    // 		store: submitCertification,													//转输的数据包对象
    // 		name: this.props.store.storeSubmitCertification.submitCertification,		//要清空的store盒子
    // 	};
    // 	SubmitCertificationStore.__emptyAll(props);
    // }
}
