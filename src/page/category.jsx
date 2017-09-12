// 具体文档参照 Tinymce
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
import Modaler from '../components/form/Modaler';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categorys: [],
            selectedCateIndex: 0,
            modalVisiable: false
        }

        this.clickLargeCate = this.clickLargeCate.bind(this);
        this.saveCate = this.saveCate.bind(this);
        this.hideModal = this.hideModal.bind(this);

    }

    render() {
        let columns1 = [
            {
                title: '类别名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '操作',
                type: 'operate', // 操作的类型必须为 operate
                render: (text, item) => (<span>
                                                <a href="javascript:void 0;" onClick={this.changeCate.bind(this, {item: item})}>编辑</a>
                                                <span className="ant-divider" />
                                                <a href="javascript:void 0;" onClick={this.deleteCate.bind(this, {parent_id: 0, cate_id: item.id})}>删除</a>
                                            </span>)

            }
        ];
        let columns2 = [
            {
                title: '类别名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '类别标识',
                dataIndex: 'code',
                key: 'code',
            }, {
                title: '操作',
                type: 'operate', // 操作的类型必须为 operate
                render: (text, item) => (<span>
                                                <a href="javascript:void 0;" onClick={this.changeCate.bind(this, {pid: this.state.categorys[this.state.selectedCateIndex].id, item: item})}>编辑</a>
                                                <span className="ant-divider" />
                                                <a href="javascript:void 0;" onClick={this.deleteCate.bind(this, {parent_id: this.state.categorys[this.state.selectedCateIndex].id, cate_id: item.id})}>删除</a>
                                            </span>)

            }
        ];

        let modalConfig = {
            fields: [{
                name: 'name',
                label: '分类名称',
                type: 'string',
                placeholder: '请输入分类名称',
                rules: [{
                    required: true,
                    min: 1,
                    message: '用户名至少为 1 个字符'
                }]
            }, {
                name: 'cate',
                label: '分类标记',
                type: 'string',
                placeholder: '请输入分类标记'
            }, {
                name: 'inner_data',
                label: '是否关联内部接口',
                type: 'switch'
            }],

            title: '添加与修改分类：',
            visible: this.state.modalVisible,
            okCallback: this.saveCate,
            cancelCallback: this.hideModal,

            updateData: this.changeInfo
        };

        if (this.state.categorys.length === 0) {
            return <div className="category"></div>
        } else {
            // 更具id 获取二级类别数据(item)=>(return item.id === this.state.currentLargeCate)
            let litterdata = this.state.categorys[this.state.selectedCateIndex].list;
            return <div className="category">
                        <Modaler {...modalConfig}/>
                        <div className="left">
                            <Button type="primary" onClick={this.createCate.bind(this, {pid:0, depth:0})} style={{marginBottom:'20px'}}>新增</Button>
                            <Table columns={columns1} onRowClick={this.clickLargeCate} pagination={{ pageSize: 50 }} dataSource={this.state.categorys} />
                        </div>

                        <div className="right">
                            <Button type="primary"  onClick={this.createCate.bind(this, {pid:this.state.categorys[this.state.selectedCateIndex].id, depth:1})} style={{marginBottom:'20px'}}>新增</Button>
                            <Table columns={columns2} pagination={{ pageSize: 30 }} dataSource={litterdata} />
                        </div>
                    </div>
        }
    }

    componentDidMount() {

        let that = this;
        // 接口调用数据形式
        Reqwest({
            url: apiConfig.getcatelist,
            data: {},

            type: 'json',
            success: function(data) {
                let list = data.data;
                list.forEach(function(ele) {
                    ele.key = ele.id;

                    ele.list.forEach(function(ele) {
                        ele.key = ele.id;
                    });
                });

                that.setState({
                    categorys: list,
                    currentLargeCate: list[0].id
                });
            }
        });
    }

    // 点击大列表展现 对应小列表
    clickLargeCate(record, index) {
        this.setState({
            selectedCateIndex: index
        })
    }

    // 跟新分类
    changeCate(data) {
        let {
            item
        } = data;

        this.changeInfo = {
            app: "flyflow",
            id: item.id,
            name: item.name,
            cate: item.code,
            inner_data: item.inner_data || 0,
            pid: data.pid || 0,
            depth: data.depth
        };

        this.setState({
            modalVisible: true
        });

        console.log(item, this.changeInfo)
    }

    // 创建分类
    createCate(data) {
        this.changeInfo = {
            app: "flyflow",
            id: '',
            pid: data.pid || 0,
            depth: data.depth
        }

        this.setState({
            modalVisible: true
        });
    }

    saveCate(data) {
        console.log(data, "+++f+++" ,this.changeInfo);
        Reqwest({
            url: apiConfig.saveCate,
            data: {
                app: 'flyflow',
                name: data.name || this.changeInfo.name,
                cate: data.cate || this.changeInfo.cate,
                inner_data: data.inner_data || this.changeInfo.inner_data,
                id: this.changeInfo.id,
                pid: this.changeInfo.pid || data.pid,
                depth: this.changeInfo.depth || data.depth
            },
            type: 'json',
            success: function(data) {
                // 模拟请求删除成功的回调

                // window.location.reload();
            }
        });
        message.info('操作成功');
        setTimeout(() => {
            this.setState({
                modalVisible: false
            });
        }, 5000);
        //window.location.reload();
    }

    deleteCate(data) {
        confirm({
            title: '确定删除该分类?',
            onOk() {
                Reqwest({
                    url: apiConfig.delCate,
                    data: {
                        ...data
                    },

                    type: 'json',
                    success: function(data) {
                        let list = data.data;
                        if (list) {
                            message.info("删除成功");
                            window.location.reload();
                        } else {
                            message.info(data.error);
                        }
                    }
                });
            }
        });
    }

    hideModal() {
        this.setState({
            modalVisible: false
        });
    }
};

export default Category;