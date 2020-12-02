/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import uuid from 'uuid';
import { TransitionGroup, CSSTransition } from "react-transition-group";
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
class __C extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: uuid(), text: 'Buy eggs' },
                { id: uuid(), text: 'Pay bills' },
                { id: uuid(), text: 'Invite friends over' },
                { id: uuid(), text: 'Fix the TV' },
            ],
        };
    }

    render() {
        const { items } = this.state;
        return <div className={"Components-TransitionTest-container"}>
            <WingBlank>
                <h3>TransitionTest</h3>
                <TransitionGroup>
                    {items.map(({ id, text }) => (
                        <CSSTransition
                            key={id}
                            timeout={500}
                            classNames="fade"
                        >
                        <Button
                            type="warning"
                            onClick={() => {
                                this.setState(state => ({
                                    items: state.items.filter(
                                        item => item.id !== id
                                    ),
                                }));
                            }}
                        >
                                    {text}
                        </Button>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </WingBlank>
            <Button
                type="button"
                onClick={() => {
                    const text = prompt('Enter some text');
                    if (text) {
                        this.setState(state => ({
                            items: [
                                ...state.items,
                                { id: uuid(), text },
                            ],
                        }));
                    }
                }}
            >
                Add Item
            </Button>
        </div>
    }
}
export default withSetTitle(__C, '页面1')