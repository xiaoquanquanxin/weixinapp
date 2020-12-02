import React from 'react'
/*antd-mobile*/
import { WhiteSpace } from 'antd-mobile';
import './Component.less'

class SolidLine extends React.Component {

	render() {
		const { color } = this.props;
	  return <div className={'Component-SolidLine-container'} >
		  <div style={{ borderBottom: `solid 1px ${color ? this.props.color: '#ddd'}`}} />
	  </div>
	}
}
export default SolidLine