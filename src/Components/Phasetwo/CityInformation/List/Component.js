/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Picker, List, PullToRefresh} from 'antd-mobile';
// import headerimg from '../img/header.png';
// import address from '../img/address.png';
// import listimg1 from '../img/listimg.png';
import Bitmap from '../img/Bitmap.png';
/*当前页面用到的*/
const Item = List.Item;

/*自定义类*/
import './Component.less'

@inject('store', 'actions')
@observer
export default class PhasetwoCityInformationList extends React.Component {
    componentDidMount(){
        window.setWindowTitle("城市资讯");
        const {actions, store} = this.props;
        const {actionsPhasetwoCityInformationList} = actions;
        actionsPhasetwoCityInformationList.listProvide();
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoCityInformationList} = store;
        const {refreshing, CityListdata, cityName, provincesList, provincesName, actbottom, height} = storePhasetwoCityInformationList
        const {actionsPhasetwoCityInformationList} = actions;
        const {onRefresh, PickProvinces, itemfun} = actionsPhasetwoCityInformationList
        // console.log(111,CityListdata)
        //console.log("22222", [[...provincesList], [...cityList]]);
        //const {tip}=storeTemplate;

        return <div className={"Components-CityInformationList-container"}>
            <div className="header">
                <div className="headerItem">
                    <Picker
                        data={provincesList}
                        cols={2}
                        onOk={(v) => {
                            PickProvinces(v)
                        }}
                    >
                        <List.Item arrow="down" className={"companyNametitle"}>{provincesName}·{cityName}</List.Item>
                    </Picker>
                </div>

            </div>
            <PullToRefresh
                className={"onRefresh"}
                damping={60}
                direction={'up'}
                style={{
                    height: height,
                    overflow: 'auto',
                }}
                refreshing={refreshing}
                onRefresh={() => {
                    onRefresh()
                }}
            >
                <div className={"banner"}>
                    <img src={Bitmap}/>
                </div>
                <div className={"list"}>
                    {
                        CityListdata && CityListdata.map((v, i) => {
                            return (
                                <div className={"item"} key={i} onClick={() => {
                                    itemfun(history, v)
                                }}>
                                    <div className={"right"}>
                                        <div className={"title"}>{v.title}</div>
                                        <div className={"text"}>{v.digest}</div>
                                        {/* <div className={"date"}>{v.createTime}</div> */}
                                    </div>
                                    <div className={"img"}><img src={v.smallBanner}/></div>
                                </div>
                            )

                        })
                    }
                    {/*<div className={"item item2"}>*/}
                    {/*    <div className={"right"}>*/}
                    {/*        <div className={"title"}>根治城市病得先治“九龙治水”</div>*/}
                    {/*        <div className={"text"}>“管理的碎片化，思想的碎片化，这是影响我们城市建设最大问题。比如地下空间的开发就是各搞各的，有人防工程，有地铁，还有市政管廊。”</div>*/}
                    {/*    </div>*/}
                    {/*    <div className={"img3"}>*/}
                    {/*        <div className={"img"}><img src='https://img-blog.csdnimg.cn/20201014180756919.png' /></div>*/}
                    {/*        <div className={"img"}><img src='https://img-blog.csdnimg.cn/20201014180756919.png'/></div>*/}
                    {/*        <div className={"img"}><img src='https://img-blog.csdnimg.cn/20201014180756919.png'/></div>*/}
                    {/*        <div className={"img"}><img src='https://img-blog.csdnimg.cn/20201014180756919.png'/></div>*/}
                    {/*    </div>*/}
                    {/*    <div className={"date"}>2019-04-20</div>*/}
                    {/*</div>*/}
                </div>
                {CityListdata && CityListdata.length == 0 ? < div className={"actbottomgray"}>暂无数据</div> :
                    actbottom == 1 ? <div className={"actbottom"}>已经到底部</div> :
                        <div className={"actbottom"}>拉动刷新数据</div>
                }
            </PullToRefresh>
        </div>;
    }

    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
