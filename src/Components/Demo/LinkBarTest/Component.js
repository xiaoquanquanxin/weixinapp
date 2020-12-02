import React from 'react';
import withSetTitle from 'LibComponents/withSetTitle';
import { List, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
import LinkBar from 'LibComponents/LinkBar';
const pageTitle='LinkBarTest';
/**
 * 所有页面列表
 *
 */
class __C extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return <div className="Components-LinkBarTest-container">
            <LinkBar/>
            </div>;
    }
}
export default withSetTitle(__C,pageTitle);