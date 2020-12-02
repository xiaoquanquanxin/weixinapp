/*共用的*/
import React from 'react'
import PropTypes from 'prop-types';
class Sub1 extends React.Component {
    render() {
        console.log(this.props.tip+" render...")
        return <h4>{this.props.tip}</h4>
    }
    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.tip==this.props.tip) return false;
        return true
    }
}
Sub1.propTypes = {
    tip: PropTypes.string
};
/*
  PropTypes.array,
  PropTypes.bool,
  PropTypes.func,
  PropTypes.number,
  PropTypes.object,
  PropTypes.string,
  PropTypes.symbol,
*/
export default Sub1