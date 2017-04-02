/* eslint strict: 0, no-console: 0 */
'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.js');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer({});

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(express.static('dist'));

app.get('/api/*', (req, res) => {
    proxy.web(req, res, {target: 'http://10.12.28.75:9000'}, error => console.lo(error))
});

app.get(/\/(reviews|login|reviews*)/, (req, res) => {
    res.sendFile('/Users/antoshaVel/React/reviews/dist/index.html');
});


app.listen(port, function onStart(err) {
    if (err) {
        console.log(err);
    }

    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
