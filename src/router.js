
/*所有业务路由*/
/*
*	注：[0,1,2,3] 位置不能改变
*		  位置  		说明
*		0 位置:      直接路径,无任何通配符
*		1 位置:      /:type通配符
*		2 位置: 		/:type/:status通配符
*		3 位置		/:type/:status/:id通配符
*
* */
const APPRouter={

	AddRepair: [																//房屋报修
		'/AddRepair',
		'/AddRepair/:type'
	],
	RepairList: [																//房屋报修--列表
		'/RepairList',
		'/RepairList/:type'
	],													                        //房屋报修--详情
	RepairDetails: [															//房屋报修--详情
		'/RepairDetails',
		'/RepairDetails/:type',														//类型(1)
		'/RepairDetails/:type/:id',												//状态(2)														//类型(1)
		'/RepairDetails/:type/:status'													//状态(2)
	],
	MineList: '/MineList',													//我的--列表
	SubmitSucess: '/SubmitSucess',
    Developing: '/Developing',
    //报修，投诉提交成功
	OwnerComment:[																//房屋报修-- 评论
		'/OwnerComment',
		'/OwnerComment/:type',														//类型(1)
		'/OwnerComment/:type/:status'												//状态(2)
	],
	HouseAuthentication:'/HouseAuthentication',									//房产认证
	SubmitCertification: '/SubmitCertification',								//提交认证
	CertificationStatus: '/Certification/CertificationStatus',					//认证成功
	ChangeTelNumber: '/ChangeTelNumber',										//更换电话号码
	Autograph: '/Autograph',													//签名
	DelegatedDelivery: '/DelegatedDelivery',									//委托交付
	EntrustedHouseSelection: '/EntrustedHouseSelection',						//委托选房
	EntrustedUploadSelfInfo: '/EntrustedUploadSelfInfo',						//委托人上传自己信息
	ComplaintSuggestions: '/ComplaintSuggestions',								//投诉建议
	AddFamilyMembers: [															//添加家庭成员
		'/Certification/AddFamilyMembers',
		'/Certification/AddFamilyMembers/:id'
	],
	FamilyMembers: '/Certification/FamilyMembers',								//家庭成员列表


	AddRepairYu: [															// 禹洲-房屋报修
		'/AddRepairYu',
		'/AddRepairYu/:type',
	],
	RepairListYu: [															//禹洲-房屋报修--列表
		'/RepairListYu',
		'/RepairListYu/:type'
	],
	RepairDetailsYu: [														 //禹洲-房屋报修--详情
		'/RepairDetailsYu',
		'/RepairDetailsYu/:type',														//类型(1)
		'/RepairDetailsYu/:type/:id',
		'/RepairDetailsYu/:type/:id/:status'										//状态(2)
	],
	OwnerCommentYu:[														  //禹洲--房屋报修-- 评论
		'/OwnerCommentYu',
		'/OwnerCommentYu/:type',														//类型(1)
		'/OwnerCommentYu/:type/:status'													//状态(2)
	],
	SubmitSucessYu:[
		'/SubmitSucessYu',
		'/SubmitSucessYu/:type'
	],										//报修，投诉提交成功
	Modal:"/Modal",                                                          //带有MOBX的评论组件




	/*---------云支付子模块------------*/

	AgreementDetal: [																			//产权代办协议
		'/CloudPayment/AgreementDetal',
		'/CloudPayment/AgreementDetal/:type',
		'/CloudPayment/AgreementDetal/:type/:id',
		'/CloudPayment/AgreementDetal/:type/:status/:id',
	],

	DeliveryAppointment: [																					//物业办理
		'/CloudPayment/DeliveryAppointment',
		'/CloudPayment/DeliveryAppointment/:type',
		'/CloudPayment/DeliveryAppointment/:type/:id',
		'/CloudPayment/DeliveryAppointment/:type/:status/:id',
	],

	PhasetwoMyQuestionnaire: [
		'/PhasetwoMyQuestionnaire/:type/:id',
		'/PhasetwoMyQuestionnaire/:type/:id/:isDone',
	],


	Wuyehandle: [																						//物业办理
		'/CloudPayment/Wuyehandle',
		'/CloudPayment/Wuyehandle/:type',
		'/CloudPayment/Wuyehandle/:type/:id',
		'/CloudPayment/Wuyehandle/:type/:status/:id',
	],


	DechanHandle: [																						//地产办理
		'/CloudPayment/DechanHandle',
		'/CloudPayment/DechanHandle/:type',
		'/CloudPayment/DechanHandle/:type/:id',
		'/CloudPayment/DechanHandle/:type/:status/:id',
	],



};

export default APPRouter


