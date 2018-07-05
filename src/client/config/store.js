import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import Cookies from 'universal-cookie';
// import {connectToSocket} from "./socket";
import reducers from '../reducers';
const API_URL = process.env.API_URL;

// axios config
axios.defaults.baseUrl = API_URL;
const axiosInstance = axios.create({
    baseURL: `/v1/api`
});

const preloadedState = window.INITIAL_STATE;
// delete window.INITIAL_STATE;
// composer settings

let composeEnhancer = '';
if (process.env.NODE_ENV == 'production') {
    composeEnhancer = compose(
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    );
} else {
    composeEnhancer = compose(
        applyMiddleware(thunk.withExtraArgument(axiosInstance)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
const store = createStore(
    reducers,//reducers
    preloadedState,
    composeEnhancer
);
//cookie config


export default store;
