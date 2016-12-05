// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';
import Reqwest from 'reqwest';

const simple_conf = {
    
    type: 'simpleObject',

    initData: function(callback){
       // 模拟数据
       Reqwest({
            url: '/api/example3',
            data: {},

            type: 'json',
            success: function (data) {
                let object = data.data;
                object.key = object.docid;

                callback(object);
            }
        });
    },

    Update:function(data, callback){
        console.log(data);
        callback(data);
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
            name: 'image',
            label: '图片',
            type: 'imageUpload'
        }
    ],

    operate:[
        {
            text: '确认修改',
            type: 'update',
            style: {
                'marginRight': '30px',
                'marginLeft': '80px'
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
