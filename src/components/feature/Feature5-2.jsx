// 具体文档参照 Tinymce
import React from 'react';
import Reqwest from 'reqwest';

import BDUploader from '../common/BDUploader';
import CFormItem from '../common/CreateFormItem';

import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

let Feature = React.createClass({getInitialState: function(){
    return {
            imgUrl: '',
            valueString: ''
        }
    },
    render: function() {

        let fields = [
            {
                name: 'string',
                label: '唯一标识',
                type: 'string',
                placeholder: '请输入标示名称'
            },{
                name: 'date',
                label: '开始时间',
                type: 'date'
            },{
                name: 'select',
                label: '项目类型',
                type: 'select',
                defaultValue: 'one',
                options:[{
                    text: '选项一',
                    value: 'one'
                },{
                    text: '选项二',
                    value: 'two'
                },{
                    text: '选项三',
                    value: 'three'
                }]
            },{
                name: 'cascader',
                label: '项目类型',
                type: 'cascader',
                options:[{
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [{
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [{
                            value: 'xihu',
                            label: 'West Lake',
                        }],
                    }],
                },{
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [{
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [{
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        }],
                    }],
                }]
            },{
                name: 'checkbox',
                label: '项目类型',
                type: 'checkbox',
                defaultValue: ['Apple'],
                options:[
                    { label: 'Apple', value: 'Apple' },
                    { label: 'Pear', value: 'Pear' },
                    { label: 'Orange', value: 'Orange' }]
            },{
                name: 'radio',
                label: '项目类型',
                type: 'radio',
                defaultValue: 'one',
                options:[{
                    text: '选项一',
                    value: 'one'
                },{
                    text: '选项二',
                    value: 'two'
                },{
                    text: '选项三',
                    value: 'three'
                }]
            },{
                name: 'switch',
                label: '是否过滤',
                type: 'switch',
                defaultValue: false
            }
        ];

        const { getFieldDecorator } = this.props.form;

        return  <div style={{margin:'20px 30px'}}>
                    <Form inline>
                        <FormItem
                            label="目标转码链接"
                            key="target-url">
                            <Input style={{width:'400px'}} placeholder="请输入需要转码的链接"/>    
                        </FormItem>
                    </Form>

                    <Form inline style={{marginTop:'20px'}}>
                        { 
                            fields.map(function(item){
                                item.defaultValue = item.defaultValue||'';
                                return <CFormItem key={item.name} getFieldDecorator={getFieldDecorator} item={item}/>
                            })
                        }
                    </Form>

                    <div style={{marginTop:'20px'}}>
                        <BDUploader success={this.uploadImgSuccess} />
                        <p>{this.state.imgUrl}</p>
                    </div>

                    <FormItem style={{marginTop: '20px'}}>
                        <Button type="button" icon="save" onClick={this.getFromData}>展现数据</Button>
                    </FormItem>

                    <p style={{marginTop: '20px'}}>{this.state.valueString}</p>
                </div>
    },

    getFromData: function(){
        console.log(this.props.form.getFieldsValue());

        this.setState({
            valueString:JSON.stringify(this.props.form.getFieldsValue())
        });
    },
    
    uploadImgSuccess: function(url){
        this.setState({
            imgUrl:url
        });
    },
});

Feature = Form.create()(Feature);
export default Feature;