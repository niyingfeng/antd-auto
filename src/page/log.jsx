// 纯数据展现情况列表
import React from 'react';
import Reqwest from 'reqwest';

import apiConfig from '../config/apiConfig';
import Pager from '../components/pager/Pager';

// 增加(Create)、重新取得数据(Retrieve)、更新(Update)和删除(Delete)
const table_conf = {
    
    type: 'tableList', // tableList graphList simpleObject complexObject 

    // 接口分页处理
    // callback 回传列表数据 第二参数接受 总数与每页数目
    // 需要手动添加唯一id key
    pageData: function(num, callback){
        Reqwest({
            url: apiConfig.getlog,
            data: {
                pn:num,
                pageSize: 20
            },

            type: 'json',
            success: function (data) {
                let list = data.data.logs;
                list.forEach(function(ele) {
                    ele.key = ele.id;
                });
                callback(list, {
                    total: data.data.page_info.total,
                    pageSize: 20
                });
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
            title: 'uname',     // table header 文案
            dataIndex: 'uname', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            width: 150
        },{
            title: '用户名',     // table header 文案
            dataIndex: 'real_name', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            width: 150
        },{
            title: '日志级别',     // table header 文案
            dataIndex: 'level', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            width: 100
        },{
            title: '操作行为',     // table header 文案
            dataIndex: 'action', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            width: 100
        },{
            title: '信息',     // table header 文案
            dataIndex: 'data', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
        },{
            title: '操作时间',     // table header 文案
            dataIndex: 'create_time', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            width: 150
        },
    ]

};

const Log = Pager(table_conf);

export default Log;
