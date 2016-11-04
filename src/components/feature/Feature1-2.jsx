// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from '../component/FeatureSetConfig';

import Immutable from 'immutable';
import Reqwest from 'reqwest';

import testData from '../common/test-data';

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

    operate:[
        {
            text: '确认数据',
            style: {
                'marginRight': '30px'
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
    ]
}

const Feature1 = FeatureSetConfig(simple_conf);

export default Feature1;
