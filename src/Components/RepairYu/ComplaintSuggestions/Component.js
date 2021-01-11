/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {
    Flex,
    WhiteSpace,
    Toast,
    WingBlank,
} from 'antd-mobile';
import Mybutton from '../../pub/MyButton';
import header from './header.png';
/*当前页面用到的*/
/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer
export default class ComplaintSuggestions extends React.Component {
    componentDidMount(){
        window.setWindowTitle('投诉建议 ');
        const {actions} = this.props;
        const {actionsComplaintSuggestions} = actions;
        actionsComplaintSuggestions.areaPhoneList();
    }

    clickPhone = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    render(){
        const {store} = this.props;
        const {storeComplaintSuggestions} = store;
        const {phoneList} = storeComplaintSuggestions;
        return <div className={'Components-ComplaintSuggestions-container'}>
            <WingBlank>
                <div className={'sugggestion'}>
                    <div>
                        <p className={'headerImg'}><img src={header} style={{width: '35%'}} alt=''/></p>
                        <WhiteSpace size="lg"/><WhiteSpace size="lg"/>
                        <p className={'tit'}>尊敬的业主，您好</p>
                        <WhiteSpace size="lg"/><WhiteSpace size="lg"/>
                        <p className={'destion'}>若您有任何建议和问题，欢迎您致电客服中心，我们将全天候7*24小时为您服务。</p>
                        <WhiteSpace size="lg"/>
                        <p className={'destion'}>您可以拨打</p>
                    </div>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    {
                        phoneList.map((item, index) => {
                            return (
                                <div className={'call-tel'} key={index}>
                                    <p>
                                        {item.areaTitle}
                                    </p>
                                    <WhiteSpace size="lg"/>
                                    <Flex>
                                        <Mybutton id="tel1" callback={() => this.clickPhone(item.areaPhone)}
                                                  type={'white'}
                                                  label={item.areaPhone}/>
                                    </Flex>
                                </div>
                            )
                        })
                    }
                    <WhiteSpace size="lg"/>
                </div>
            </WingBlank>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
        </div>;
    }
}
