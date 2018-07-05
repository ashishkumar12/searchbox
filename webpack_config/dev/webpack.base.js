const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    //Tell webpack to run babel on every file it runs through
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets : [
                        'es2015',
                        'react',
                        'stage-2'
                    ]
                }
            },
            {
               test: /\.scss$/,
               use: ExtractTextPlugin.extract({
                 fallback: "style-loader",
                 use: [{
                     loader : "css-loader",
                     options : {
                        minimize: true
                     }
                    },
                    {
                        loader : "sass-loader"
                    }]
               })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: [{
                      loader : "css-loader",
                      options : {
                         minimize: true
                      }
                     }]
                })
             }
        ],
    },
    plugins: [
        extractSass,
        new webpack.EnvironmentPlugin({
            'NODE_ENV': 'development',
            'HASH_ID' : (new Date).getTime(),
            'HOST_URL' : 'http://localhost:3001',
            // 'API_URL': 'https://dashboard.punbox.co',
            'API_URL': 'http://localhost:3000',
        }),
        // new BundleAnalyzerPlugin(),
      ]
};
