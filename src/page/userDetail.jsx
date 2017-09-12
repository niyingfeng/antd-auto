// 具体文档参照 Tinymce
import React from 'react';
import { Component } from 'react';

import Reqwest from 'reqwest';

import {
    Button,
    Modal,
    Form,
    message,
    Input,
    Icon,
    Select,
    Checkbox,
    Cascader
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

import apiConfig from '../config/apiConfig';
import Tabler from '../components/table/Tabler';



class UserDetail extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            real_name: '',
            roles: 0,
            uid: '',

            lists: [],
            moduls: [],

            modalVisiable: false,

            cascaderCate: [],
            manage: false,
            manageList: [],

        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOK = this.handleOK.bind(this);

        this.cascaderChange = this.cascaderChange.bind(this);
        this.manageChange = this.manageChange.bind(this);
    }

    render() {
        let self = this;

        let {
            real_name,
            roles,
            uid,
            lists,
            metas
        } = this.state;

        let tableConfig = {
            columns: [{
                title: '分级名称',
                dataIndex: 'title',
                type: 'string',
            }, {
                title: '权限级别',
                dataIndex: 'authority',
                render: (value) => (value === 7 ? <span>管理员</span> : '')
            }, {
                title: '操作',
                type: 'operate',
                btns: [{
                    text: '删除',
                    callback: function() {}
                }, {
                    text: '管理',
                    callback: function() {}
                }]
            }],

            dataSource: lists,
        };

        let metasConfig = {
            columns: [{
                title: 'ID',
                dataIndex: 'id',
                type: 'string'
            }, {
                title: 'Meta',
                dataIndex: 'metadata',
                type: 'string'
            }, {
                title: '权限',
                type: 'operate',
                btns: [{
                    render: (txt,item) => (
                        <div>
                            <Checkbox onChange={this.manageChange1.bind(this, item)}>编辑权限</Checkbox>
                            <Checkbox onChange={this.manageChange2.bind(this, item)}>审核权限</Checkbox>
                        </div>)
                }]
            }],

            dataSource: metas,
        }

        return <div className="user-detail">
                    {
                        real_name ?
                        <div className="user-detail-role">
                            <span className="real_name">{real_name}</span>

                            <Select defaultValue={roles} style={{ width: 120 }} onChange={this.handleChangeRole}>
                                <Option value="0">新用户</Option>
                                <Option value="1">普通职员</Option>
                                <Option value="7">数据管理员</Option>
                                <Option value="15">产品线管理员</Option>
                            </Select>
                        </div> :
                        ''
                    }

                    <Button type="primary" onClick={this.showModal} style={{marginBottom:'20px'}}>新增权限</Button>
                    
                    <Tabler {...tableConfig} />

                    <Modal
                        visible={this.state.modalVisiable}
                        title="创建与更新"
                        okText="确定"
                        onCancel={this.handleCancel}
                        onOk={this.handleOK}
                        width="1000px"
                        >

                        <Cascader options={this.state.moduls} onChange={this.cascaderChange} placeholder="选择添加权限的分类" style={{width:300,marginBottom:30}}/>
                        <Checkbox  style={{marginLeft:50}} onChange={this.manageChange} >管理权限</Checkbox>

                        {
                            metas
                            ? <Tabler {...metasConfig} />
                            :''
                        }
                    </Modal>
                </div>
    }

    componentDidMount() {

        let that = this;
        // 接口调用数据形式
        Reqwest({
            url: apiConfig.GetUserAcl,
            data: {},

            type: 'json',
            success: function(data) {
                let {
                    real_name,
                    roles,
                    uid,
                    acl
                } = data.data;
                console.log(acl);
                if (typeof(acl) != undefined && acl) {
                    let lists = [];
                    for (let key in acl.udata) {
                        lists.push({
                            ...acl.udata[key],
                            key: key
                        })
                    }

                    that.setState({
                        real_name: real_name,
                        roles: roles,
                        uid: uid,
                        lists: lists
                    });
                }
            }
        });

        // 
        Reqwest({
            url: apiConfig.getmodules,
            data: {},

            type: 'json',
            success: function(data) { Reqwest({
                url: apiConfig.getmodules,
                data: {},

                type: 'json',
                success: function(data) {
                    console.log(data);

                    let moduls = data.data.udata.map(function(item) {
                        return {
                            label: item.name,
                            value: item.id,
                            children: item.list.map(function(i) {
                                return {
                                    label: i.name,
                                    value: i.id,
                                }
                            })
                        }
                    });
                    that.setState({
                        moduls: moduls
                    });
                }
            });
                console.log(data);

                let moduls = data.data.udata.map(function(item) {
                    return {
                        label: item.name,
                        value: item.id,
                        children: item.list.map(function(i) {
                            return {
                                label: i.name,
                                value: i.id,
                            }
                        })
                    }
                });
                that.setState({
                    moduls: moduls
                });
            }
        });
    }

    handleChangeRole(value) {
        console.log(value)
    }

    deleteCate(item) {
        console.log(item)
    }
    manageCate(item) {
        console.log(item)
    }

    showModal() {
        let url = window.location.href.split('?')[0].split('/');
        let uidIndex = url.length - 1;
        console.log(uidIndex);
        this.setState({
            uid: url[uidIndex],
            modalVisiable: true

        });
    }
    handleCancel() {
        this.setState({
            modalVisiable: false
        });
    }
    handleOK(approveInfo) {
        let cate_id = this.state.cascaderCate[1];
        let lists = [];
        let cate = '';
        let title = '';
        Reqwest({
            url: apiConfig.GetUserAcl,
            data: {
                app: 'flyflow',
                uid: this.state.uid
            },
            success: function(data) {
                let udatas = data.data.acl.udata;
                if (udatas) {
                    for (let item in udatas) {
                        lists = lists.concat(udatas[item]['list']);
                    }
                }
                // console.log(lists);
            }
        });

        Reqwest({
            url: apiConfig.getmodules,
            data: {},

            type: 'json',
                success: function (data) {
                    for (let item in data.data.udata) {
                        for (let i in data.data.udata[item]['list']) {
                            if (data.data.udata[item]['list'][i]['id'] == cate_id) {
                                cate =  data.data.udata[item]['list'][i]['code'];
                                title = data.data.udata[item]['list'][i]['name'];
                            }
                        }
                    }

                }
            });

        Reqwest({
            url: apiConfig.approve,
            data: {},
            success: function(data) {

            }
        });
    }

    cascaderChange(value) {
        let that = this;
        this.setState({
            cascaderCate: value
        });

        // 接口调用数据形式
        Reqwest({
            url: apiConfig.getdatainfo,
            data: {
                app: 'flyflow',
                cate_id: value[1]
            },
            type: 'json',
            success: function(data) {
                let list = data.data;
                if (typeof(list) != undefined && list) {
                    list.forEach((item) => {
                        item.key = item.id;
                    });

                    that.setState({
                        metas: list
                    });
                }
            }
        });
    }
    manageChange(e) {
        console.log('2333' + e.target.checked);

        this.setState({
            manage: e.target.checked
        });

    }

    manageChange1(item, e) {
        console.log(item, e)
        // this.setState({
        //     manage: e.target.checked
        // });
    }
    manageChange2(item, e) {
        console.log(item, e)
        // this.setState({
        //     manage: e.target.checked
        // });
    }

}

export default UserDetail;