/*
测试，不用修饰符是否可以用this.props拿到store
*/
import React from 'react'
class Sub2 extends React.Component {
    render() {
        console.log("Sub2 render...")
        const { store, actions } = this.props;
        const { storePerformanceTestMbox } = store;
        const {tip}=storePerformanceTestMbox
        return <h4>{tip}</h4>
    }
}
export default Sub2