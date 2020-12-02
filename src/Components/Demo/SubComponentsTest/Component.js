import React from 'react';
import withSetTitle from 'LibComponents/withSetTitle';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import './Component.less'
function createC(title){
    class __C extends React.Component {
        constructor (props) {
            super(props);
            console.log(title+' constructor');
        }
        render () {
            console.log(title+' render');
            return <div className="Components-SubComponentsTest-container">
                <h3>{title}</h3>
                {this.props.children||null}
            </div>;
        }
        componentDidMount(){
            console.log(title+' componentDidMount');
        }
    }
    return __C;
}
/**
 * 嵌套组件测试
 *
 */
let C1=createC('子1');
let C11=createC('子11');
let C111=createC('子111');
class __C extends React.Component {
    constructor (props) {
        super(props);
        console.log('root constructor');
        this.state={
            isRefresh:false
        }
    }
    render () {
        console.log('root render');
        return <div className="Components-SubComponentsTest-container">
            <C1>
                <C11>
                    <C111></C111>
                </C11>
            </C1>
        </div>;
    }
    componentDidMount(){
        console.log('root componentDidMount');
        this.setState({isRefresh:true})
    }
}


export default withSetTitle(__C, '测试：嵌套组件测试');