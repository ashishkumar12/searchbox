import 'idempotent-babel-polyfill';
import express from 'express';
import renderer from '../helpers/renderer';
import proxy from 'express-http-proxy';
import createStore from '../helpers/createStore';
import {
    matchRoutes
} from 'react-router-config';
import Routes from '../client/Routes';
const fs = require('fs');
const dir = './dist/app.css';

const app = express();
const compression = require("compression");
const request = require('request');

function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
}

app.use(compression({
    level: 6, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress, // set predicate to determine whether to compress
}));

app.use('/v1', proxy(process.env.API_URL+'/api', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3001';
        return opts;
    }
}));

app.use(express.static('dist'));
app.use('/static', express.static('public'));
app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});

// for serve website to client
function serveWeb(req,res,next){
    const store = createStore(req);
    const promises = matchRoutes(Routes, req.path).map(({
        route
    }) => {
      //  console.log(req.query);
        return route.loadData ? route.loadData(store,route,req.path,req.query,req.params) : null;
    }).map((promise) => {
        if (promise) {
                return new Promise((resolve, reject) => {
                    Promise.all(promise).then((value) => {
                        resolve(value);
                    });
                });
        }
    });
    Promise.all(promises).then(() => {
        const context = {};   
        const style = fs.readFileSync(dir,'utf-8')  
        renderer(req, store, context,style).then((content) => {
            if (context.url) {
                return res.redirect(301, context.url);
            }

            if (context.notFound) {
                res.status(404);
            }

            res.send(content);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}

app.get('/*',serveWeb);

app.listen(3001, () => {
    console.log('listening on port 3001')
});
