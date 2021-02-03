/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Flex, WhiteSpace, Tabs, PullToRefresh} from 'antd-mobile';
import './Component.less';
import phoneimg from "../img/phone.png";
import addimg from "../img/add.png";
/*当前页面用到的*/
/*自定义类*/
@inject('store', 'actions')
@observer
export default class RepairList extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.setWindowTitle('房屋报修-列表');
        const {store, actions} = this.props;
        const {actionsRepairList} = actions;
        const {storeRepairList} = store;
        actionsRepairList.getNumber(this.props);
    }

    //鼠标点击事件
    // handleClick = (index) => {
    // 	this.setState({
    // 		index
    // 	});
    // };
    //渲染列表
    // renderRepairList = (data) => {
    // 	const array = [];
    // 	if (data.length == 0) {
    // 		return null;
    // 	}
    // 	data.forEach((item, index) => {
    // 		array.push(<Card
    // 			{...item}
    // 			key={index}
    // 			props={this.props}
    // 		/>)
    // 	});
    // 	return (
    // 		<div >
    // 			{array}
    // 		</div >);
    // };
    // submit = () => {
    // 	const { store, actions } = this.props;
    // 	let address = constant.REPORTREPAIR;											 //默认报事报修列表
    // 	if (this.props.match.params.type * 1 === constant.COMPLAINSUGGESTIONS) {		 //投诉建议列表
    // 		address = constant.COMPLAINSUGGESTIONS
    // 	}
    // 	this.props.history.push(`${router.AddRepair[0]}/${address}`);
    // };
    //切换页签
    // changeTab(index){
    // 	console.log("changeTab",index)
    // 	const { store, actions } = this.props;
    // 	const { actionsRepairList } = actions;
    // 	actionsRepairList.getRepairList(index+1,false);
    // }
    render(){
        const {store, actions, history} = this.props;
        const {storeRepairList} = store;
        const {actionsRepairList} = actions;
        const {tabs, repairList, refreshing, subType} = storeRepairList;
        const {changeTab, onRefreshfun, detailfun} = actionsRepairList;
        let stu = [0, "s1", "s1", "s1", "s2", "s3", "s4", "s4"];
        let ste = [0, "待受理", "待受理", "待受理", "处理中", "待评价", "已评价", "已评价"];
        if (+subType === 2) {
            ste[5] = "已评价";
            stu[5] = "s4";
        }

        //状态，1~3 待受理 ，4 处理中 ，5 待评价 6~7已完成
        return <div className={'Components-Repair-List-container'}>
            <PullToRefresh
                damping={100}
                direction={'up'}
                refreshing={refreshing}
                onRefresh={() => {
                    onRefreshfun()
                }}
            >
                {tabs.length > 0 && <Tabs onChange={(tab, index) => {
                    changeTab(index)
                }}
                                          tabs={tabs}
                                          initialPage={0}
                                          animated={false}
                                          useOnPan={false}>

                </Tabs>}
                <div className={'Repair-list'}>
                    {
                        repairList.length > 0 && repairList.map((v, i) => {
                            return (
                                <div className={"listitem"} key={i} onClick={() => {
                                    history.push(`RepairDetails/${v.id}`)
                                }}>
                                    <div className={"pad"}>
                                        <div className={"orderTime"}>预约时间：{v.appoIntegermentTime}</div>
                                        <div className={"orderTime text"}>报修内容：{v.problemDescription}</div>
                                    </div>

                                    <div className={"time"}>{v.createTime}</div>
                                    <div className={`state ${stu[v.status]}`}>{ste[v.status]}</div>
                                </div>
                            )
                        })
                    }

                </div>
            </PullToRefresh>
            {/*按纽*/}
            <div className={'submit-btn'}>
                <div className={"btn"} onClick={() => {
                    history.push('/ComplaintSuggestions?phone=1')
                }}>
                    <img src={phoneimg}/>
                </div>
                <div className={"btn"} onClick={() => {
                    history.push('/AddRepair/1')
                }}>
                    <img src={addimg}/>
                </div>
                {/* <MyButton callback={this.submit.bind(this)} type={'blueButton'} label={'新 增'} /> */}
            </div>
        </div>;
    }
}
