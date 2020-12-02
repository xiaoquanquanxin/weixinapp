/*
模板
不需要noMbox功能
*/
/*共用的*/
import React from 'react'
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar,List,InputItem} from 'antd-mobile';
/*当前页面用到的*/
import Cookie from 'LibUtils/Cookie.js';
/*自定义类*/
import './Component.less'
class __C extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cTxt:'',
            lTxt:''
        };
        this.cookie=new Cookie()
    }
    saveCData(){
        this.cookie.setData('test_Localstorage',this.state.cTxt,1)
    }
    readCData(){
        this.setState({cTxt:this.cookie.getData('test_Localstorage')})
    }
    delCData(){
        this.cookie.clear()
        //this.cookie.del('test_Localstorage')
    }
    saveLData(){
        window.setLocalData('test_Localstorage_2',this.state.lTxt)
    }
    readLData(){
        let v=window.getLocalData('test_Localstorage_2')
        console.log(v)
        this.setState({lTxt:v})
    }
    delLData(){
        window.delLocalData('test_Localstorage_2')
    }
    render() {
        let {cTxt,lTxt}=this.state
        return <div className={"Components-Localstorage-container"}>
            <List renderHeader={() => 'Cookie test'} >
                <List.Item>
                    <div
                        style={{ width: '100%', color: '#f00', textAlign: 'center' }}
                    >{cTxt}
                    </div>
                </List.Item>
                <List.Item>
                    <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onClick={() => this.readCData()}
                    >
                        <Button type="primary">读取缓存</Button>
                    </div>
                    <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onClick={() => this.delCData()}
                    >
                        <Button type="primary">清空缓存</Button>
                    </div>
                </List.Item>
                <InputItem
                    type="text"
                    clear
                    onChange={(value,e)=>this.setState({cTxt:value})}
                >设置值</InputItem>
                <List.Item>
                    <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onClick={() => this.saveCData()}
                    >
                        <Button type="primary">保存</Button>
                    </div>
                </List.Item>
            </List>
            <List renderHeader={() => 'Localstorage test'} >
                <List.Item>
                    <div
                        style={{ width: '100%', color: '#f00', textAlign: 'center' }}
                    >{lTxt}
                    </div>
                </List.Item>
                <List.Item>
                    <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onClick={() => this.readLData()}
                    >
                        <Button type="primary">读取缓存</Button>
                    </div>
                    <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onClick={() => this.delLData()}
                    >
                        <Button type="primary">清空缓存</Button>
                    </div>
                </List.Item>
                <InputItem
                    type="text"
                    clear
                    onChange={(value,e)=>this.setState({lTxt:value})}
                >设置值</InputItem>
                <List.Item>
                    <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onClick={() => this.saveLData()}
                    >
                        <Button type="primary">保存</Button>
                    </div>
                </List.Item>
            </List>
        </div>;
    }
    componentWillMount(){
        this.readCData()
        this.readLData()
    }

}
export default withSetTitle(__C, '页面1')