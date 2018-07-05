//${FCInit()}
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import serialize from 'serialize-javascript';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {Helmet} from 'react-helmet';
import Routes from '../client/Routes';
import {getLoadableState} from 'loadable-components/server';

let _allStyles = '';

// configureLoadStyles((styles) => {
//     _allStyles += styles;
// });
export default(req, store, context,style) => {
    const content = <Provider store={store}>
                            <StaticRouter location={req.path} context={context}>
                                     {renderRoutes(Routes)}
                            </StaticRouter>
                        </Provider>;
    const html  =  renderToString(content);
    return getLoadableState(content).then(loadableState => {
        const helmet = Helmet.renderStatic();
        // Store registered styles in a variable used later for injection.
        return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <base href="/" />
                <meta charset="utf-8">
                <link rel="apple-touch-icon" sizes="57x57" href="/static/icon/apple-icon-57x57.png">
                <link rel="apple-touch-icon" sizes="60x60" href="/static/icon/apple-icon-60x60.png">
                <link rel="apple-touch-icon" sizes="72x72" href="/static/icon/apple-icon-72x72.png">
                <link rel="apple-touch-icon" sizes="76x76" href="/static/icon/apple-icon-76x76.png">
                <link rel="apple-touch-icon" sizes="114x114" href="/static/icon/apple-icon-114x114.png">
                <link rel="apple-touch-icon" sizes="120x120" href="/static/icon/apple-icon-120x120.png">
                <link rel="apple-touch-icon" sizes="144x144" href="/static/icon/apple-icon-144x144.png">
                <link rel="apple-touch-icon" sizes="152x152" href="/static/icon/apple-icon-152x152.png">
                <link rel="apple-touch-icon" sizes="180x180" href="/static/icon/apple-icon-180x180.png">
                <link rel="icon" type="image/png" sizes="192x192"  href="/static/icon/android-icon-192x192.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/static/icon/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="96x96" href="/static/icon/favicon-96x96.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/static/icon/favicon-16x16.png">
                <link rel="manifest" href="/static/icon/manifest.json">
                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
                <meta name="theme-color" content="#ffffff">
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700" rel="stylesheet">
                <link rel="shortcut icon" type="image/x-icon" href="/static/icon/favicon.ico">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
                <style>${style}</style>
            </head>
            <body style="margin:0px">
                <script>
                window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                ${loadableState.getScriptTag()}
                <script async src='/bundle.js?version=${process.env.HASH_ID}'></script>
                <div id="root">${html}</div>
            </body>
        </html>
    `;
    })
};