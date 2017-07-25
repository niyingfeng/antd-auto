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

const User = React.createClass({
    getInitialState() {
        return {
            metas: [],

            modalVisiable: false
        }
    },

    render() {
        let tableConfig = {
            columns: [{
                title: 'UID',
                dataIndex: 'uid',
                type: 'string',
            }, {
                title: '用户名',
                dataIndex: 'uname',
                type: 'string',
            }, {
                title: '姓名',
                dataIndex: 'real_name',
                type: 'string',
            }, {
                title: '邮箱',
                dataIndex: 'email',
                type: 'string',
            }, {
                title: '申请权限',
                dataIndex: 'remarks',
                type: 'string',
            }, {
                title: '操作',
                type: 'operate',
                btns: [{
                    render: (text, item) => {
                        const url = "#userDetail/" + item.uid;
                        return <span>
                                    <a href={url} >权限管理</a>
                                </span>
                    }
                }]
            }],

            resultList: this.state.metas,

            // antd table 的配置字段
            config: {
                pagination: false
            }

        }
        return <div className="user">
            <Tabler {...tableConfig} />
        </div>
    },

    componentDidMount() {

        let that = this;
        // 接口调用数据形式
        Reqwest({
            url: apiConfig.getuserlist,
            data: {},

            type: 'json',
            success: function(data) {
                let list = data.data.map(function(item) {
                    item.key = item.id;

                    return item;
                });

                that.setState({
                    metas: list
                });
            }
        });
    }
});

export default User;