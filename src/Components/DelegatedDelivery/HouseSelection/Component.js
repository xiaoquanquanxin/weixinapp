/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import SolidLine from '../../pub/SolidLine';
import NoMessages from '../../pub/NoMessages';

/*antd-mobile*/
import {
	Flex,
	Modal,
	WhiteSpace,
	Icon,
	WingBlank,
} from 'antd-mobile';

const alert = Modal.alert;

import ImgZoomHOC from '../../pub/ImgZoomHOC';
import ProjectSelect from './ProjectSelect';


/*自定义类*/
import './Component.less';

@ImgZoomHOC('')
@inject('store', 'actions')
@observer

export default class DelegatedDeliveryHouseSelection extends React.Component {

	constructor () {
		super();
	}

	state = {
		autoHeight: 52,
		tabIcon: '+'
	};

	componentDidMount () {
		window.setWindowTitle('委托选房 ');
		this.props.actions.actionsDelegatedDeliveryHouseSelection.HouseSelectionfun()
	}


	extendAllTag = (target) => {
		const { buildArray } = this.props;
		if (buildArray.length > 5) {
			this.setState({
				tabIcon: this.state.tabIcon == '+' ? '-' : '+'
			});

			this.state.tabIcon == '+' ? this.setState({
				autoHeight: 'auto'
			}) : this.setState({
				autoHeight: 52
			});
		}

	};

	render () {
		const { store, actions } = this.props;
		const { storeDelegatedDeliveryHouseSelection } = store;
		const { actionsDelegatedDeliveryHouseSelection} = actions;
		const { tabfloorval, tabunitval, Foldval, ProjectSelecData, ProjectSelectval, getRoomByBatchData, unitInfo, floorInfo, batchName } = storeDelegatedDeliveryHouseSelection;
		const { tabfloorfun, tabunitfun, ProjectSelectfun, Fold, ProjectSelectOK, roomInfoOK } = actionsDelegatedDeliveryHouseSelection
		// console.log(12212,getRoomByBatchData)
		return <div className={'Components-DelegatedDeliveryHouseSelection-container'} >
			<ProjectSelect
				Foldval={Foldval}
				ProjectSelectval={ProjectSelectval}
				ProjectSelectfun={ProjectSelectfun.bind(this)}
				Fold={Fold.bind(this)}
				ProjectSelecData={ProjectSelecData}
				ProjectSelectOK={ProjectSelectOK.bind(this)} />
			<div className={"project"} onClick={() => { Fold(Foldval) }}><span>{batchName ? batchName :"请选择项目"}</span><Icon type={"right"} color={'#C7C7CC'} /></div>
			
			<SolidLine />
			{
				!!getRoomByBatchData.length && <div>
					<WingBlank >
						<div className={"tabbox"}>
							<div className={"taboover"}>
								<div className="tag" style={{ "width": 0.74 * getRoomByBatchData.length+"rem" }}>
									 
								{
									getRoomByBatchData && getRoomByBatchData.map((v, i) => {
										return <span className={`tagType ${i==tabfloorval ? 'on' : ''}`} 
											onClick={() => { tabfloorfun(i, v.unitInfo) }} key={i} >{v.bulidName}</span >;
									})
								}
								</div >
							</div >

							<div className="addtab">
								<div className={'extendAllTag'}  >{this.state.tabIcon}</div >
							</div >
						</div >
						<SolidLine />
						
						{
							!!unitInfo &&<div>
								
								<Flex className={'unitInfo'} >
								{
									unitInfo && unitInfo.map((v, i) => {
										return <span key={i} className={tabunitval == i ? 'on' : ''} 
											onClick={() => { tabunitfun(i, v.floorInfo) }} >{v.unitNama}</span >;
									})
								}
								</Flex >
								
							</div>
						}
						

						
						{
							!!floorInfo.length &&<div>
							<SolidLine />
							<div className={'floorInfo'} >
								{
									floorInfo && floorInfo.map((v, i) => {
										return <div className={'floor'} key={i}>
											<p className={'floor-name'}>{v.floorName}层</p>
											<div>{
												v.roomInfo && v.roomInfo.map((vv, ii) => {
													return <span
														key={ii}
														className={'room'}
														onClick={() => { roomInfoOK(vv,this.props.history)}}
													>{vv.roomNo}</span>
												})
											}</div>

										</div>;
									})
								}
							</div >
							</div>
						}
						

					</WingBlank >
					<WhiteSpace size="lg" />
					{!!floorInfo.length && <SolidLine />}
					<WhiteSpace size="lg" /><WhiteSpace size="lg" /><WhiteSpace size="lg" />
				</div>
			}
			{
				!getRoomByBatchData.length && (<WingBlank >
						<NoMessages label={'暂无消息'} />
					</WingBlank>)

			}




			{/*<WingBlank >
				<Mybutton callback={this.submit}
						  type={'blue'} label="委托交付" />
			</WingBlank >*/}


			<WhiteSpace size="lg" />
		</div >;
	}

}