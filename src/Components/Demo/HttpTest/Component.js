import './Component.less'
import React from 'react'
import PropTypes from 'prop-types'
import withSetTitle from 'LibComponents/withSetTitle'
import { Button,WhiteSpace,WingBlank,List,InputItem} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import {inject, observer} from "mobx-react/index";
@inject('store', 'actions')
@observer
class __C extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const { store, actions } = this.props;
        const { storeHttpTest} =store;
        const { actionsHttpTest} =actions;
        const {sitelist,postTip,authUrl,authValue}=storeHttpTest;
        const {setInputValue}=actionsHttpTest;


        return <div className={"Components-HttpTest-container"}>
            <WingBlank>
                <WhiteSpace />
                {
                    sitelist&&
                    <List renderHeader={() => '网址'}>
                        {
                            sitelist.map((item,index)=> {
                                return <Item key={index} arrow="horizontal" multipleLine onClick={() => {}}>
                                    {item.label} <Brief>{item.url}</Brief>
                                </Item>
                            })
                        }
                    </List>
                }
                <WhiteSpace />
                <Button onClick={actionsHttpTest.get}>get获取网址</Button>
                <WhiteSpace />
                <Button onClick={actionsHttpTest.clrGet}>清空网址</Button>
                <WhiteSpace />
                <Button onClick={actionsHttpTest.post}>post</Button>
                <WhiteSpace />
                <Button onClick={actionsHttpTest.globalGet}>globalGet获取网址</Button>
                <WhiteSpace />
                <Button onClick={actionsHttpTest.globalPost}>globalPost</Button>
                <WhiteSpace />
                <Button onClick={actionsHttpTest.globalPostCurrent}>globalPostCurrent</Button>
                <WhiteSpace />
                <p className="sub-title">{postTip}</p>
                <WhiteSpace />
                <InputItem onChange={setInputValue("authValue")}
                                   value={authValue}>auth:</InputItem>
                <WhiteSpace />
                <Button onClick={actionsHttpTest.globalSaveAuth}>保存auth</Button>
                <WhiteSpace />
                <InputItem onChange={setInputValue("authUrl")}
                           value={authUrl}>url:</InputItem>
                <WhiteSpace />
                <Button onClick={actionsHttpTest.globalGetAuth}>get提交</Button>
                <WhiteSpace />
                <Button onClick={actionsHttpTest.globalPostAuth}>post提交</Button>
                <WhiteSpace />
            </WingBlank>
        </div>
    }
}
__C.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}
export default withSetTitle(__C, 'HttpTest测试页面')