// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';
import Reqwest from 'reqwest';

//import testData from '../common/test-data';

// 增加(Create)、重新取得数据(Retrieve)、更新(Update)和删除(Delete)
const table_conf = {
    
    type: 'tableList', // tableList graphList simpleObject complexObject 

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    initData: function(callback){
        // 接口调用数据形式
        Reqwest({
            url: '/api/example',
            data: {},

            type: 'json',
            success: function (data) {
                let list = data.data;
                list.forEach(function(ele) {
                    ele.key = ele.id;
                });
                callback(list);
            }
        });
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
    // table 列表头标题
    columns: [
        {
            title: 'ID',     // table header 文案
            dataIndex: 'id', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            sort: true,         // 是否需要排序
        },{
            title: 'DOCID',     // table header 文案
            dataIndex: 'docid', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            sort: true,         // 是否需要排序
        }, {
            title: '来源',
            dataIndex: 'source',
            type: 'string'
        },{
            title: '标题',
            dataIndex: 'title',
            type: 'string'
        }, {
            title: '链接',
            dataIndex: 'link',
            type: 'link',
            render: (text) => ( <span>
                                    <a href={text} target="_blank">链接</a>
                                </span>),
        },{
            title: '日期',
            dataIndex: 'date',
            type: 'string',
        },
        {
            title: '图片',
            dataIndex: 'image',
            type: 'image'
        }
    ]

};

const Feature = FeatureSetConfig(table_conf);

export default Feature;
