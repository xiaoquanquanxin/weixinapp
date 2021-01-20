/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
import RichTextDisplay from "../../pub/RichTextDisplay/Component"
/*自定义类*/
import './Component.less'

// 公共组件
@inject('store', 'actions')
@observer
export default class PhasetwoArticle extends React.Component {
    componentDidMount(){
        // 项目家书 - 65
        // 工程进展 - 66
        // 社区文化 - 67
        window.setWindowTitle("加载中");
        const {actionsPhasetwoArticle} = this.props.actions;
        actionsPhasetwoArticle.init();
        actionsPhasetwoArticle.setnoticeDetail(this.props.match.params.id);
        window.JQ('.Components-Notice-a').on("click", "a", function (){
            window.location.href = window.JQ(this).attr('hrefnew')
        });
    }

    componentWillReceiveProps(newProps){
        if (this.props.match.params.id !== newProps.match.params.id) {
            this.props.actions.actionsPhasetwoArticle.setnoticeDetail(newProps.match.params.id)
        }
    }

    componentDidUpdate(){
        let artA = window.JQ('.Components-Notice-a a')
        for (let i = 0; artA.length > i; i++) {
            let artAhref = artA.eq(i).attr('href')
            artA.eq(i).attr('hrefnew', artAhref)
            //artA.eq(i).removeAttr('href')
            artA.eq(i).attr('href', "javascript:void(0);")
        }
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoArticle} = store;
        const {actionsPhasetwoArticle} = actions;
        const {readText, test1} = actionsPhasetwoArticle;
        const {setnoticeDetail} = storePhasetwoArticle
        let urlobj = window.getQueryString();
        let title = "城市资讯"
        if (urlobj && urlobj.title == 33) {
            title = "业主家书"
        } else if (urlobj && urlobj.title == 32) {
            title = setnoticeDetail.title
        } else if (urlobj && urlobj.title == 65) {
            title = "项目家书"
        } else if (urlobj && urlobj.title == 66) {
            title = "工程进展"
        } else if (urlobj && urlobj.title == 67) {
            title = "社区文化"
        } else {
            title = "城市资讯"
        }
        console.log("title", title);
        window.setWindowTitle(title ? title : "加载中");
        return <div url={"/Notice"} className="Components-Notice-container article_img">
            <div className="content-wrap">
                <div className="content">
                    {/* {urlobj && urlobj.title == 32?"": */}
                    <div className="top">
                        <div className="title">{setnoticeDetail.title}</div>
                        <div className="sub-title">
                            <span>作者：{setnoticeDetail.author}</span>
                            {/* <span className="date">{setnoticeDetail.createTime && setnoticeDetail.createTime.split(" ")[0]}</span> */}
                        </div>
                    </div>
                    {/* } */}

                    <div className="center Components-Notice-a">
                        <RichTextDisplay>
                            {setnoticeDetail && setnoticeDetail.content}
                        </RichTextDisplay>

                    </div>
                    {setnoticeDetail.originalLink &&
                    <div className={"readTextc"} onClick={() => {
                        readText(setnoticeDetail.originalLink, history)
                    }}>阅读原文</div>
                    }

                </div>
            </div>
        </div>;
    }
}

