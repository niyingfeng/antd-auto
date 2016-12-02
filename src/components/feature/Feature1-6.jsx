// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';
import Reqwest from 'reqwest';


const conf = {
    
    type: 'tableList', 
    
    // 初始化页面的数据 回调函数传入 items 列表
    initData: function(callback){

        Reqwest({
            url: '/api/example',
            data: {},

            type: 'json',
            success: function (data) {
                let list = data.data;
                let i = 0;
                list.forEach(function(ele) {
                    ele.key = i++;
                });
                callback(list);
            }
        });
           
    },
    
    // table 表单字段
    columns: [
        {
            title: 'KEY',     // table header 文案
            dataIndex: 'key', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            sort: true,         // 是否需要排序
        }, {
            title: '标题',
            dataIndex: 'title',
            type: 'string'
        }, {
            title: '链接',
            dataIndex: 'link',
            type: 'link'
        }, {
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            btns: [{
                text: 'console输出',
                callback: function(item){
                    console.log(item)
                }
            },{
                text: '删除',
                type: 'delete'
            }], // 可选
        }
    ],
    // 删除操作
    Delete: function(data, callback){
        // 删除操作
        console.log(data);

        Reqwest({
            url: '/api/delete',
            data: {},

            type: 'json',
            success: function (data) {
                // 模拟请求删除成功的回调
                callback();
            }
        });
           
    }

};

const Feature = FeatureSetConfig(conf);

export default Feature;
