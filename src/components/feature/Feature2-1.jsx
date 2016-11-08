// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';
import Reqwest from 'reqwest';


const conf = {
    
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
    
    // 功能模块需要时 添加 CRUD 4方法
    Create: function(){},
    Delete: function(data, callback){

        console.log(data);
        
        // 模拟请求删除成功的回调
        setTimeout(function(){
            callback();
        }, 1000)
           
    },
    Update:function(){},

    
    Retrieve: function(data, callback){

        console.log(data);

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

    // 可设置的查询字段 
    // RType 查询字段
    // CType 创建字段
    // UType 更新字段
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


    columns: [
        {
            title: 'KEY',     // table header 文案
            dataIndex: 'key', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            sort: true,         // 是否需要排序
            width: 100
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
            width: 80,
            btns: [{
                text: '删除',
                type: 'delete'
            }, {
                text: '展示',
                callback: function(item){
                    console.log(item)
                }
            }], // 可选
            
            // 对应btns 的回调函数 
            // item为操作的单一数据对象  
            // callback 为组件的回调函数，将处理之后的数据回传 删除则传undefined
            // callbacks: [function(item, callback){
            //     item.docid = 0;
            //     callback(item, 'update');
            // },function(item, callback){
            //     callback(item, 'delete');
            // }]
        }
    ],



};

const Feature = FeatureSetConfig(conf);

export default Feature;
