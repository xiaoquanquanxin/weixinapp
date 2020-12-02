/*共用的*/
import React,{Fragment}from 'react'
//import PropTypes from 'prop-types'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
class LayoutContainersOne extends React.Component {
    constructor(props){
        super(props);
        this.state={
            headerHeight:130,
        }
    }
    componentWillMount(){
        if(this.props.height){
            this.setState({
                headerHeight:this.props.height
            })
        }
    }
    render() {
        return <div className={"Components-LayoutContainersOne-container"}>
                    <div className={"LayoutContainersOne-header"}>
                <div className={"LayoutContainersOne-header-content"}   style={{ height: `${this.state.headerHeight / 100}rem`}}>
                            {
                                React.Children.map(this.props.children, (child) => {
                                    if (child.props.type === "header") {
                                        return <Fragment>{child}</Fragment>
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={"LayoutContainersOne-content"}>
                        {
                            React.Children.map(this.props.children, (child) => {
                                if (child.props.type === "content") {
                                    return <Fragment>{child}</Fragment>
                                }
                            })
                        }
                    </div>
                </div>;
    }
}
export default LayoutContainersOne