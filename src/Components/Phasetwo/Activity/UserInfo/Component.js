/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { List, InputItem, DatePicker, Picker, TextareaItem } from 'antd-mobile';
/*当前页面用到的*/
import MyButton from "../../../pub/MyButton"

// import grounp from "../img/grounp.png"
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class PhasetwoActivityUserInfo extends React.Component {
    componentDidMount() {
        const { store, actions, history } = this.props;
        const { storePhasetwoActivityUserInfo } = store;
        const { actionsPhasetwoActivityUserInfo } = actions
        const { authshow} = storePhasetwoActivityUserInfo;
        actionsPhasetwoActivityUserInfo.Noticefun(this.props.history)
       // console.log(888888,authshow)
        
    }
    render() {
        const { store, actions,history } = this.props;
        const { storePhasetwoActivityUserInfo } = store;
        const { actionsPhasetwoActivityUserInfo}=actions
        const { Birthdate, Sexdate, Agedate, renList, Interestselects, UserInfodata, authshow, citylist } = storePhasetwoActivityUserInfo;
        const { Pickerfun, Interestfun, inputfun, submit, pickerareafun } = actionsPhasetwoActivityUserInfo;
        window.setWindowTitle(authshow == 1 ? "活动详情" : "加载中")
        let winobj = window.getQueryString();
        let pickdata = []
        let sex = ["未知", "男", "女"]
        
        //console.log(111, winobj.auth, UserInfodata)

        return <div className={"Components-PhasetwoActivityUserInfo-container"}>
            {authshow == 1 && <div>
                
                
                {
                    winobj.auth != -1 && winobj.auth != -2 &&<div className={"supplement"}>请补充完报名信息</div>
                }
                {
                    UserInfodata && UserInfodata.map((v,i)=>{
                        //console.log(222222, v.paramArr)
                        return(
                            <div key={i}>
                                <div className={"h15line"}></div>
                                <List >
                                    {/* <InputItem
                                        placeholder="请输入"
                                        maxLength={22}
                                        defaultValue={v.name}
                                        onChange={(e) => { inputfun(e,i,"name")}
                                        }
                                    >姓名</InputItem >
                                    <InputItem
                                        placeholder="请输入"
                                        maxLength={11}
                                        defaultValue={v.phoneNo}
                                        onChange={(e) => { inputfun(e, i, "phoneNo")}
                                        }
                                    >手机电话</InputItem >
                                    <div className={v.sex != "" ? "isBirthboder" : "faBirth"}>
                                        <Picker
                                            extra={v.sex != "" ? sex[v.sex]: '请选择'}
                                            data={[{ label: '男', value: 1, }, { label: '女', value: 2, },]}
                                            cols={1}
                                            value={[v.sex]}
                                            onOk={e => {
                                                inputfun(e[0], i,'sex')
                                            }}
                                        >
                                            <List.Item arrow="horizontal" >性别</List.Item >
                                        </Picker >
                                    </div> */}

                                    {
                                        
                                        v.paramArr && v.paramArr.map((vv,ii)=>{
                                            //console.log(333333, vv, vv.extValues)//（1-单选，2-多选，3-文本，4-文本域）
                                            return(
                                                <div key={ii} className="UserInfodataclass">
                                                    {
                                                        vv.paramType==1&&
                                                        <div className={vv.extValues != "" ? "isBirthboder" : "faBirth"}>
                                                            <Picker
                                                                extra={vv.extValues != "" ? vv.extValues:'请选择'}
                                                                data={vv.paramOptions}
                                                                cols={1}
                                                                value={[vv.extValues]}
                                                                onOk={value => {
                                                                    Pickerfun(value[0], 'Agedate', i, ii)
                                                                }}
                                                            >
                                                                <List.Item arrow="horizontal" >{vv.extTitle}</List.Item >
                                                            </Picker >
                                                        </div>
            
                                                        //日期下拉选择
                                                        // <div className={vv.extValues != "" ? "isBirth" : "faBirth"}>
                                                        //     <DatePicker
                                                        //         mode="date"
                                                        //         extra="请选择"
                                                        //         minDate={new Date(1930, 1, 1, 23, 59, 59)}
                                                        //         value={vv.extValues}
                                                        //         onOk={value => {
                                                        //             console.log(99998776, value, value.format('YYYY-MM-dd'))
                                                        //             Pickerfun(value, 'date', i, ii)
                                                        //         }}
                                                        //     >
                                                        //         <List.Item arrow="horizontal">出生日期</List.Item>
                                                        //     </DatePicker>
                                                        // </div></div>
                                                        }{
                                                        vv.paramType == 3 &&
                                                        <InputItem
                                                            placeholder={vv.extValues !=""? vv.extValues:"请输入"}
                                                            maxLength={22}
                                                            //defaultValue={vv.extValues&&vv.extValues}
                                                            onChange={(e) => { inputfun(e, i, "name", ii) }
                                                            }
                                                        >{vv.extTitle}</InputItem >
                                                        }{
                                                        vv.paramType == 2 &&
                                                        <div className={"Interest"}>
                                                            <div className={"g-tit"}>{vv.extTitle}</div>
                                                            <div className={"g-text"}>
                                                                {
                                                                    vv.paramOptions.map((subItem, iv) => (
                                                                        <div key={iv} className={`${vv.Interestselects.includes(subItem.label) ? "li on" : 'li'}`}
                                                                            onClick={() => { Interestfun(subItem.label,i,ii) }}>{subItem.label}</div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                        }{
                                                        vv.paramType == 4 &&
                                                        <div className={"Interest"}>
                                                            <div className={"g-tit address"}>{vv.extTitle}</div>
                                                            <div className={"g-text"}>
                                                                <TextareaItem
                                                                    className={"width100"}
                                                                    //defaultValue={vv.extValues}
                                                                    onChange={(e) => { inputfun(e, i, "name", ii) }}
                                                                    placeholder={vv.extValues != "" ? vv.extValues : "请输入"}
                                                                    clear
                                                                />
                                                            </div>
                                                        </div>


                                                    }
                                                    {
                                                        vv.paramType == 5 &&
                                                        <div className={"Interest area"}>
                                                            <Picker
                                                                extra={vv.extValues != "" ? vv.extValues : '选择地区'}
                                                                data={citylist}
                                                                cols={3}
                                                                value={[vv.extValues]}
                                                                onOk={value => {
                                                                    console.log(value, "value")
                                                                    pickerareafun(value, 'Agedate', i, ii)
                                                                    // pickerfun(value[0], 'Agedate', i, ii)
                                                                }
                                                                }
                                                            >
                                                                <List.Item arrow="horizontal" >{vv.extTitle}</List.Item >
                                                            </Picker >

                                                        </div>
                                                    }
                                                    {
                                                        vv.paramType == 6 &&
                                                        <div className={"Interest areadeail"}>
                                                            <div className={"g-text"}>
                                                                <TextareaItem
                                                                    className={"width100"}
                                                                    onChange={(e) => { inputfun(e, i, "name", ii) }}
                                                                    placeholder={vv.extValues != "" ? vv.extValues : "请填写详细地址"}
                                                                    clear
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <div className={Agedate != "" ? "isBirthboder" : "faBirth"}>
                                        <Picker
                                            extra={'请选择'}
                                            data={[{ label: '年輕人', value: '年輕人', }, { label: '女', value: '女', },]}
                                            cols={1}
                                            value={Agedate}
                                            onOk={Agedate => {
                                                Pickerfun(Agedate, 'Agedate')
                                            }}
                                        >
                                            <List.Item arrow="horizontal" >年龄阶段</List.Item >
                                        </Picker >
                                    </div> */}
                                    {/* <div className={Birthdate != "" ? "isBirth" : "faBirth"}>
                                        <DatePicker
                                            mode="date"
                                            extra="请选择"
                                            minDate={new Date(1930, 1, 1, 23, 59, 59)}
                                            value={Birthdate}
                                            onOk={Birthdate => {
                                                Pickerfun(Birthdate, 'Birthdate')
                                            }}
                                        >
                                            <List.Item arrow="horizontal">出生日期</List.Item>
                                        </DatePicker>
                                    </div> */}
                                    {/* <div className={"Interest"}>
                                        <div className={"g-tit"}>兴趣爱好</div>
                                        <div className={"g-text"}>
                                            {
                                                renList.map((subItem, i) => (
                                                    <div key={i} className={`${Interestselects.includes(subItem.name) ? "li on" : 'li'}`}
                                                        onClick={() => { Interestfun(subItem.name) }}>{subItem.name}</div>
                                                ))
                                            }
                                        </div>
                                    </div> */}
                                </List>
                            </div>
                        )
                    })
                }
                
                
            
                <div className={"fixed"}>
                <div className={"center"} onClick={() => { submit(history) }}>
                    <MyButton type={"blue"} label={"确认信息"} />
                </div>
            </div>
             
            </div>
            }
        </div>;
    }
}