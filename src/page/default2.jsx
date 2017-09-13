// 纯数据展现情况列表
import React, { Component } from 'react';
import Reqwest from 'reqwest';

import Pager from '../components/pager/Pager';

// 纯配置页面生成器
const table_conf = {
    type: 'tableList', // tableList graphList simpleObject complexObject

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    initData: function(callback){
        Reqwest({
            url: '/api/example2',
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
            width: 50
        },{
            title: 'NID',     // table header 文案
            dataIndex: 'nid', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            width: 180
        }, {
            title: '新闻标题',
            dataIndex: 'title',
            type: 'string',

        },{
            title: '落地页链接',
            render: (text, item) => ( <span><a href={item.link} target="_blank">落地页链接</a></span>),
            width: 80
        },{
            title: '最后修改时间',
            dataIndex: 'update_time',
            type: 'string',
            width: 150
        },{
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            width: 150,
            btns: [{
                text: 'console输出',
                callback: function(item){
                    console.log(item)
                }
            }], 
        }
    ]

};

class Default extends Component {
	render() {
		return (
			<div className="item">
				<h2>顶部导航页面示例2</h2>
				<Pager style={{marginTop: '20px'}} {...table_conf}/>
			</div>
			);
	}
}

export default Default;
