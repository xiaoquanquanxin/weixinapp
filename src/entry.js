import React from 'react'
import ReactDOM from 'react-dom'
import HashRouter from 'react-router-dom/HashRouter'
import AppContainer from 'react-hot-loader/lib/AppContainer'

const FastClick = require('../lib/fastclick')
require('es6-promise').polyfill();
//目前用的是jquery,感觉稳定很多
//require('isomorphic-fetch');
require('./global.js');
//解决移动端300毫秒延迟
FastClick.attach(document.body);
import App from './App'

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <HashRouter>
                <Component/>
            </HashRouter>
        </AppContainer>,
        document.getElementById('root')
    );
render(App);
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextRootContainer = require('./App').default;
        render(NextRootContainer)
    })
}
