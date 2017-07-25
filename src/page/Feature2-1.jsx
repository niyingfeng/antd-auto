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


    // {
    //      title       显示表题
    //      dataIndex   显示数据中的key
    //      type        展现形式 （string image link）
    //      render      自定义展现形式 参数 （当前数据，当前对象数据）
    // }

    columns:[
        {
            title: '唯一标识',
            dataIndex: 'docid',
            type: 'string'
        },{
            title: '标题',
            dataIndex: 'title',
            type: 'string'
        },{
            title: '链接',
            dataIndex: 'link',
            type: 'link'
            // render: (text) => ( <span>
            //                 <a href={text} target="_blank">{text}</a>
            //             </span>)
        },{
            title: '日期',
            dataIndex: 'date',
            type: 'string'
        },{
            title: '图片',
            dataIndex: 'image',
            type: 'image'
        }
    ],

    operate:[
        {
            text: '编辑数据',
            style: {
                'marginLeft': '80px'
            },
            callback: function(item){
                console.log(item);
                location.hash = '#Feature2-2';
            }
        }
    ]
}

const Feature = FeatureSetConfig(simple_conf);

export default Feature;
