// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from '../component/FeatureSetConfig';

import Immutable from 'immutable';
import Reqwest from 'reqwest';

import testData from '../common/test-data';

// 增加(Create)、重新取得数据(Retrieve)、更新(Update)和删除(Delete)
const table_conf = {
    
    type: 'tableList', // tableList graphList simpleObject complexObject 

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    initData: function(callback){
        // 接口调用数据形式
        /*
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
        */
       
       // 模拟数据
       setTimeout(function(){
            let list = testData.tableList;
            list.forEach(function(ele) {
                ele.key = ele.docid;
            });
            callback(list);
       }, 1000)
    },
        
    // table 列表展现配置
    // {
    //      title       table显示表题
    //      dataIndex   显示数据中的key
    //      type        展现形式 （string image link）
    //      render      自定义展现形式 参数 （当前数据，当前对象数据）
    //      sort        是否需要排序功能
    //      width       自定义该列宽度 否则等分
    // }
    // 
    columns: [
        {
            title: 'DOCID',
            dataIndex: 'docid',
            type: 'string'
        }, {
            title: '标题',
            dataIndex: 'title',
            type: 'string'
        }, {
            title: '链接',
            dataIndex: 'link',
            type: 'link',
            render: (text, item) => (<span><a href={text}>{item.title}</a></span>)   // 可自定义
        }
    ]

};

const simple_conf = {
    
    type: 'simpleObject',

    initData: function(callback){
       // 模拟数据
       setTimeout(function(){
            let object = testData.simpleObject;
            object.key = object.docid;

            callback(object);
       }, 1000)
    },

    operate:[
        {
            text: '确认数据',
            style: {
                'marginRight': '30px',
                'marginLeft': '80px'
            },
            callback: function(item){
                console.log(item)
            }
        }, {
            text: '展示数据',
            callback: function(item){
                console.log(item)
            }
        }
    ],

    UType:[
        {
            name: 'docid',
            label: '唯一标识',
            type: 'string',
            placeholder: '请输入标示名称'
        },{
            name: 'title',
            label: '标题',
            type: 'string',
            placeholder: '请输入标示名称'
        },{
            name: 'link',
            label: '链接',
            type: 'string'
        },{
            name: 'date',
            label: '日期',
            type: 'date'
        },{
            name: 'img',
            label: '图片',
            type: 'imageUpload'
        }
    ]
}

const Feature1 = FeatureSetConfig(simple_conf);

export default Feature1;
