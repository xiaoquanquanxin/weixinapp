/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar, DatePicker, List, Modal, Toast } from 'antd-mobile';
import Mybutton from '../../pub/MyButton';
import star_gray from './stat_gray.png';
import star_yellow from './stat_yellow.png';

/*当前页面用到的*/

/*自定义类*/
import './Component.less';
import instance from '../../../../lib/utils/instance';

let labelList = [];
let type;//1,报修 2,投诉
export default class Template extends React.Component {
	static defaltprops = {
		commentList: ['服务态度恶劣', '维修在质量差', '现场脏乱差', '维修时间长', '工人不文明', '工程师不负责', '不守时不守约', '索要好评']
	};
	constructor(props) {
		super(props);
		this.state = {
			modal2: false,
			indexStar: 0,
			tabIndex: '',
			className: '',
			index: '',
			commentList: [[], []],
		};
		this.changeLabel.bind(this)
	}
	async submit(){
		let { id } = this.props;
		let url = "auth/savePostForWx";
		let cformData = {
			id: id,
			grade: this.state.indexStar,
			label: labelList.join(','),
		}
		let result = await window.POST({ url, cformData });
		this.props.onCloseEvent()
		location.reload();
	}
	/*回调父组件*/
	onClose(index,e){
		// let {id} = this.props;
		// if (typeof this.props.onCloseEvent=='function') {
		// 	// let url = "auth/savePostForWx";
		// 	// let formdata = {
		// 	// 	id: id,
		// 	// 	grade: this.state.index,
		// 	// 	label:labelList.join(','),
		// 	// }
		// 	// let result = await window.GET({ url, formdata });
		// 	this.props.onCloseEvent();
		// }
		e.stopPropagation()
		if(index == 2){
			this.props.onCloseEvent()
		}else{
			this.submit();
		}
	};
	changeLabel(newArr) {
		this.setState({
			indexStar: newArr
		});
	}
	//获取评分接口
	async getLabel(level) {
		let url = "auth/getPostForWx";
		let cformData = {
			type: type,
			level: level
		}
		let result = await window.GET({ url, cformData });
		if (!result.isSucess) return;
		let arr = this.state.commentList;
		arr[level - 1] = result.data.map((item, val) => {
			return item.labelName;
		});
		this.setState({
			commentList: arr
		});
	}
	//获取好评标签
	/*星级评分*/
	handClick = (index,e) => {
		e.stopPropagation()
		this.setState({
			indexStar: index
		});
		if (index <= 3) {
			if (this.state.commentList[0].length == 0) {
				this.getLabel(1)
			}
		} else {
			if (this.state.commentList[1].length == 0) {
				this.getLabel(2)
			}
		}
	};
	/*切换类名*/
	tabClass = (label, e) => {
		e.stopPropagation()
		if (window.JQ(e.target).hasClass('on')) {
			window.JQ(e.target).removeClass('on')
		} else {
			window.JQ(e.target).addClass('on')
		}
		if (labelList.length == 0) {
			labelList.push(label);
		} else {
			labelList.forEach((item, index) => {
				if (label == item) {
					labelList.splice(index, 1);
					return false;
				} else {
					labelList.push(label);
					return false;
				}
			})
		}
		//去重
		labelList = [...new Set(labelList)]
	};
	render() {
		type = this.props.type;
		return (<div>
			<Modal
				popup
				wrapClassName={'modal-component'}
				closable={true}
				visible={this.props.visible}
				onClose={(e) => { this.onClose(2,e) }}
				className={'modal2'}
				animationType="slide-up"
				afterClose={() => { console.log('afterClose'); }}
			>
				<List renderHeader={() => <div className={'tit'} >评价</div >} className="popup-list" >
					<div className={'popup-list-box'} >
						<Flex>
							{
								((() => {
									const array = [];
									for (let item = 0; item < 5; item++) {
										if (item >= this.state.indexStar) {
											array.push(<p key={item} className={'star-box'} onClick={this.handClick.bind(this,(parseInt((item + 1), 10)))} ><img src={`${star_gray}`} /></p >);
										} else {
											array.push(<p key={item} className={'star-box'} onClick={this.handClick.bind(this,(parseInt((item + 1), 10)))} ><img src={`${star_yellow}`} /></p >);
										}
									}
									return array;
								})())
							}
						</Flex>
					</div >
					<WingBlank >
						<Flex className={'comment-txt'}>
							您的评价会让工程师做的更好
						</Flex>
					</WingBlank >



					{
						(this.state.indexStar <= 3 && this.state.indexStar > 0) ? (<WingBlank >
							<Flex className={'comment-txt-list'}>
								{
									this.state.commentList[0].map((item, index) => (
										<span
											className={`${this.state.className} item  inline`}
											onClick={this.tabClass.bind(this, item)}
											key={index}
										>
											{item}
										</span>
									))
								}

							</Flex>
						</WingBlank >) : this.state.indexStar > 0 ? (<WingBlank >
							<Flex className={'comment-txt-list'}>
								{
									this.state.commentList[1].map((item, index) => (
										<span
											className={`${this.state.className} item inline`}
											onClick={this.tabClass.bind(this, item)}
											key={index}
										>
											{item}
										</span>
									))
								}

							</Flex>
						</WingBlank >) : null
					}


					<List.Item >
						<Mybutton callback={(e) => { this.state.indexStar > 0 ? this.onClose(1, e) : Toast.info('请选择评价内容！', 1)}} type="blue" label="匿名提交" />
					</List.Item >
					<Flex className={'comment-txt-status'}>
						{/* {
							this.state.indexStar <= 3 && this.state.indexStar > 0 ? <span>*1-3颗星评价</span> : this.state.indexStar > 0 && this.state.indexStar > 3 ? <span>*4-5颗星评价</span> : null
						} */}
					</Flex>
				</List >
			</Modal >
		</div >);
	}


}