/*底部菜单*/
import React from 'react'
//import PropTypes from 'prop-types'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import LinkBar from '../../../../lib/Components/LinkBar.js'
const menuico_1 = require('./1.png');
const menuico_1_o = require('./1_o.png');
const menuico_2 = require('./2.png');
const menuico_2_o = require('./2_o.png');
const menuico_3 = require('./3.png');
const menuico_3_o = require('./3_o.png');
const menu = [
    { title: '首页', url: '/', icoBackground: menuico_1, icoBackground2:menuico_1_o},
    { title: '生活', url: '/Life', icoBackground: menuico_2, icoBackground2: menuico_2_o},
    { title: '我的', url: '/MineList', icoBackground: menuico_3, icoBackground2: menuico_3_o},
]
const linkBar_url="/Houses"
/*自定义类*/
import './Component.less'
export default class FooterNav extends React.Component {
    /*static propTypes = {
        xxxx: PropTypes.object//.isRequired
        xxxx: PropTypes.array//.isRequired,
        xxxx: PropTypes.bool//.isRequired,
        xxxx: PropTypes.func//.isRequired,
        xxxx: PropTypes.number//.isRequired,
        xxxx: PropTypes.object//.isRequired,
        xxxx: PropTypes.string//.isRequired,
        xxxx: PropTypes.symbol//.isRequired
    }*/
    /*state = {
        state1: ''
    }*/
    render() {
        return <div className={"Components-FooterNav-container"}>
            <LinkBar history={this.props.history} data={menu} url={this.props.currenturl}></LinkBar>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}