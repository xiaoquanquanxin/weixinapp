import React from 'react'
import { TransitionGroup, CSSTransition } from "react-transition-group";
function withSetTitle(WrapperComponent, title) {
    return class SetDocumentTitle extends React.PureComponent {
        state = {
            title: title
        }
        componentWillMount() {
            this.setTitle()
        }
        componentWillReceiveProps() {
            this.setTitle()
        }
        setTitle() {
            const { title } = this.state
            document.title = title
        }
        render() {
            //console.log('this.state', this.state)
            //return  <WrapperComponent {...this.props} />
            return <TransitionGroup className="normal-enter">
                <CSSTransition
                    timeout={500}
                    key={new Date().getTime()}
                    classNames="normal"
                >
            <WrapperComponent {...this.props} />
                </CSSTransition></TransitionGroup>
        }
    }
}
export default withSetTitle