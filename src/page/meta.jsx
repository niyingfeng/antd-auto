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
    Popconfirm
} from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
let updateMetas = '';

import apiConfig from '../config/apiConfig';
import Tabler from '../components/table/Tabler';

class Meta extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            metas: [],
            modalVisiable: false,
            selectValue: ''
        };
        this.addMeta = this.addMeta.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.saveMeta = this.saveMeta.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

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
                options: ['>', '>=', '<', '<=', '==', '!=', 'in', 'notin', 'inmc', 'isset', 'notisset', 'v>', 'v<', 'v=', 'v>=', 'v<=', 'match'],
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
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    );
                }
            }],

            dataSource: this.state.metas,

            // antd table 的配置字段
            config: {
                pagination: false
            }

        };


        let formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        }
            return <div className='meta'>
            <Button type='primary' onClick={this.addMeta} style={{marginBottom: '15px'}}>新增</Button>
                <Button type='primary' onClick={this.saveMeta} style={{marginBottom: '15px', marginLeft: '30px'}}>保存</Button>
                <Tabler {...tableConfig} />
            <Modal
                visible={this.state.modalVisiable}
                title='新增meta'
                okText='确定'
                onCancel={this.handleCancel}
                onOk={this.handleAdd}
                >
                <Form layout='vertical'>
                    <FormItem
                        label='名称'
                        {...formItemLayout}>
                        <Input placeholder='' ref='name' />
                    </FormItem>
                    <FormItem
                        label='key'
                        {...formItemLayout}>
                        <Input placeholder='' ref='key' />
                    </FormItem>
                    <FormItem
                        label='操作'
                        {...formItemLayout} >
                        <Select
                            mode='multiple'
                            style={{width: '100%'}}
                            ref='operation'
                            placeholder='选择操作'
                            onChange={this.handleSelect}>
                            <Option value='>'>></Option>
                            <Option value='>='>>=</Option>
                            <Option value='<'>&lt;</Option>
                            <Option value='<='>&lt;=</Option>
                            <Option value='=='>==</Option>
                            <Option value='!='>==</Option>
                            <Option value='in'>in</Option>
                            <Option value='notin'>notin</Option>
                            <Option value='inmc'>inmc</Option>
                            <Option value='isset'>isset</Option>
                            <Option value='notisset'>notisset</Option>
                            <Option value='v>'>v></Option>
                            <Option value='v<'>v&lt;</Option>
                            <Option value='v='>==</Option>
                            <Option value='v>='>v>=</Option>
                            <Option value='v<='>v&lt;=</Option>
                            <Option value='match'>match</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label='保留字'
                        {...formItemLayout}>
                        <Input placeholder='' ref='remind' />
                    </FormItem>
                </Form>
            </Modal>

        </div>
    }

    componentDidMount() {

        let that = this;
        // 接口调用数据形式
        Reqwest({
            url: apiConfig.getMetaDataOptions,
            data: {},

            type: 'json',
            success: function(data) {
                let list = data.data;
                console.log(list);

                that.setState({
                    metas: list
                });
            }
        });
    }
    addMeta() {
        this.setState({
            modalVisiable: true
        })
    }
    saveMeta() {
        confirm({
            title: '确定保存Meta配置?',
            onOk() {
                Reqwest({
                    url: apiConfig.saveMeta,
                    data: {
                        app: 'flyflow',
                        data: updateMetas || JSON.stringify(this.state.metas)
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
    handleAdd() {
        const metas = [...this.state.metas];
        const addMetas = [{
            key: this.refs.key.refs.input.value,
            title: this.refs.name.refs.input.value,
            operator: this.state.selectValue,
            value: this.refs.remind.refs.input.value.split(',')
        }];
        const metasNew = JSON.stringify(metas.concat(addMetas));
        updateMetas =  metasNew;

        this.setState({
            modalVisiable: false
        });
        console.log(updateMetas);

    }
    handleCancel() {
        this.setState({
            modalVisiable: false
        });
    }
    handleSelect(value) {
        this.setState({
            selectValue: value
        });
        console.log(this.state.selectValue);
    }
    onDelete(key) {
        const meta = [...this.state.metas];
        this.setState({
            metas: meta.filter(item => item.key !== key)
        });
        updateMetas = JSON.stringify(meta.filter(item => item.key !== key));
        console.log(updateMetas);
    }
}

export default Meta;