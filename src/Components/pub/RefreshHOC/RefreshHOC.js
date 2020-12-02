import React from 'react';
/**
 * 没有任何动画效果的下拉刷新
 */
module.exports = (pageName) => (WrappedComponent) => {
    return class extends WrappedComponent {
        constructor(props) {
            super(props);
            this.state = {
                initPoint: -1,       // 开始Y轴的位置点
                endPoint: -1,        // 结束Y轴的位置点
                scrollTop: -1,       // 距离定点的位置距离
                isRefresh: false,    // 是否正在刷新
                currentPapge: this.props.match.path.includes('/RepairList')
            }
        }

        componentDidMount() {
            if (this._componentDidMount) {
                this._componentDidMount();
            }
        }

        render() {
			const preventDrag = ({
				height: '100%',
				overflow: 'hidden'
			});
			const preventDragNo = ({
				height: '',
				overflow: ''
            });
            return (
                <div className={'Refresh-component-container'}
                    onTouchStart={e => { this.touchStartEvent(e) }}
                    onTouchMove={this.touchMoveEvent.bind(this)}
                    onTouchEnd={this.touchEndEvent.bind(this)}
                    style={this.props.store.storeRepairListYu.status.open == true ? preventDrag : preventDragNo}
                >
                    <WrappedComponent {...this.props} scrollTop={this.scrollTop.bind(this)} />
                </div>
            )
        }

        /**
         * 获取列表距离顶部的距离
         * @param {Number} top 
         */
        scrollTop(e) {
            // e.target.scrollTop 获取距离定点的高度
            this.state.scrollTop = e.target.scrollTop;
        }
        /**
         * 触摸开始，记录触点Y轴坐标
         * @param {*} e 
         */
        touchStartEvent(e) {
            // e.touches[0].pageY 获取触点Y轴起始位置
			if (this.state.currentPapge) {
				this.state.initPoint = e.touches[0].pageY;
			}
        }
        /**
         * 触点变化，记录触点的Y轴坐标
         * @param {*} e 
         */
        touchMoveEvent(e) {
            // e.touches[0].pageY 获取位移中触摸点Y轴的位置
			if (this.state.currentPapge) {
				this.state.endPoint = e.touches[0].pageY;
			}
        }
        /**
         * 触摸事件结束，进行计算是否下拉刷新
         * 亦可同时做下拉刷新以及上拉刷新，分页等功能
         * @param {*} e 
         */
        touchEndEvent(e) {
            const { store, actions } = this.props;
            const { actionsRepairList } = actions;
            const { storeRepairList } = store;
        	if (!this.state.currentPapge) {return false}
            // 逻辑计算
            // Y轴结束位置 - 起始位置 = 位移距离(+下拉，-上拉)
            let move = this.state.endPoint - this.state.initPoint;
            let displacement = move - this.state.scrollTop;
            // 位移距离 - 距离顶点距离 > 0 下拉刷新 && 不能再在刷新
            if (displacement > 0 && move > 5 && !this.state.isRefresh) {
                // 刷新需要调用this._componentDidMount方法
                // 一般来说这个够了但是首页的下拉刷新的时候请求了多余的接口，例如获取项目的接口，不是显示全部是数据的时候请求了全部的数据接口
                // if (!pageName) {
                //     this._componentDidMount();
                // } else {
                //     let actionsName = 'actions' + pageName;
                //     let storeName = 'store' + pageName;
                //     // //不同页面调各自接口
                //     // switch (pageName) {
                //     //     case 'Work': {
				// 	// 		const parameter = `custcomplaitcenter,life-app:daily,life-app:baoshixiu,life-app:advice,life-app:simulation,life-app:construt,life-app:jiaofu,life-app:chuanpai,life-app:batchupdate`;
				// 	// 		this.props.actions.actionsWorksInfo.checkPermissions(parameter);
                //     //         break;
                //     //     }
				// 	// 	case 'Transact': {
				// 	// 		this.props.actions[actionsName].post(this.props.store[storeName].postUrl);
				// 	// 		break;
				// 	// 	}
                //     // }
                // }
                actionsRepairListYu.getRepairList(storeRepairListYu.listtype,true);
                this.state.isRefresh = true;
            }

            setTimeout(() => {
                this.state.isRefresh = !this.state.isRefresh;
                this.state.endPoint = -1;
                this.state.initPoint = -1;
				this.state.endPoint = -1;
                this.state.initPoint = -1;
            }, 500)
        }
		componentWillUnmount () {
        	this.state.currentPapge=false
		}
    }
};