/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
import header from './header.png';
import {WarpperHocComponent} from './WarpperHocComponent/Component';
import QusetionItem from "./QuestionsItem/Component"
import {IconStar} from './IconStar/Component';
import Mybutton from '../../pub/MyButton';


/*antd-mobile*/
import {Flex,Modal,WhiteSpace,WingBlank, TextareaItem } from 'antd-mobile';

const alert = Modal.alert;


/*自定义类*/
import './Component.less';
// import { start } from 'repl';

@inject('store', 'actions')
@observer

export default class Template extends React.Component {
	componentDidMount () {
		window.setWindowTitle('业主评价 ');
		let edit = this.props.match.params.edit == 1 ? true : false;
		this.props.actions.actionsOwnerComment.viewReviewsfun(this.props.match.params.id, edit)
	}

	// submit () {
	// 	alert(123);
	// }

	// onClick = (e) => {
	// 	console.log(e);
	// };

	// clickYes = () => {
	// 	this.setState({
	// 		value: true,
	// 		istrue: true,
	// 		isfalse: false,
	// 	})
	// }
	// clickNo = () => {
	// 	this.setState({
	// 		value: false,
	// 		istrue: false,
	// 		isfalse: true,
	// 	})
	// }
	// handleClick = (value) => {
	// 	console.log(22,value)
	// }
	render () {
		const { store, actions, history } = this.props;
		const { storeOwnerComment} = store;
		const { actionsOwnerComment} = actions;
		const { istrueval, viewReviewsdata, ival, startval, startdata, returnResult, Textareaval  } = storeOwnerComment
		const { startfun, istruefun, submit, TextareaItemfun } = actionsOwnerComment
		let isEdit = this.props.match.params.edit==1?true:false;
		console.log("isEdit", isEdit, returnResult)
		let starttext = ["非常不满意", "不满意","一般","满意","非常满意"]
		return <div className={'Components-Repair-OwnerComment-container'} >
			<div className={'comment'} >
				{
					startdata && startdata.map((v, i) => {
						return (
							<div key={i}>
								<p >你对处理结果是否感到满意</p >
								{
									startval && <IconStar startfun={(val) => startfun(val,v)} startval={startval} starisfalse={isEdit} />
								}
								<div className={"starttext"}>{starttext[startval - 1]}</div>
							</div>
				)
				})
			}
			</div >
			
			<div className={"questionitem"}>
				<WhiteSpace size="lg" />
				<WhiteSpace size="lg" />
				{
					viewReviewsdata && viewReviewsdata.map((v,i)=>{
						return(
							<div key={i}>
								<WingBlank >
									<div className={"title"}>{i+1}、{v.documentDescription}</div>
									<Flex>
										<Flex.Item><div onClick={() => { isEdit&& istruefun(1, i,v) }} className={`uncheckBox ${istrueval[i] == 1 ? "true" : ""}`}>是</div></Flex.Item>
										<Flex.Item><div onClick={() => { isEdit&&istruefun(0, i,v) }} className={`uncheckBox ${ istrueval[i] == 0 ? "true" : ""}`}>否</div></Flex.Item>
									</Flex>
								</WingBlank >
							</div>
						)
					})
				}
			</div>
			{!isEdit ? returnResult&&<TextareaItem
				defaultValue={returnResult}
				data-seed="logId"
				className="TextareaItem"
				autoHeight
				count={300}
				rows={6}
				editable={isEdit}
				onChange={(e) => {
					TextareaItemfun(e)
				}
				}
			/>
			:
				<TextareaItem
					placeholder={"请输入您的意见…"}
					data-seed="logId"
					className="TextareaItem"
					autoHeight
					count={300}
					rows={6}
					editable={isEdit}
					onChange={(e) => {
						TextareaItemfun(e)
					}
					}
				/>
		}
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
			<WingBlank >
				{
					isEdit && <Mybutton callback={() => { submit(this.props) }} type={'blue'} label="提 交" />
				}
			</WingBlank >

		</div >;
	}
}