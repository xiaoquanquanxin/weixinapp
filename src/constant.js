
export default {

	// 工单状态
	WORK_STATUS: {
		1: '待处理',   // yellow  #f5a623
		2: '待受理',   // red     #d0021b
		3: '已完成',   // green   #55c54d
		4: '待评价',   // blue   #35aaff
		5: '已关闭',   // gray   #979797
	},
	// 工单状态
	WORK_STATUS_NUMBER: {
		PENDINGDEAL: '1',   		//待处理
		PENDINGDODEAL: '2',        //待受理
		HAVEFININSH: '3',   		//已完成
		HAVECOMMNENT: '4',  		 //待评价
		HAVECLOSED: '5',   			 //已关闭
	},

    //活动状态
	ACTIONS_STATUS: {
		1: '未报名',   // gray  #979797
		2: '已报名',   // green   #55c54d
	},

	//审核状态
	AUDIT_STATUS: {
		1: '待审核',        // blue  #3890F9
		2: '层审核不通过',   //red   #DF3045
	},


    //状态类型 1：工单，2：活动，3：审核
    STATUSSTYLE:{
	    1: 'WORK',
        2: 'ACTIONS',
        3: 'AUDIT',
    },


	/*authStatus认证状态（1-已认证，0-未认证）*/
	AUTHSTATUS_PASS: 1,
	AUTHSTATUS_NO_PASS: 0,


	REPORTREPAIR: 1,				//报事报修
	COMPLAINSUGGESTIONS: 2,			//投诉建议


}
