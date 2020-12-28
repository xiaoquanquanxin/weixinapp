/*共用的*/
import React from 'react'
/*antd-mobile*/
import {Button} from 'antd-mobile';
import PropTypes from "prop-types";
import './Component.less'
/*自定义类*/


export default class TopBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    static propTypes = {
        // label: PropTypes.string.isRequired, //标签
        // type: PropTypes.string.isRequired,//类型
    };

    goback = () => {
        const href = window.location.href;
        const pageName_DechanHandle_ = href.includes('/CloudPayment/DechanHandle');
        const pageName_Wuyehandle_ = href.includes('/CloudPayment/Wuyehandle');
        if (pageName_DechanHandle_ || pageName_Wuyehandle_) {
            let uObj = window.getQueryString();

            if (uObj.orderDetailId) {
                console.log(uObj.orderDetailId);
                this.props.hostry.push('/CloudPayment/DeliveryAppointment/?orderDetailId=' + uObj.orderDetailId)
                return false
            }
            this.props.hostry.push('/CloudPayment/DeliveryAppointment/')

        } else {
            this.props.hostry.goBack()
        }
    };

    render(){
        let {title, right, lineHeightValue} = this.props;
        return (<div className="Components-TopBar-container">
            <div className={'topbar'} style={{
                lineHeight: window.OSInfo() == 'android' ? lineHeightValue + 'px' : 'auto',
                background: (this.props.opacity == 1 || !this.props.opacity) ? 'linear-gradient(to right, #04639D, #024868)' : 'transparent'
            }}>
                {
                    this.props.left ? <div style={{width: 45}}> &nbsp;</div> :
                        <div className="item" onClick={this.goback}><span className="icon font_family"> &#xe662;</span>
                        </div>
                }

                <div className="item">{title}</div>
                {right && <div className="item">{right.props.children}</div>}

            </div>
            <div className={'topbarHeight'}></div>
        </div>)
    }
}
