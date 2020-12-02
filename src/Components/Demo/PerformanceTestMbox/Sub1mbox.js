/*共用的*/
import React from 'react'
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
@inject('store', 'actions')
@observer
class Sub1mbox extends React.Component {
    render() {
        console.log("Sub1mbox.js render...")
        const { store } = this.props;
        const { storePerformanceTestMbox } = store;
        const {tip}=storePerformanceTestMbox
        return <h4>b-{this.props.tip}-{tip}</h4>
    }
}
Sub1mbox.propTypes = {
    tip: PropTypes.string
};
export default Sub1mbox