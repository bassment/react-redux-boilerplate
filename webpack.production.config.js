const webpack = require('webpack');
const devConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const _ = require('lodash');

const extend = {
    devtool: null,
    output: {
        pathinfo: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new UglifyJsPlugin({
            minimize: true,
            debug: false,
            sourceMap: false,
            compressor: {
                warnings: false,
            },
        }),
    ],
};

const prodConfig = _.merge(
    devConfig,
    extend,
    (a, b) => {
        if (_.isArray(a)) {
            return a.concat(b);
        }
        return _.merge(a, b);
    }
);

module.exports = prodConfig;
