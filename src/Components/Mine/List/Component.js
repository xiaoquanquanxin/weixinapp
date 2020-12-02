/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Flex, WhiteSpace, List, WingBlank, Toast} from 'antd-mobile';
import Layout from "../../pub/LayoutContainersOne";
//头像框组件
import PersonalInfo from '../../pub/PersonalInfo';
import seedlandbg from './img/seedlandbg.png';
import TopBar from '../../CloudPayment/pub/TopBar-cloudPayment';
const Item = List.Item;

const title = '我的';
/*自定义类*/
import './Component.less'
import router from "../../../router";
@inject('store', 'actions')
@observer
export default class MineList extends React.Component {
    /*state = {
        state1: ''
    }*/
    componentDidMount() {
		const { actions,store } = this.props;
		const { actionsMineList} = actions;
		window.setWindowTitle("我的")
        actionsMineList.userInfo();
    }
	hanldClick =(item) =>{
        const { store, actions } = this.props;
        const { storeMineList } = store;
        const {useInfo } = storeMineList;
        if (useInfo.authStatus==1){
            this.props.history.push(item.link);
        }else{
            if (item.renzhen==1){
                if (item.test=='用户认证') {
					this.props.history.push("/SubmitCertification?url="+item.link+'&isMineListPaage=true');
				}  else {
					this.props.history.push("/SubmitCertification?url="+item.link);
				}
            }else{
                this.props.history.push(item.link);
            }
        }

    };
    toUrl = (item) => {

        const { store, actions } = this.props;
        const { storeMineList } = store;
        const { useInfo } = storeMineList;
        if (item.link) {
			//认证状态（1-已认证，0-未认证）
            if (useInfo.authStatus == 1) {
                this.props.history.push(item.link);
            } else {
                if (item.renzhen == 1) {
                    this.props.history.push("HouseAuthentication?url=" + item.link);
                } else {
                    this.props.history.push(item.link);
                }
            }

        } else {
            // 跳转到建设中页面
            this.props.history.push('/Developing');
        }
    }
    render() {
        const { store, actions } = this.props;
        const { storeMineList} = store;
        const { actionsMineList} = actions;
        const { IconList,list1,list2,list3,type,label,useInfo} = storeMineList;
        const { fullName, authStatus, phoneNo, userLogo, nickName }= useInfo;
        const { tongbufun, tuichu } = actionsMineList
        const personalInfo={
			fullName,
			authStatus,
			phoneNo,
            userLogo,
            nickName
        };
        const isLoachost=(window.location.origin.includes('test') || window.location.origin.includes('100.128')) ? true: false;
        console.info('当前环境是___________', isLoachost? '测试':'生产')
		return <div className={"Components-MineList-container"}>
            {/*头部*/}
            <TopBar
                hostry={this.props.history}
                title={title}
                right={null}
            />
            {/*<Layout>*/}
                <div className={"header-padding"}>
                    <div className={"header-bg"}> </div>
					{/*是否显示退入小程序*/}

                    <div className="header">


                        <WingBlank>
                            <div className={"personalcontent"}>
                                <PersonalInfo {...personalInfo} />
                            </div>
                        </WingBlank>
                    </div>
                    <img src={seedlandbg} title="" className={'header-img'}/>
                </div>

            {/*</Layout>*/}
            <WhiteSpace />

			{(useInfo.authStatus == 1 && isLoachost )&&
			<List  className={"listcontent"}>
				<Item thumb={<i className={`font_family list-icon icon-tuichu`}
								style={{color: '#de8686', marginLeft: '10px'}}> </i>} arrow="horizontal" onClick={()=>{tuichu()}}>{label}</Item>
			</List>
			}
			<WhiteSpace />
            <WingBlank>
                {/*{useInfo.authStatus == 1&&
                <Mybutton callback={()=>{tuichu()}} type={type} label={label} />
                }*/}
            </WingBlank>
        </div>;
    }
}
