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
        console.log('140702199902227135');
        console.log('15712852037');
        const {store, actions} = this.props;
        const {actionsSubmitCertification} = actions;
        const {storeSubmitCertification} = store;
        const {authshow} = storeSubmitCertification;
        //认证成功跳转回首页
        actionsSubmitCertification.userInfo(this.props.history)

    }

    /*提交*/
    submit = () => {
        const {store, actions} = this.props;
        const {actionsSubmitCertification} = actions;
        const {storeSubmitCertification} = store;
        const {submitCertification} = storeSubmitCertification;
        const {personId, tel, VerificationCode} = submitCertification; 			 //用户输入的数据
        //输入较验电话号码格式
        const boolean = VerificationMobileFormat.checkMobile(submitCertification.tel);
        if (!boolean) {
            Toast.info('请输入正确的手机号!', 1);
            return false;
        }
        //window.identity()
        if (personId == "") {
            Toast.info('请输入正确的身份证!', 1)
            return false
        }
        // else{

        // }

        const domain = window.location.origin;
        const body = {
            phoneNo: tel,
            identityNo: personId,
            validCode: VerificationCode,
            returnUrl: domain + '/index.html?url=/MineList',
            // returnUrl: domain+'/mlistMiddle.html'

        };
        const o = actionsSubmitCertification.userAuth(body);
        o.then((txt) => {
            if (txt == 0) {
                let toUrl = window.getQueryString("url") || ''
                var url = "";
                if (toUrl) url = "?url=" + toUrl
                this.props.history.push(router.CertificationStatus + url);
            }/* else {
				alert('验证不成功', '对不起您的信息不存在，请让业主授权！', [
					{ text: '关闭', onPress: () => console.log('cancel') },
					{
						text: '联系客服', onPress: () => {
							window.location.href = 'tel:400432998';
						}
					},
				]);
			}*/
        });

    };
    onChange = (val) => {
        console.log(val);
    };
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
        const {submitCertification, authshow, colorStyle, identityNo, phoneNo} = storeSubmitCertification;
        const {submit, inputfun} = actionsSubmitCertification
        window.setWindowTitle(authshow == 1 ? '登录' : '加载中');
        return (<div className={'Components-HouseAuthentication-container'}>
            {authshow == 1 && <div className={"g-padding"}>
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
                            <InputItem
                                placeholder="请输入身份证"
                                maxLength={18}
                                //value={submitCertification.personId}
                                onChange={(e) => {
                                    // submitCertification.personId = e;
                                    // this._checkForm(submitCertification);
                                    inputfun(e, "identityNo")
                                }}
                            ><i className={'font_family icon-shenfenzhenghaoma input-icon'}> </i></InputItem>
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
                                        personId={identityNo}
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
            </div>}

        </div>);
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
