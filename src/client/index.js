import 'idempotent-babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import store from './config/store';
import { loadComponents } from  'loadable-components';
import {connect} from 'react-redux';

class Main extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                    {renderRoutes(Routes)}
            </Router>
        );
    }
}
const MainComponent = connect(null,{})(Main);

loadComponents().then(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
                   <MainComponent/>
        </Provider>,
        document.querySelector('#root')
    );
});
