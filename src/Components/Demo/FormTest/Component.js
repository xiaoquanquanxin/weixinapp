/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { List,InputItem,Toast} from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer

    
class __C extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        hasError: false,
        value: '',
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    render() {
        const { store, actions } = this.props;
        const { storeFormTest } = store;
        const { actionsFormTest} = actions;
        const {phone,username}=storeFormTest
        const {setInputValue}=actionsFormTest
        return <div className={"Components-FormTest-container"}>
            <List renderHeader={() => 'Confirm when typing'}>
                <InputItem
                    placeholder="input your name"
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick}
                    onChange={setInputValue("username")}
                    value={username}
                >用户名</InputItem>
                <InputItem
                    type="phone"
                    placeholder="input your phone"
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick}
                    onChange={setInputValue("phone")}
                    value={phone}
                >手机号码</InputItem>
            </List>
            </div>;
    }
}
export default withSetTitle(__C, 'FormTest')