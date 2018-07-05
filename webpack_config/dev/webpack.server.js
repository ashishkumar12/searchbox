const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {

    // Inform webpack that we are building a bundle
    // for 'nodeJs', rather than for the browser

    target: 'node',

    //Tell webpack the root file of our
    //server Application

    entry: './src/server/index.js',

    // Tell webpack where to put the output file
    // that is generated

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../build'),
    },
    plugins: [
        new CleanWebpackPlugin(['../../build']),
    ],
    externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
