// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../component/FeatureSetConfig';

import Immutable from 'immutable';
//https://github.com/ded/reqwest
import Reqwest from 'reqwest';


const conf = {
    
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

    columns: [
        {
            title: 'DOCID',     // table header 文案
            dataIndex: 'docid', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            sort: true,         // 是否需要排序
            width:200           // 列宽 可选 不填为默认均分
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
                    alert(JSON.stringify(item));
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
    ]

};

const Feature2 = FeatureSetConfig(conf);

export default Feature2;
