
/*自定义类*/
class StepsData {
	static test='';
	name='';
	constructor (a,b) {
		this.nodeName={
			stepDesr: [],
			tabData: []
		}
	}

	__setDatafun(data) {
		const href=window.location.href;
		let arrayIndex=0;
		if (href.includes('/HouseOwner')) {
			arrayIndex=1;
		} else if (href.includes('/Wuyehandle')) {
			arrayIndex=2;
		} else if (href.includes('/DechanHandle')) {
			arrayIndex=3;
		}
		//大结点
		const bigNodeTrees=data.nodeTree;
		// let bigNodeTrees=[{nodeName:"交付s预约",nodeId:2,},{nodeName:"物业s办理",nodeId:3,},{nodeName:"地产d办理",nodeId:1,}];  //mock data
		this.nodeName.stepDesr.length=0;
		bigNodeTrees && bigNodeTrees.length>0 && bigNodeTrees.forEach((item,index)=>{
			this.nodeName.stepDesr.push({ title: item.nodeName,key: item.nodeId })
		});

		//小结点
		const nodeTree=data.nodeTree && data.nodeTree.slice()[arrayIndex];
		//mock data
			/*let nodeTree={children:[
				{nodeName:"地产费用",nodeCode: 'realEstatePaymentNode'},
				{nodeName:"面积补差",nodeCode: 'areaCompensationNode'},
				{nodeName:"地产s办理",nodeCode: 'propertyRightNode'}
				]}*/
		this.nodeName.tabData.length=0;
		let children=nodeTree && nodeTree.children && nodeTree.children.slice() || [];
		children && children.forEach((item,index)=>{
			this.nodeName.tabData.push({nodeName: item.nodeName,nodeCode: item.nodeCode})
		});
		// console.log('nodeName',this.nodeName);
		return this.nodeName
	}
}

export default new StepsData;