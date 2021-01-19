/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {List, Button, WhiteSpace, Carousel, Toast} from 'antd-mobile';
/*当前页面用到的*/
const carousel1 = require('./carousel1.jpg');
const carousel2 = require('./carousel2.jpg');
const carousel3 = require('./carousel3.jpg');
const active1 = require('./active1.jpg');
const active2 = require('./active2.jpg');
const active3 = require('./active3.jpg');
const active4 = require('./active4.jpg');
const culture1 = require('./culture1.jpg');
const culture2 = require('./culture2.jpg');
const culture3 = require('./culture3.jpg');
const culture4 = require('./culture4.jpg');

//4个图标
const ico_fwbx = require('./fwbx.png')//房屋保修
const ico_tsjy = require('./tsjy.png')//投诉建议
const ico_yzjs = require('./yzjs.png')//业主家书
const ico_sqgg = require('./sqgg.png')//社区公告
const navicodata = [
    {img: ico_fwbx, title: "房屋报修"},
    {img: ico_tsjy, title: "投诉建议"},
    {img: ico_yzjs, title: "个人中心"},
    {img: ico_sqgg, title: "社区公告"},
]
//临时底部页面
const pagefoot = require('./pagefoot.jpg')
const Item = List.Item;
const Brief = Item.Brief;

/*自定义类*/
import './Component.less'

@inject('store', 'actions')
@observer
export default class Home extends React.Component {
    clickGetSessionKey(e) {
        if (!window.isWeiXin()) {
            alert("请用微信打开")
        }
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4327ffad43e7c80d&redirect_uri=http%3a%2f%2fkftest.yuzhou-group.com%2fwechat-mobile%2fwx%2fredirect%3fforwordUrl%3dhttp%3a%2f%2fkftest.yuzhou-group.com%3furl%3d%2fDemo%2fWXTest&response_type=code&scope=snsapi_base&state=1566041599158#wechat_redirect"
    }


    navicoClick(index) {
        switch (index) {
            case 0:
                window.location.href = "#/AddRepair" //房屋保修
                break;
            case 1:
                window.location.href = "#/ComplaintSuggestions" //投诉建议
                break;
            case 2:
                //临时使用:个人中心
                window.location.href = "#/MineList"
                return;
                break;
            case 3:
                //社区公告
                //临时使用:身份认证

                // 跳转到建设中页面
                this.props.history.push('/Developing');
                // this.houseAuthenticationClick()
                return;
                break;
        }
    }
    toUrl = (url) => {
       // window.location.href = url;
    }

    render() {
        //const { store, actions } = this.props;
        //const { storeHome } = store;
        //const { actionsHome} = actions;
        //const {tip}=storeHome;
        let slideData = [carousel1, carousel3];

        const data = [
            {
                title: '最新活动',
                content: [
                    {
                        title: '福利活动 | 荧光夜跑酷炫启航，让爱与快乐点亮上海夏夜！',
                        img: active1,
                        url: 'https://mp.weixin.qq.com/s/JBnQw6UXIMUqoniMWvgJDg'
                    },
                    {
                        title: '业主福利 | 七夕，送你一份独一无二的爱！',
                        img: active2,
                        url: 'https://mp.weixin.qq.com/s/W6u-OLIF3oONheQNc6EmTQ'
                    },
                    {
                        title: '禹君共度未来|上海禹洲府圆满交付',
                        img: active3,
                        url: 'https://mp.weixin.qq.com/s/bNJnvkz0FKl3cZ9MODQoQQ'
                    },
                    {
                        title: '雍贤府工地开放日 | 归家之路，自此起航！',
                        img: active4,
                        url: 'https://mp.weixin.qq.com/s/JAEare6xTX_xRfhCAtrkIQ'
                    }
                ]
            },
            {
                title: '社区文化',
                content: [
                    {
                        title: '舒适居家 | 酷暑反击战',
                        img: culture1,
                        url: 'https://mp.weixin.qq.com/s/V0H4veEpS-HlB5DmQP6zyQ'
                    },
                    {
                        title: '舒适居家 | 小禹儿教您环保新时尚！',
                        img: culture2,
                        url: 'https://mp.weixin.qq.com/s/oYZmxiLsGqHSltzER6Nyzw'
                    },
                    {
                        title: '舒适居家 | 梅雨季节除湿防霉，教您小妙招',
                        img: culture3,
                        url: 'https://mp.weixin.qq.com/s/5_YP-Nw1nCPVKQxBDO5gzw'
                    },
                    {
                        title: '客户心声 | “谢谢你每次都在需要时赶到我们身边”',
                        img: culture4,
                        url: 'https://mp.weixin.qq.com/s/nt3I6GIYqDyT-RUqBfdpZQ'
                    }
                ]
            }
        ]

        return <div className={"Components-Home-container"}>
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
            <div className="navico">
                {navicodata.map((item, index) => {
                    return <div key={index} onClick={() => this.navicoClick(index)} className="iconav"><img
                        src={item.img} alt=""/>
                        <div className={"tip"}>{item.title}</div>
                    </div>
                })}
            </div>
           {/* <div className={'active'}>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        <Carousel className="my-carousel"
                                  vertical
                                  dots={false}
                                  dragging={false}
                                  swiping={false}
                                  autoplay
                                  infinite
                                  speed={200}
                                  autoplayInterval={3000}
                                  resetAutoplay={false}
                        >
                            {['ticket', 'note'].map(type => (
                                <div className="v-item" key={type}>
                                    {type} <Brief>{type}</Brief>
                                </div>
                            ))}
                        </Carousel>
                    </Item>
                </List>
            </div>*/}
            <div className={"footerpage"}>
                {
                    data.map((item, index)=>(
                        <div key={index}>
                            <div className={"title"}>
                                {item.title}
                            </div>
                            <div className={'contentAll'}>
                                {
                                    item.content.map((val, i)=>(
                                        <div className={'content'} key={i} onClick={()=>this.toUrl(val.url)}>
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
                                <div style={{clear:'both'}}> </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>;
    }

    componentDidMount() {
        //2秒后跳到登录
        /*window.setTimeout(()=>{
        },2000)*/
        window.setWindowTitle("")
    }
}
