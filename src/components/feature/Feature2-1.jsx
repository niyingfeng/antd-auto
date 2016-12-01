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
            name: 'stype',
            label: '项目类型Select',
            type: 'select',
            options:[{
                text: '选项一',
                value: 'one'
            },{
                text: '选项二',
                value: 'two'
            },{
                text: '选项三',
                value: 'three'
            }],
            width: 150
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

const Feature = FeatureSetConfig(simple_conf);

export default Feature;
