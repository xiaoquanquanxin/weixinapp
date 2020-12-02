/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer



class __C extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        	test: 0
		}
    }
	shouldComponentUpdate (nextProps, nextState) {
    	console.info('nextProps_______________',this.state.test) //0
		console.info('nextState________________',nextState.test) //1
		if (this.state.test != nextState.test) return true;
		return false;
	}

    render() {

		/*拆分store,actions*/
        const { store, actions } = this.props;
        const { storeCounter } = store;
        const { actionsCounter } = actions;
        return (
            <div className={"Components-Counter-container"}>
                {<WingBlank>
                    <WhiteSpace size="lg" />
                    <Flex>
                        <Flex.Item>
                            <div className={"tipMsg"}>{this.state.test}</div>
							<div className={"tipMsg"}>{storeCounter.a}</div>
                        </Flex.Item>
                    </Flex>
                    <Flex>
                        <Flex.Item>
                            <Button icon="check-circle-o" onClick={()=>{
								actionsCounter.incA()

                            	this.setState({
									test:this.state.test+1
								})
                            }
							}>加</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button icon="check-circle-o" onClick={actionsCounter.decA}>减</Button>
                        </Flex.Item>
                    </Flex>
                </WingBlank>}
            </div >
        );
    }
}
export default withSetTitle(__C, '页面1')