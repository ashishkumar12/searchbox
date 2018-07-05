//If your changing URL Here then Don't
//forget to change Helmet meta tag URL


import React from 'react';
import loadable from 'loadable-components';

const Loading = () => <h1>Loading...</h1>
const App = loadable(() => import ('./App') );
const Home  = loadable(() => import('./pages/Home'));
const Product  = loadable(() => import('./pages/Product'));

export default [
    {
        component : App,
        routes : [
            {
                component : Home,
                path : '/',
                exact : true,
                loadData : require('./pages/Home').loadData
            },
            {
                component : Product,
                path : '/products/:product_id',
                exact : true,
                loadData : require('./pages/Product').loadData
            },
        ]
    }
];
