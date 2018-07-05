const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {

    //Tell webpack the root file of our
    //server Application
    target: 'web',
    entry: {
        app: './src/client/index.js'
    },

    // Tell webpack where to put the output file
    // that is generated

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist'),
    },
    plugins: [
        new CleanWebpackPlugin(['../../dist']),
    ],
};

module.exports = merge(baseConfig, config);
