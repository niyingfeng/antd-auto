// 含有可操作 table 栏的数据展示
import React from 'react';
import { Component } from 'react';

import Reqwest from 'reqwest';

import {
    Table,
    Button,
    Modal,
    Form,
    message,
    Input,
    Icon,
    Upload
} from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;


import apiConfig from '../config/apiConfig';
import util from '../utils/util';

class BigSet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            updateIsShow: false,
            deleteIsShow: false,
            selectedSetname: ''
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.addSet = this.addSet.bind(this);
    }

    render() {
        let columns = [{
            title: 'KEY',
            dataIndex: 'key',
        }, {
            title: '数量',
            dataIndex: 'count',
        }, {
            title: '操作',
            type: 'operate', // 操作的类型必须为 operate
            render: (text, item) => (
                <span>
                        <a href={'/udata/mis/exportbigset?key='+item.key+'&app=flyflow'} target="_blank">导出查看</a>
                        <span className="ant-divider" />
                        <a href="javascript:void 0;"  onClick={this.changeSet.bind(this, item.key)}>修改</a>
                        <span className="ant-divider" />
                        <a href="javascript:void 0;" onClick={this.deleteSet.bind(this, item.key)}>删除</a>
                    </span>
            )

        }];

        let formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            },
        };

        return <div className="category">
                    <Button type="primary" onClick={this.addSet} style={{marginBottom: '15px'}}>新增</Button>
                    <Table columns={columns} dataSource={this.state.list} bordered/>
                    <Modal
                        visible={this.state.updateIsShow}
                        title="创建与更新"
                        okText="确定"
                        onCancel={this.handleCancel}
                        onOk={this.handleUpdate}
                        >
                        <Form layout="vertical">
                            <FormItem
                                label="BigSet的名称"
                                key='key'
                                {...formItemLayout}>
                                {
                                    this.state.selectedSetname
                                    ? <Input placeholder='' key={this.state.selectedSetname} value={this.state.selectedSetname}  ref='name' readOnly/>
                                    : <Input placeholder='' ref='name' />
                                }
                            </FormItem>

                            <FormItem
                                label="上传BigSet文件"
                                key='file'
                                {...formItemLayout}>
                                <Input placeholder='' type='file' ref='file' style={{border:'none'}}/>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
    }

    componentDidMount() {

        let that = this;
        // 接口调用数据形式
        // 接口调用数据形式
        Reqwest({
            url: apiConfig.getbigsetlist,
            data: {},

            type: 'json',
            success: function(data) {
                let list = data.data;
                that.setState({
                    list: list
                });
            }
        });
    }

    saveFormRef(form) {
        this.form = form;
    }

    handleUpdate() {
        let name = this.refs.name.refs.input.value;
        let file = this.refs.file.refs.input.files;

        if (!name) {
            message.warn('请填写大集合名称');
            return;
        } else if (file.length === 0) {
            message.warn('请上传集合文件');
            return;
        }

        util.uploadFiles(apiConfig.uploadBigset, 'file', this.refs.file.refs.input.files[0], {
            param: {
                app: 'flyflow',
                key: name
            }
        });
        message.info('创建成功');
        setTimeout(() => {
            this.setState({
                updateIsShow: false
            });
        }, 5000);
        window.location.reload();
    }
    handleCancel() {
        this.setState({
            updateIsShow: false
        });
    }

    addSet() {
        this.setState({
            selectedSetname: '',
            updateIsShow: true,
        });
    }

    changeSet(key) {
        console.log(key);
        this.setState({
            selectedSetname: key,
            updateIsShow: true,
        });
    }

    deleteSet(key) {
        confirm({
            title: '确定删除该集合?',
            onOk() {
                Reqwest({
                    url: apiConfig.delbigset,
                    data: {
                        app: 'flyflow',
                        key: key
                    },
                    type: 'json',
                    success: function(data) {
                        // 模拟请求删除成功的回调
                        window.location.reload();
                    }
                });
            }
        })
    }
}

export default Form.create()(BigSet);