/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {List, Button, WhiteSpace, Carousel, Modal} from 'antd-mobile';
/*当前页面用到的*/
const carousel1 = require('./carousel1.jpg');
const carousel2 = require('./carousel2.jpg');
const carousel3 = require('./carousel3.jpg');
const active1 = require('./active1.jpg');
const active2 = require('./active2.jpg');
const active3 = require('./active3.jpg');
const culture1 = require('./culture1.jpg');
const culture2 = require('./culture2.jpg');
const culture3 = require('./culture3.jpg');
//新房推荐
const img_r1= require('./r1.jpg')//推荐1
const img_r2 = require('./r2.jpg')//推荐2
const dataRecommend=[
    {title:"下半年买房需求高涨，沪上置业最佳选择还看这里",img:img_r1, url:"https://mp.weixin.qq.com/s/CGl9M3PvKN7CdwG9U4rOsg"},
    {title:"即将入市丨深度解读自贸区新片区潜力版块置业热潮",img:img_r2, url:"https://mp.weixin.qq.com/s/SW_bLXiw1mMXL-HwVORdpQ"},
    {title:"下半年买房需求高涨，沪上置业最佳选择还看这里",img:img_r1, url:"https://mp.weixin.qq.com/s/CGl9M3PvKN7CdwG9U4rOsg"},
]
//4个图标
const ico_fwbx = require('./fwbx.png')//房屋保修
const ico_tsjy = require('./tsjy.png')//投诉建议
const ico_yzjs = require('./yzjs.png')//项目家书
const ico_gcjz = require('./gcjz.png')//工程进展
const ico_jfyy = require('./jfyy.png')//交付预约
const ico_yzzx = require('./yzzx.png')//业主尊享
const ico_sqwh = require('./sqwh.png')//社区文化
const ico_grzx = require('./grzx.png')//个人中心
 // 项目家书 - 65
// 工程进展 - 66
// 社区文化 - 67
if (JSON.parse(window.getLocalData('auth'))){
    var winauth = JSON.parse(window.getLocalData('auth'))
}

const navicodata = [
    {img: ico_fwbx, title: "房屋报修",url:"#/AddRepairYu/1"},
    {img: ico_tsjy, title: "投诉建议",url:"#/AddRepairYu/2"},
    { img: ico_yzjs, title: "项目家书", url: "#/PhasetwoHomeLetterList?subjectId=65&sessionkey=" + winauth},
    { img: ico_gcjz, title: "工程进展", url: "#/PhasetwoHomeLetterList?subjectId=66&sessionkey=" + winauth},
    {img: ico_jfyy, title: "交付预约",url:"#/Developing"},
    {img: ico_yzzx, title: "业主尊享",url:"https://mp.weixin.qq.com/mp/homepage?__biz=MzU4Mzg0Mzc5OA==&hid=5&sn=db143974fe39f60028abc94ce5b8ee8c"},
    { img: ico_sqwh, title: "社区文化", url: "#/PhasetwoHomeLetterList?subjectId=67&sessionkey=" + winauth},
    {img: ico_grzx, title: "个人中心",url:"#/MineList"},
]

const newstipImg=require('./newtip.png')
const rightbtn=require('./rightbtn.png')

const downtip=require("./down.png")
/*自定义类*/
import './Component.less'
import FooterNav from './FooterNav'
// import FooterNav from '../pub/FooterNav'
@inject('store', 'actions')
@observer
export default class Home extends React.Component {
    navicoClick(index,item) {
        window.location.href = item.url;
        /*switch (index) {
            case 0:
                window.location.href = "#/AddRepairYu/1" //房屋保修
                break;
            case 1:
                window.location.href = "#/AddRepairYu/2" //投诉建议
                break;
            case 7:
                //临时使用:个人中心
                window.location.href = "#/MineList"
                return;
                break;
            default:
                //社区公告
                //临时使用:身份认证

                // 跳转到建设中页面
                this.props.history.push('/Developing');
                // this.houseAuthenticationClick()
                return;
                break;
        }*/
    }
    // toUrl = (url) => {
    //     if (!url||url==""||url=="#") return;
    //     window.location.href = url;
    // }
    dataRecommendClick=(item)=>{
        let url=item.url
        if (!url||url==""||url=="#") return;
        window.location.href = url;
    }
    selectCompany(){
        const {  actions } = this.props;
        const { actionsHome} = actions;
        actionsHome.selectCompany(true)
    }
    selectCompanyHide(id=-1,title=""){
        const {  actions } = this.props;
        const { actionsHome} = actions;
        actionsHome.selectCompany(false,id,title)
    }
    render() {
        const { store, actions } = this.props;
        const { storeHome } = store;
        const {selectCompanyShow,companyList,defaultCompanyTitle}=storeHome;
        let slideData = [carousel1, carousel2, carousel3];

        const data = [
            {
                title: '业主尊享',
                url:"https://mp.weixin.qq.com/mp/homepage?__biz=MzU4Mzg0Mzc5OA==&hid=5&sn=db143974fe39f60028abc94ce5b8ee8c",
                content: [
                    {
                        title: '暖暖中秋 | 禹洲业主中秋福利时间',
                        img: active1,
                        url: 'https://mp.weixin.qq.com/s/dGHDyaIMs59UGAhmgqaxLg'
                    },
                    {
                        title: '天涯共此时 | 南京禹洲业主2019年中秋主题活动',
                        img: active2,
                        url: 'https://mp.weixin.qq.com/s/0oNMY5Dc5C6GKbiiCFuHCw'
                    },
                    {
                        title: '禹爱童行 | 禹洲映月溪山，欢乐开跑！',
                        img: active3,
                        url: 'https://mp.weixin.qq.com/s/3gkjUU7WZm8d9gZB9kJmug'
                    }
                ]
            },
            {
                title: '社区文化',
                url:"https://mp.weixin.qq.com/mp/homepage?__biz=MzU4Mzg0Mzc5OA==&hid=6&sn=55194c1050b2221865bcef523c740428",
                content: [
                    {
                        title: '禹洲吉庆里 | WE RUN THE NIGHT 荧光禹洲，炫彩社区',
                        img: culture1,
                        url: 'https://mp.weixin.qq.com/s/9Qhs9eolIXGiAnV9FP0HVg'
                    },
                    {
                        title: '禹洲·滨湖里 | 时光淬炼，心归美好',
                        img: culture2,
                        url: 'https://mp.weixin.qq.com/s/H_FAxBIdSYsLjtHzBeeY2Q'
                    },
                    {
                        title: '缤纷6.1 | 美好的祝福，赠予您',
                        img: culture3,
                        url: 'https://mp.weixin.qq.com/s/metToWF_5WVtz4X42cHBKw'
                    }
                ]
            }
        ]

        return <div className={"Components-Home-container"}>
            <div>

                <Carousel
                    autoplay={true}
                    autoplayInterval={5000}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {slideData.map((val, index) => (
                        <a
                            key={index}
                            href="http://www.alipay.com"
                            style={{display: 'inline-block', width: '100%', height: "176"}}
                        >
                            <img
                                src={val}
                                alt=""
                                style={{width: '100%', verticalAlign: 'top'}}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    // this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <div className="selectCompany" style={{width:(0.2+defaultCompanyTitle.length*.15)+"rem"}} onClick={()=>{this.selectCompany()}}>
                    <div className="bak"> </div>
                    <span className="tip">{defaultCompanyTitle}</span>
                    <div className="downtip">
                        <img src={downtip} alt=""/>
                    </div>

                </div>
            </div>
            <div className="navico">
                {navicodata.map((item, index) => {
                    return <div key={index} onClick={() => this.navicoClick(index,item)} className="iconav"><img
                        src={item.img} alt=""/>
                        <div className={"tip"}>{item.title}</div>
                    </div>
                })}
            </div>
            <div className={"footerpage"}>
                <div className="newstip">
                    <div className="left">
                        <img src={newstipImg} alt=""/>
                    </div>
                        <Carousel
                            className="center"
                          vertical
                          dots={false}
                          dragging={false}
                          swiping={false}
                          autoplay
                          infinite
                        >
                            <div className="v-item">家里有新消息了！《关于绿化喷药的通知（首期片区）》</div>
                            <div className="v-item">家里有新消息了！《关于2019年9月份电梯保养的通知》</div>
                            <div className="v-item">家里有新消息了！《关于开展“物业经理接待日”的通知》</div>
                        </Carousel>
                    <div className="right"><img src={rightbtn} alt=""/></div>
                </div>
            </div>
                {/*新盘推荐*/}
                <div className="recommend-container">
                    <div className={"r-title"}>
                        新盘推荐
                    </div>
                    <Carousel
                              frameOverflow="visible"
                              cellSpacing={10}
                              slideWidth={0.8}
                              infinite
                              selectedIndex={0}
                    >
                        {dataRecommend.map((ritem, rindex) => (
                            <a
                                key={rindex}
                                href={ritem.url}
                                style={{
                                    display: 'block',
                                }}
                                onClick={()=>{this.dataRecommendClick(ritem)}}
                            >
                                <img
                                    src={ritem.img}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />
                                <div className={'text'}>
                                    {ritem.title}
                                </div>
                            </a>
                        ))}
                    </Carousel>
                </div>
            <div className={"footerpage"}>
                {
                    data.map((item, index)=>(
                        <div key={index} className={"list-container"}>
                            <div className={"title"}>
                                {item.title}
                                <div className="more" onClick={()=>{window.location.href=item.url}}>更多 <span className="right"><img className={"moreimg"} src={rightbtn} alt=""/></span></div>
                            </div>
                            <div className={'contentAll'}>
                                {
                                    item.content.map((val, i)=>(
                                        <div className={'content'} key={i} onClick={()=>{
                                            window.location.href = val.url
                                            }}>
                                            <img
                                                src={val.img}
                                                alt=''
                                            />
                                            <div className={'text'}>
                                                {val.title}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <br/>
            <br/>
            <FooterNav history={this.props.history} currenturl={"/"}/>
            <Modal
                popup
                visible={selectCompanyShow}
                transparent
                maskClosable={true}
                title="选择公司"
                closable={true}
                animationType={"up"}
                onClose={()=>this.selectCompanyHide()}
                className={"companylist-container-modal"}
            >
                <ul className="companylist-container">
                {companyList&&companyList.map&&companyList.map((citem,index)=>{
                    var br=null
                    if (index%3==0) br={clear:"both"}
                    return <li style={br} onClick={()=>this.selectCompanyHide(citem.companyId,citem.companyName)}>{citem.companyName}</li>
                })}
                </ul>
            </Modal>
        </div>;
    }

    componentDidMount() {
        //2秒后跳到登录
        /*window.setTimeout(()=>{
        },2000)*/
        const {  actions } = this.props;
        const { actionsHome} = actions;
        actionsHome.getCompanyList();
        window.setWindowTitle("禹洲会")
    }
}