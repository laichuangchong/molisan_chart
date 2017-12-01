/**
 * Created by chenzhongying on 2017/10/20.
 */
import React from 'react';
import ReactDOM from 'react-dom';

//import styles
import 'weui';
import {Provider,connect} from 'react-redux';
import {Router, Route, IndexRoute, Link, browserHistory,hashHistory, Location} from 'react-router';
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import store from './store';

const url = '';
const routes = [
    {
        path: url+'/home',
        getChildRoutes(location, callback) {
            require.ensure([], function (require) {
                callback(null, [
                    require('./routes/choose'),
                    require('./routes/test')
                ])
            })
        },
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./component/common').default)
            })
        },
        getIndexRoute(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./routes/choose'))
            })
        }
    },
    {
        path: url + '/',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./component/login').default)
            })
        }
    },
    {
        path: url + '/*',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./component/noMatch').default)
            })
        }
    }
];

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory} routes={routes}/>
            </Provider>
        );
    }
}

ReactDOM.render(<Home/>, document.getElementById('root'));
