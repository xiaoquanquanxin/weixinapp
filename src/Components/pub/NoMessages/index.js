import React from 'react'
/*antd-mobile*/
import { WhiteSpace,Flex } from 'antd-mobile';
import './Component.less'

class NoMessages extends React.Component {
	render() {
		return <div className="Component-noMessages-container">
			<Flex>
				{
					this.props.label ? this.props.label :'暂无消息'
				}
			</Flex>
		</div>
	}
}
export default NoMessages