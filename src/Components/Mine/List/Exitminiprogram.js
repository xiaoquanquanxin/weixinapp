/*共用的*/
import React from 'react';
import { List } from 'antd-mobile';

const Item = List.Item;
/*自定义类*/

export default class Exitminiprogram extends React.Component {
	render () {
		const { store, actions } = this.props;
		let flatform = '';
		let ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {    //判断是否是微信环境
			//微信环境
			wx.miniProgram.getEnv(function (res) {
				if (res.miniprogram) {
					flatform = true;
					console.info('小程序环境下逻辑');
				} else {
					console.info('非小程序环境下逻辑');
					flatform = false;
				}
			});
		} else {
			flatform = false;
			console.info('非微信环境逻辑');
		}

		// console.info('flatform________________', flatform);
		let stringArray = (<div className={'exit'} >
			<List className={'listcontent'} >
				<div className="enterMiniProgram" onClick={() => {
						// 需引入JSSDK-1.3.2
						wx.miniProgram.navigateBack({
							success: () => {
								//alert('success')
							},
							fail: (err) => {
								alert(JSON.stringify(err));
							}
						});

				}} >{'进入小程序'}</div >
			</List >
		</div >);

		return flatform ? stringArray : '';
	}
}