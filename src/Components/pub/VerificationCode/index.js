/*共用的*/
import React from 'react';
/*antd-mobile*/
import {Toast} from 'antd-mobile';
import './Component.less';

/*自定义类*/
class VerificationCode extends React.Component {
    time = '';
    isAjax = true;

    constructor(props){
        super(props);
        this.state = {
            telNumber: false,
            setIntervalVar: 60
        };
    }

    componentDidMount(){
        window.clearInterval(this.time);
    }

    checkValidator = (value) => {
        // 增加手机校验
        // 手机校验的正则表达式
        let str = /^1[3456789]\d{9}$/;
        let re = new RegExp(str);
        // 手机格式 123 4567 8910
        if (!(value.length < 11)) {
            // 长度大于13
            value = value.replace(/\s+/g, '');
            if (re.test(value)) {
                return true
            }
        } else {
            // 长度小于13，非手机号号码
            return false
        }
    };

    async getVerificationCode(phoneNumber){
        console.log("请求");
        let url = "user/getSmsAuthCode";
        let cformData = {
            phoneNo: phoneNumber,
        };
        const result = await window.POST({url, cformData});
        if (!result.isSucess) {
            return;
        }
        //  todo
        //测试环境弹出验证码
        // if (API_TYPE == "1") {//
        alert("调试信息:验证码:" + result.data)
        // }

    }

    handleVerificationCode = () => {
        const {tel} = this.props;
        !tel ? Toast.info('手机号码不能为空', 1) : this.checkValidator(tel) ? this.setState({
            telNumber: true
        }, () => {
            this.time = window.setInterval(() => {
                if (this.state.setIntervalVar <= 60 && this.state.setIntervalVar > 1) {
                    this.setState({
                        setIntervalVar: this.state.setIntervalVar -= 1
                    });
                    if (this.isAjax) {
                        this.getVerificationCode(tel);
                        this.isAjax = false;
                    }
                } else {
                    this.setState({
                        setIntervalVar: 60,
                        telNumber: false
                    });
                    this.isAjax = true;
                    window.clearInterval(this.time);
                }
            }, 1000);
        }) : Toast.info('请输入正确的手机号!', 1);
    };

    render(){
        let {label, t} = this.props;
        // console.log('label______:', label)
        return <div className="component-VerificationCode-container">
            {
                !this.state.telNumber && <div
                    className={'GetCode'}
                    onClick={this.handleVerificationCode}
                >获取验证码</div>
            }
            {
                this.state.telNumber && <div className={'GetCode time'}>{this.state.setIntervalVar}秒</div>
            }
        </div>;
    }
}

export default VerificationCode;



