/**
  * @file mock文件
  * @author dva<yingfeng.ni@gmail.com>
  */
const fs = require('fs');
const path = require('path');

module.exports = function (webpackConfig, env) {
    webpackConfig.babel.plugins.push('transform-runtime');

    // Support hmr
    if (env === 'development') {
        webpackConfig.devtool = '#eval';
        webpackConfig.babel.plugins.push(['dva-hmr', {
            entries: [
                './src/index.js'
            ]
        }]);
    }
    else {
        webpackConfig.babel.plugins.push('dev-expression');
    }

    // 尼玛处理了好久！！！！！不懂webpack 胡乱注释
    // 使用css modules 确实非常爽 但是TMD 谁能帮我在使用 CSS Modules的情况下
    // 解决字体文件 包括对百度域名屏蔽的问题 只能舍弃 CSS Modules 来进行解决
    // Support CSS Modules
    // Parse all less files as css module.
    // webpackConfig.module.loaders.forEach(function (loader, index) {
    //     if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
    //         loader.include = /node_modules/;
    //         loader.test = /\.less$/;
    //     }

    //     if (loader.test.toString() === '/\\.module\\.less$/') {
    //         loader.exclude = /node_modules/;
    //         loader.test = /\.less$/;
    //     }

    //     if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
    //         loader.include = /node_modules/;
    //         loader.test = /\.css$/;
    //     }

    //     if (loader.test.toString() === '/\\.module\\.css$/') {
    //         loader.exclude = /node_modules/;
    //         loader.test = /\.css$/;
    //     }

    // });

    // webpackConfig.babel.plugins.push(['import', {
    //     libraryName: 'antd',
    //     style: 'css'
    // }]);

    return webpackConfig;
};
