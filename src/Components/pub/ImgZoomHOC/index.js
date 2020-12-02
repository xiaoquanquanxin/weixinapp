/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, WhiteSpace, Steps, WingBlank, Modal } from 'antd-mobile';
const Step = Steps.Step;
import './Component.less';


/*自定义类*/
const ImgZoomHOC = (arg) => (WarpperComponent) => {
	return class ImageZoom extends React.Component {
		initVar = {
			test: 'test'
		};

		constructor (arg) {
			super(arg);
			this.state = {
				modal1: false,
				imgSrc: ''
			};
		}

		componentDidMount(){
			let getHeight= () =>{
				let element=document.getElementById('element')
				if(window.getComputedStyle){
					return window.getComputedStyle(element,null);
				}else {
					return element.currentStyle;
				}
			}
		}





		handleClick = (src) => {
			this.setState({
				modal1: true,
				imgSrc: src
			},()=>{
				this.props.store ? this.props.store.storeRepairDetails.flag=true:'';
			});
		};

		handleClickModal = () => {
			this.setState({
				modal1: false,
				imgSrc: ''
			},()=>{
				this.props.store ?  this.props.store.storeRepairDetails.flag=false:'';
			});
		};

		render () {

			const objCss={
				height:'100vh',
				overflow: 'hidden',

			};
			const objCss2={
				height:'',
			};
			const handleProps = {
				onClick: this.handleClick,						//事件传递
				isScroll: this.state.modal1 ? objCss:objCss2,  //如果打开弹窗，不允许本页最高容器(如：Components-Repair-Details-container)滚动
			};
			return ( <div>
				<div className={'ImgZoomHOC'} style={{ display: this.state.modal1 ? 'block' : 'none' }} >
					{/*遮罩层*/}
					<div
						className={'ImgZoomHOCModal'}
						onClick={this.handleClickModal}
					>
					</div >

					{/*图片容器*/}
					<div
						className={'img-box'}
						onClick={this.handleClickModal}
						style={{
							display: this.state.modal1 ? 'block' : 'none',
							// backgroundImage: 'url(' + this.state.imgSrc + ')',
							backgroundPosition: '0px 10px',
							backgroundSize: 'cover',

						}}
					>
						{
							<img src={this.state.imgSrc }  />
						}
					</div >
				</div >
				{/*原组件*/}
				<WarpperComponent {...this.props} {...handleProps} />
			</div> );

		}
	};

};

export default ImgZoomHOC;