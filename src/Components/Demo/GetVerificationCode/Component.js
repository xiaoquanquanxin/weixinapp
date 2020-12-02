import React from 'react'
import { WhiteSpace, List, InputItem} from 'antd-mobile';

import VerificationCode from '../../pub/VerificationCode/index';

export default class GetVerificationCode extends React.Component {


    render() {
        return <div className={"Components-GetVerificationCode-container"}>
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />




			<div style={{width:200,margin:'0 auto'}}>
				<h3>模板-获取教验码</h3>
				<WhiteSpace size="lg" />
				{/* <InputItem type="phone" extra={<VerificationCode
					tel='13560707996'
					label={this.props}
				/>}/> */}
				<VerificationCode tel='13560707996' label={this.props}/>
			</div>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}