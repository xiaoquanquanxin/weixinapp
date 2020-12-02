/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';

/*antd-mobile*/
import {Modal} from 'antd-mobile';

/*当前页面用到的*/
function closest(el, selector) {
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		}
		el = el.parentElement;
	}
	return null;
}
/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer

export default class Choicephone extends React.Component {
	onWrapTouchStart = (e) => {
		// fix touch to scroll background page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
			return;
		}
		const pNode = closest(e.target, '.am-modal-content');
		if (!pNode) {
			e.preventDefault();
		}
	}
	render () {
		const { store, actions, childrenphone } = this.props;
		const { storeCertificationModifySelfInfo} = store;
		const { actionsCertificationModifySelfInfo } = actions
		const { Modalfun, choicephonefun, Modaltrue } = actionsCertificationModifySelfInfo
		const { Modalval, custList, choicephoneindex } = storeCertificationModifySelfInfo
		//console.log(223344, childrenphone)
		return <div className={'Choicephone'} >
			<Modal
				visible={Modalval}
				className={"choicephone"}
				transparent
				maskClosable={false}
				wrapProps={{ onTouchStart: this.onWrapTouchStart }}
				title="请选择更换的手机号码"
				footer={[{ text: '关闭', onPress: () => { Modalfun(false); } },
					{ text: '确定', onPress: () => { Modaltrue(childrenphone.history) } }
			]}
			>
				<div style={{ height: custList.length > 3 ? 150 : custList.length*50, overflow: 'scroll' }}>
					<div className={"inputcheck"}>
					{
						custList && custList.map((v,i)=>{
							//console.log(choicephoneindex == i, choicephoneindex, i)
							return(
								<div className={"inputflex am-modal-button-group-h"} key={i} onClick={() => { choicephonefun(v,i)}}>
									<div className={"textphone"}>{v.phoneNo}</div>
									<div className={"borderinput"}>
									{
										choicephoneindex===i&&<div className="checkboxFive">
											<div className="label"></div>
										</div>
									}
									</div>
									
								</div>
							)
						})
					}
					
						
					</div>
				</div>
			</Modal>
		</div >;
	}

}