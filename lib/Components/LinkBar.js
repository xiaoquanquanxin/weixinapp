import React from 'react';
import { withRouter } from 'react-router';
import './LinkBar.less'
/**
 * 所有页面列表
 * 属性
 * data=[{title:,url:''}] url:
 * clickitem
 *
 */
@withRouter
class LinkBar extends React.Component {
    /* componentWillMount(){

    }*/
    render () {
        let menuData=this.props.data||[]
        let currentUrl=this.props.url||'';
        let locationUrl = this.props.location.pathname || '';
        let houstListsCount = this.props.houstListsCount||0;
        if (currentUrl==''){
            if (menuData.length>=1){
                currentUrl=menuData[0].url;
            }
        }

        return <div style={{ background: "#FAFAFC" }}>
            <div className={"linkBar-bottom"}>
                <a><div className="ico" style={{ width: "22px", margin:"8px 0", height: "22px", background: "url(./files/3XjEFmDZ5_.png) center center 21px 21px no-repeat"}}></div>公告</a>
            </div>
                <div className="Components-LinkBar-container">
                    {menuData.map((item,index)=>{
                        let className='';
                        let url=item.url;
                        let icoBackground=item.icoBackground;
                        if (url==currentUrl){
                            className = 'select';
                            icoBackground = item.icoBackground2;
                        }
                        return <a href="#" className={className} key={index} onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            //console.log('onClick......url:'+url+",currentUrl:"+currentUrl);
                            if (url == locationUrl) return;
                            //console.log("clickitem:",this.props.clickitem)
                            if (typeof this.props.clickitem=="undefined"){
                                this.props.history.push(url);
                            }else{
                                this.props.clickitem(url,currentUrl);
                            }

                        }}>
                            <div className="ico" style={{
                            width: '22px',
                            height: '22px',
                            background: "url(" + icoBackground +") center center /  21px 21px no-repeat"}}
                            />
                            {item.title == "购物车" && houstListsCount != 0?<div className="shop_icon_num">{houstListsCount}</div>:""}
                                {item.title}
                            </a>
                    })}
                </div>
            </div>
    }
}
export default LinkBar;