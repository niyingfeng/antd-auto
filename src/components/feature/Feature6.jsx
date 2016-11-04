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
    Create: function(data, callback){
        let dataI = Immutable.fromJS({
            type: 'entry_list'
        }).merge({id: data.key});
        
        // ... 操作添加数据的请求
        console.log(dataI.toJS());

        let item = {
            docid: (Math.random()*10000000000)|0,
            title: '院依法对原省安监局局长陈炎生决定逮捕',
            link: 'sdfghjcvbnmertfheiuwfhsdh'
        }
        
        // 需要设置key
        item.key = item.docid;

        // 模拟请求创建成功的回调
        setTimeout(function(){
            callback(item);
        }, 1000);
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
    Update:function(data, callback){
        console.log(data);
    },
    Retrieve: function(data, callback){
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
    // 创建项目所需的字段
    // rules 规范可见 https://github.com/yiminghe/async-validator
    CType:[
        {
            name: 'id',
            label: '唯一标识',
            type: 'string',
            placeholder: '请输入标示名称',
            rules: [{ required: true, min: 5, message: '用户名至少为 5 个字符' }]
        },{
            name: 'id2',
            label: '唯一标识',
            type: 'string',
            placeholder: '请输入标示名称',
            rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }]
        },{
            name: 'date',
            label: '项目开始时间',
            type: 'date',
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
            type: 'switch'
        },{
            name: 'image',
            label: '背景图片',
            type: 'imageUpload'
        }

    ],
    // 更新项目所需的字段
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
            width: 120,
            btns: [{
                text: '更新',
                type: 'update'
            },{
                text: '删除',
                type: 'delete'
            },{
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

    uploadfile: function(data){
        
    }

};

const Feature2 = FeatureSetConfig(conf);

export default Feature2;
