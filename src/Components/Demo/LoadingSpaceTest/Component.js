import React from 'react';
import withSetTitle from 'LibComponents/withSetTitle';
import { WhiteSpace, WingBlank } from 'antd-mobile';

import LoadingSpace from '../../pub/LoadingSpace';

let title='LoadingSpaceTest';
/**
 * LoadingSpaceTest
 *
 */
class __C extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            data1:null,
            data2:{},
            data3:{resultCode:-1,resultMsg:'提示错误信息',data:{}},
            data4:null
        }
    }
    render () {
        let {data1,data2,data3,data4}=this.state;
        console.log('data4:',data4)
        return <WingBlank className="Components-LoadingSpaceTest-container">
                <LoadingSpace data={data1}></LoadingSpace>
                <WhiteSpace size="xs" />
                <LoadingSpace data={data2}></LoadingSpace>
                <WhiteSpace size="xs" />
                <LoadingSpace height="2rem" data={data3}></LoadingSpace>
                <WhiteSpace size="xs" />
                <LoadingSpace data={data4}>
                    <h2>数据加载到了</h2>
                    {data4&&data4.data.map((item,index)=>{
                        return <h3 key={index}>{item}</h3>
                    })}
                </LoadingSpace>
            </WingBlank>
    }
    componentDidMount(){
        window.setTimeout(()=>{
            let data4={resultCode:-0,resultMsg:'',data:['元素1','元素2','元素3','元素4']}
            this.setState({data4})
        },4000)

    }
}

export default withSetTitle(__C,title);