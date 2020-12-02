/*共用的*/
import React from 'react'
import PropTypes from 'prop-types';
import Sub1 from './Sub1';
class SubP extends React.Component {
    render() {
        return <Sub1 tip={this.props.tip}/>
    }
}
SubP.propTypes = {
    tip: PropTypes.string
};
export default SubP