import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import tempImg from './temp.png';
import ImgZoomHOC from '../../pub/ImgZoomHOC'

@ImgZoomHOC('')
export default class GetVerificationCode extends React.Component {

	render () {
		return <div className={'Components-GetVerificationCode-container'} >
				<WhiteSpace />
				<WhiteSpace />

				{/*
				1:转图片SRC即可
				2:如果要禁止页面拖动可在store里面加flag 如： this.props.store.storeRepairDetails.flag=true
				*/}
				<span onClick={() => {this.props.onClick(tempImg);}}>
					<img src={tempImg} style={{ width: 50, height: 50}}
				/>
				</span >

			</div >
	}

	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013
}