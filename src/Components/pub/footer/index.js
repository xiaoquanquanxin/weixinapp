/*共用的*/
import React from 'react'
/*antd-mobile*/
import {Button} from 'antd-mobile';
import PropTypes from "prop-types";
import './Component.less'
/*自定义类*/
class footer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
           
        }
    }
    static propTypes = {
        label: PropTypes.string.isRequired, //标签
        type: PropTypes.string.isRequired,//类型
    }
    componentWillMount(){
        
    }
    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.label!=this.props.label||
            nextProps.t!=this.props.t
        ) return false;
        return true
    }
    render() {
        let {label,t}=this.props;
        return (<div className="Component-footer-container">

                </div>)
    }
}
export default Mybutton