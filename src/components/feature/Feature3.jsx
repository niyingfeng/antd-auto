// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../component/FeatureSetConfig';

import Immutable from 'immutable';
//https://github.com/ded/reqwest
import Reqwest from 'reqwest';


const conf = {
    
    // 初始化页面的数据 回调函数传入 items 列表
    initData: function(callback){

        let data = {
            type: 'entry_list',
            num: 20,
            ua: 'bd_1_1_1_5-5-0-0_1',
            cuid: '00000000000000000000000000000000%7C0000000000000000',
            channel: 'AA_0',
            dir: 'up'
        }

        Reqwest({
            url: 'http://uil.cbs.baidu.com/rssfeed/fetch?fn=?',
            data: data,
            type: 'jsonp',
            jsonpCallback: 'fn',
            success: function (data) {
                let lists = data.data.stream_data;
                
                // 必须要向数据中 添加唯一的 key
                lists.forEach(function(ele) {
                    ele.key = ele.docid;
                });

                callback(lists);
            }
        });
           
    },
    
    // 功能模块需要时 添加 CRUD 4方法
    Create: function(){},
    Delete: function(data, callback){
    
        let dataI = Immutable.fromJS({
            type: 'entry_list'
        }).merge({id: data.key});
        
        // ... 操作删除请求
        console.log(dataI.toJS());
        
        // 模拟请求删除成功的回调
        setTimeout(function(){
            callback();
        }, 1000)
           
    },
    Update:function(){},

    
    Retrieve: function(data, callback){

        console.log(data);
        let dataI = Immutable.fromJS({
            type: 'entry_list',
            num: 20,
            ua: 'bd_1_1_1_5-5-0-0_1',
            cuid: '00000000000000000000000000000000%7C0000000000000000',
            channel: 'AA_0',
            dir: 'up'
        }).merge(data);

        Reqwest({
            url: 'http://uil.cbs.baidu.com/rssfeed/fetch?fn=?',
            data: dataI.toJS(),
            type: 'jsonp',
            jsonpCallback: 'fn',
            success: function (data) {
                let lists = data.data.stream_data;
                // 必须要向数据中 添加唯一的 key
                lists.forEach(function(ele) {
                    ele.key = ele.docid;
                });

                callback(lists);
            }
        });
    },

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

    columns: [
        {
            title: 'DOCID',     // table header 文案
            dataIndex: 'docid', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            sort: true,         // 是否需要排序
            width:200
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

const Feature2 = FeatureSetConfig(conf);

export default Feature2;
