// 具体文档参照 Tinymce
import React from 'react';
import Reqwest from 'reqwest';
import apiConfig from '../config/apiConfig';

import {
    Button,
    Modal,
    Form,
    message,
    Input,
    Icon
} from 'antd';
const FormItem = Form.Item;

import Tabler from '../components/table/Tabler';

const Meta = React.createClass({
    getInitialState() {
        return {
            metas: [],

            modalVisiable: false
        }
    },

    render() {
        let tableConfig = {
            columns: [{
                title: '名称',
                dataIndex: 'title',
                type: 'string',
                width: '15%',

                editable: true,
                onChange: (txt) => {
                    console.log(txt);
                }
            }, {
                title: '标识',
                dataIndex: 'key',
                type: 'string',
                width: '15%',

                editable: true,
                onChange: (txt) => {
                    console.log(txt);
                }
            }, {
                title: '运算符',
                dataIndex: 'operator',
                type: 'multipleSelect',
                width: '30%',

                editable: true,
                options: [">", ">=", "<", "<=", "==", "!=", "in", "notin", "inmc", "isset", "notisset", "v>", "v<", "v=", "v>=", "v<=", "match"],
                onChange: (list) => {
                    console.log(list);
                }
            }, {
                title: '保留字',
                dataIndex: 'value',
                type: 'tagsSelect',
                width: '20%',

                editable: true,
                onChange: (list) => {
                    console.log(list);
                }
            }, {
                title: '操作',
                type: 'operate',
                btns: [{
                    text: '删除',
                    callback: function(item) {
                        console.log(item)
                    }
                }]
            }],

            resultList: this.state.metas,

            // antd table 的配置字段
            config: {
                pagination: false
            }

        }
        return <div className="meta">
            <Tabler {...tableConfig} />
        </div>
    },

    componentDidMount() {

        let that = this;
        // 接口调用数据形式
        Reqwest({
            url: apiConfig.getMetaDataOptions,
            data: {},

            type: 'json',
            success: function(data) {
                let list = data.data;

                that.setState({
                    metas: list
                });
            }
        });
    }
});

export default Meta;