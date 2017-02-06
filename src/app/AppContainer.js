import React, { Component } from 'react';
import { Router, browserHistory, RouterContext } from 'react-router';
import { Adrenaline } from '../Adrenaline';
import routes from './routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './store/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
const history = __SERVER__ ? createMemoryHistory() : browserHistory;

export default class AppContainer extends Component {
    render() {

        let {dataCallBack, initialData, initialDataRoute} = this.props;
        let adrenalineProps = {};
        if (!__SERVER__) {
            if (document.getElementById('app-props')) {
                try {
                    let props = document.getElementById('app-props').textContent;
                    props = props.slice(9, -3); // removing '<![CDATA[' and ']]>'
                    let __initial_DATA__ = JSON.parse(props);
                    adrenalineProps = {initialData: __initial_DATA__.data, initialDataRoute: __initial_DATA__.route};
                    var elem = document.getElementById('app-props');
                    elem.parentElement.removeChild(elem);
                } catch (e) {
                    // cannot parse data from server
                }
            }
        } else {
            const noNetworkLayer = require('../Adrenaline/network/noNetworkLayer').default;
            adrenalineProps = {
                fetchBeforeRender: true,
                initialData: initialData,
                initialDataRoute: initialDataRoute,
                fetchDoneCallback: dataCallBack,
                networkLayer: noNetworkLayer
            }
        }

        return (
            <Provider store={store()}>
                {this.props.renderProps ?
                    <RouterContext { ...this.props.renderProps }
                        createElement={(Component, props) => <Component {...props} aProps={adrenalineProps} />} />
                    :
                    <Router history={history}>
                        {routes(adrenalineProps)}
                    </Router>
                }
            </Provider>
        );
    }
}
