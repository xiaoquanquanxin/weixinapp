/*
测试，不用修饰符是否可以用this.props拿到store
*/
import React from 'react'
import { observer, inject } from 'mobx-react';
@inject('store', 'actions')
@observer
class Sub3 extends React.Component {
    render() {
        console.log("Sub3 render...")
        const { store, actions } = this.props;
        const { storePerformanceTestMbox } = store;
        const {tip}=storePerformanceTestMbox
        return <h4>拿到的tip属性：{tip}</h4>
    }
}
export default Sub3