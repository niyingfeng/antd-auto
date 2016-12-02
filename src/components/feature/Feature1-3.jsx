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
            }], // 可选
        }
    ],

    // 可设置的查询字段
    RType:[
        {
            name: 'id',
            label: '唯一标识',
            type: 'string',
            placeholder: '请输入标示名称'
        },{
            name: 'date',
            label: '项目开始时间',
            type: 'date'
        },{
            name: 'stype',
            label: '项目类型Select',
            type: 'select',
            defaultValue: 'one',
            options:[{
                text: '选项一',
                value: 'one'
            },{
                text: '选项二',
                value: 'two'
            },{
                text: '选项三',
                value: 'three'
            }]
        },{
            name: 'rtype',
            label: '项目类型Radio',
            type: 'radio',
            defaultValue: 'one',
            options:[{
                text: '选项一',
                value: 'one'
            },{
                text: '选项二',
                value: 'two'
            },{
                text: '选项三',
                value: 'three'
            }]
        },{
            name: 'ischange',
            label: '是否过滤',
            type: 'switch',
            defaultValue: false
        }

    ],
    // 查询操作回调
    Retrieve: function(data, callback){

        console.log(data);

        Reqwest({
            url: '/api/example2',
            data: {},

            type: 'json',
            success: function (data) {
                let list = data.data;
                let i = 0;
                list.forEach(function(ele) {
                    ele.key = i++;
                });

                // 查询成功 传入列表数据
                callback(list);
            }
        });
    }

};

const Feature = FeatureSetConfig(conf);

export default Feature;
