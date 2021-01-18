/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar, DatePicker, List } from 'antd-mobile';
import tempImg from '../../img/temp.png';
import tel from '../../img/temp.png';
import StatusFlag from '../../../pub/StatusFlag';


/*当前页面用到的*/

/*自定义类*/
import './Component.less';
import ImgZoomHOC from '../../../pub/ImgZoomHOC'
import constant from '../../../../constant';


@ImgZoomHOC('Components-Repair-Details-container')

@inject('store', 'actions')
@observer

export default class WorkDeatils extends React.Component {
	state = {
		arrowStatus: true
	};


	render () {
		const { store, actions } = this.props;
		const { storeTemplate } = store;
		//const { actionsTemplate} = actions;

		return <div className={'Components-Repair-Details-container'}  >
			<article className="repair-details" >
				<section className={'repair-item relative_div'} >
					<p >2019年4月15日 </p >
					<p className={"font12"} ><img src={tel} className={"imgStyle"} />400-8888-999 </p >
					<div className={"content"}>跟管家讲了，让维修工来修下雨水口，半天没人来维修，打电话给管家态度季度恶劣。</div >
					<div className={"m_top10"}><span onClick={()=>{this.props.onClick(tempImg);}}><img src={tempImg} style={{ width: 50, height: 50 }} /></span></div >
					<StatusFlag
						label={constant.WORK_STATUS[1]} //文本
						status={1}
						belongType={constant.STATUSSTYLE[1]}
					/>
				</section >
			</article >
		</div >
	}
}