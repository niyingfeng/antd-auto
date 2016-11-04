import React from 'react';
import { Form, Select, Input, Button, Icon , DatePicker, TimePicker, Radio, Switch, Cascader} from 'antd';
import { Upload, Modal, message } from 'antd';

import BDUploader from './BDUploader';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let CFormItem = React.createClass({
    getInitialState: function() {
        return {
            img_url:''
        };
    },

    render: function() {
        const getFieldProps = this.props.getFieldProps;
        const formItemLayout = this.props.formItemLayout || {};
        const item = this.props.item || {};
        
        let defaultValue = item.defaultValue || '';

        switch (item.type){
            case 'string':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <Input placeholder={item.placeholder||'' } style={{ width: item.width }}
                            {...getFieldProps(item.name, {rules:item.rules, initialValue:defaultValue})} />    
                        </FormItem>
                break;

            case 'date':
                defaultValue = defaultValue ?
                    (/(\d){4}(\-(\d){2}){2}\s((\d){2}(\:)){2}(\d){2}/.test(defaultValue)?defaultValue:new Date(defaultValue)):
                    new Date();
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps(item.name, { initialValue: defaultValue})} />  
                        </FormItem>
                break;

            case 'select':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <Select  {...getFieldProps(item.name, { initialValue: defaultValue })} style={{ width: item.width }} onChange={item.onChange || function(){}}>
                                {
                                    item.options.map(function(item){
                                        return <Option key={item.value} value={item.value}>{item.text || item.value}</Option>
                                    })
                                }
                            </Select>
                        </FormItem>
                break;

            case 'cascader':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <Cascader  {...getFieldProps(item.name, { initialValue: defaultValue })} options={item.options} style={{ width: item.width }} changeOnSelect/>
                        </FormItem>
                break;

            case 'radio':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <RadioGroup {...getFieldProps(item.name, { initialValue: defaultValue })}>
                                {
                                    item.options.map(function(item){
                                        return <Radio key={item.value} value={item.value}>{item.text || item.value}</Radio>
                                    })
                                }
                            </RadioGroup>
                        </FormItem>
                break;

            case 'switch':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <Switch {...getFieldProps(item.name, { initialValue: defaultValue})} />
                        </FormItem>
                break;

            case 'imageUpload':
                defaultValue = this.state.img_url || defaultValue || '';
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <img className="uploadImg" src={defaultValue} />
                            <Input
                                {...getFieldProps(item.name, { initialValue:defaultValue})}
                                onChange={this.changeImgUrl} /> 
                            <BDUploader success={this.uploadSuccess} />
                        </FormItem>

                break;

            default:
                return '';
                break;
        }
    },
    uploadSuccess: function(url){
        console.log(url)
        this.setState({
            img_url: url
        })
    },
    changeImgUrl: function(e){
        console.log(e.target.value)
        this.setState({
            img_url: e.target.value
        })
    }
});

export default CFormItem;
