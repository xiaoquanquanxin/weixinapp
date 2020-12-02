/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Flex, WhiteSpace, Tabs, WingBlank,PullToRefresh} from 'antd-mobile';
import MyButton from '../../pub/MyButtonYu';
import CardOfYuzhou from "../../pub/Card-yuzhou";
import Router from "../../../router"
import './Component.less';
/*当前页面用到的*/
/*自定义类*/
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	componentDidMount() {
		window.setWindowTitle(this.props.match.params.type==1 ? '房屋报修-列表' :'投诉建议-列表');
		this.props.actions.actionsRepairListYu.getNumber(this.props.match.params.type);
	}
	add(){
		this.props.history.push(`${Router.AddRepairYu[0]}/${this.props.match.params.type}`);
	}
    phone(){
        window.location.href="#/ComplaintSuggestions"
    }
	render() {
		const { store, actions } = this.props;
		const { storeRepairListYu } = store;
		const { actionsRepairListYu } = actions;
		const { refreshing, data, tabs } = storeRepairListYu
		const { changeTab, onRefreshfun } = actionsRepairListYu;
		//console.log(11111111111, data)
		return <div className={'Components-Repair-List-container'} >
			<PullToRefresh
				damping={100}
				direction={'up'}
				refreshing={refreshing}
				onRefresh={() => {
					onRefreshfun()
				}}
			>
				{
					tabs.length!==0&&<Tabs 
					onChange={(tab, index) => { changeTab(index) }} 
					tabs={tabs} 
					initialPage={0} 
					animated={false} 
					useOnPan={false}>
					</Tabs>
				}

			
					<div className={"Repair-list"}>
					{data&&data.map((item,index)=>{
						return (
						<div key={index}>
								<CardOfYuzhou callback={this.refech} props={this.props} {...item} />
						</div>
						)
					})}
				</div>
			</PullToRefresh>
				<WhiteSpace size="lg" />
				{/*按纽*/}
				<div className="flexButton">
					<WingBlank>
						<Flex>
						<Flex.Item><MyButton hasimg={true} callback={this.phone.bind(this)} type={'white'} label={'联系客服'} /></Flex.Item>
						<Flex.Item><MyButton hasimg={true} callback={this.add.bind(this)} type={'blue'} label={'新 增'} /></Flex.Item>
						</Flex>
					</WingBlank>
				</div>
		</div >;
	}
}