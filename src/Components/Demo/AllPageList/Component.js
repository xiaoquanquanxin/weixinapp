import React from 'react';
import withSetTitle from 'LibComponents/withSetTitle';
import { List, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 所有页面列表
 *
 */
class __C extends React.Component {
    constructor (props) {
        super(props);
        this.dataList = [
            { label: '业务相关列表', url: '/test/PageList' },
            { label: '首页', url: '/' },
            { label: '--==Demo==--', url: '#', noExtra: '' },
            { label: 'noMbox', url: '/Demo/noMbox' },
            { label: 'Template', url: '/Demo/Template' },
            { label: 'TemplateNoMbox', url: '/Demo/TemplateNoMbox' },
            { label: 'TemplateComponentMbox', url: '/Demo/TemplateCDemo' },
            { label: 'Counter', url: '/Demo/Counter' },
            { label: 'ImgTest', url: '/Demo/ImgTest' },
            { label: 'HttpTest', url: '/Demo/HttpTest' },
            { label: 'WebviewMsg', url: '/Demo/WebviewMsg' },
            { label: 'RemTest', url: '/Demo/RemTest' },
            { label: 'TransitionTest', url: '/Demo/TransitionTest' },
            { label: 'LoadingSpaceTest', url: '/Demo/LoadingSpaceTest' },
            { label: 'LinkBarTest', url: '/Demo/LinkBarTest' },
            { label: 'PerformanceTest', url: '/Demo/PerformanceTest' },
            { label: 'PerformanceTestMbox', url: '/Demo/PerformanceTestMbox' },
            { label: 'FormTest', url: '/Demo/FormTest' },
            { label: '本地存储', url: '/Demo/Localstorage' },
            { label: '微信测试', url: '/Demo/WXTest' }
        ];
        this.goto.bind(this);

    }
    goto (url) {
        this.props.history.push(url);
    }
    render () {
        return <WingBlank >
            <List renderHeader={() => '所有页面列表'} >
                {
                    this.dataList.map((item, index) => {
                        let arrow = typeof item.noExtra != 'undefined' ? 'empty' : 'horizontal';
                        return <Item arrow={arrow} key={index}
                                     onClick={() => {this.goto(item.url);}} >{item.label}</Item >;
                    })
                }
            </List ></WingBlank >;
    }
}

export default withSetTitle(__C, '测试：所有页面列表');