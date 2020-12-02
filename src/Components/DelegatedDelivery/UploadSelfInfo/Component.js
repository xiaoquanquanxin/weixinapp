/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
import SolidLine from '../../pub/SolidLine';
import NoMessages from '../../pub/NoMessages';

/*antd-mobile*/
import {
	Flex,
	Modal,
	InputItem,
	WhiteSpace,
	List,
	WingBlank,
} from 'antd-mobile';

const alert = Modal.alert;
import personId from './personId.png'
import cardid from './cardId.png'
import Mybutton from '../../pub/MyButton';

import ImgZoomHOC from '../../pub/ImgZoomHOC';

/*当前页面用到的*/

/*自定义类*/
import './Component.less';

@ImgZoomHOC('')
@inject('store', 'actions')
@observer

export default class DelegatedDeliveryUploadSelfInfo extends React.Component {

	componentDidMount () {
		window.setWindowTitle('委托信息');
		this.props.actions.actionsDelegatedDeliveryUploadSelfInfo.UploadSelfInfofun()
	}


	render () {
		const { store, actions } = this.props;
		const { storeDelegatedDeliveryUploadSelfInfo} = store;
		const { actionsDelegatedDeliveryUploadSelfInfo } = actions
		const { SignSavefun, colorStylefun, uploadimgone } = actionsDelegatedDeliveryUploadSelfInfo
		const { saveEntrustInfo, colorStyle, AddRepair, personIdimg, identityPhotoFront, authPhoto } = storeDelegatedDeliveryUploadSelfInfo
		//console.log(223344,uploadimgone())
		return <div className={'Components-EntrustedUploadSelfInfo-container'} >

			<WhiteSpace size="lg" />
			<WingBlank >
				<Flex>
					<Flex.Item className={"project-name"}> <i className={'flag'} /> {saveEntrustInfo&&saveEntrustInfo.roomName} </Flex.Item>
				</Flex>
			</WingBlank >


			<SolidLine />
			<List >
				<InputItem
					maxLength={40}
					placeholder="请输入联系人"
					onChange={(e) => {
						AddRepair.trustName=e
						colorStylefun()
					}
					}
				>被委托人</InputItem >

				<InputItem
					align={'right'}
					maxLength={30}
					placeholder="身份证"
					onChange={(e) => {
						AddRepair.trustIdentityNo = e
						colorStylefun()
					}
					}
				>身份证</InputItem >

				<InputItem
					align={'right'}
					maxLength={11}
					placeholder="请输入联系电话"
					onChange={(e) => {
						AddRepair.trustPhoneNo = e
						colorStylefun()
					}
					}
				>联系电话</InputItem >
			</List >

			<WingBlank >
			<List >
				<div className={'card-list'}>
						<div className={'card'} onClick={() => { uploadimgone("identityPhotoFront")}}>
							{/* {10+identityPhotoFront} */}
							
								<div>
									<img className={"cimg"} src={personId} />
									<span>上传身份证</span>
								</div>
									
								{
								identityPhotoFront == "" ? "":
									<div className={"cimgap"}>
										<div className={"cimgflex"}>
										<img className={"cimgb"} src={identityPhotoFront} />
										</div> 
									</div> 
								}
							
					</div>
						<div className={'card'} onClick={() => { uploadimgone("authPhoto") }}>
							{/* {11+authPhoto} */}
							
									<div>
										<img className={"cimg"} src={cardid} />
										<span>上传委托书</span>
									</div>
							{
								authPhoto == "" ?"":
									<div className={"cimgap"}>
										<div className={"cimgflex"}>
										<img className={"cimgb"} src={authPhoto} />
										</div>
									</div>

							}
					</div>
				</div>
			</List>
			</WingBlank>
			<WhiteSpace size="lg" /><WhiteSpace size="lg" />
			<WingBlank >
				<div onClick={() => { colorStyle?SignSavefun(this.props.history):"" }}>
					<Mybutton
						type={colorStyle ? 'blue' : 'grey'} label="扫描签到" />
				</div>
				
			</WingBlank >
			<WhiteSpace size="lg" />
		</div >;
	}

}