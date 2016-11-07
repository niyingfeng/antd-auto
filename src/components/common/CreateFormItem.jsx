import React from 'react';
import moment from 'moment';
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
        const getFieldDecorator = this.props.getFieldDecorator;
        const formItemLayout = this.props.formItemLayout || {};
        const item = this.props.item || {};
        
        let defaultValue = item.defaultValue || '';

        switch (item.type){
            case 'string':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>

                            {getFieldDecorator(item.name, {rules:item.rules, initialValue:defaultValue})(
                                <Input placeholder={item.placeholder||'' } style={{ width: item.width }} />
                            )}
                        </FormItem>
                break;

            case 'date':
                defaultValue = moment(defaultValue || new Date(), "YYYY-MM-DD hh:mm:ss");

                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>

                            {getFieldDecorator(item.name, { initialValue: defaultValue})(
                                <DatePicker showTime format="YYYY-MM-DD hh:mm:ss" />
                            )}
                        </FormItem>
                break;

            case 'select':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>

                            {getFieldDecorator(item.name, { initialValue: defaultValue })(
                                <Select style={{ width: item.width }} onChange={item.onChange || function(){}}>
                                    {
                                        item.options.map(function(item){
                                            return <Option key={item.value} value={item.value}>{item.text || item.value}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                break;

            case 'cascader':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>

                            {getFieldDecorator(item.name, { initialValue: defaultValue })(
                                <Cascader options={item.options} style={{ width: item.width }} changeOnSelect/>
                            )}
                            
                        </FormItem>
                break;

            case 'radio':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>

                            {getFieldDecorator(item.name, { initialValue: defaultValue })(
                                <RadioGroup>
                                    {
                                        item.options.map(function(item){
                                            return <Radio key={item.value} value={item.value}>{item.text || item.value}</Radio>
                                        })
                                    }
                                </RadioGroup>
                            )}
                        </FormItem>
                break;

            case 'switch':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>

                            {getFieldDecorator(item.name, { initialValue: defaultValue})(
                                <Switch />
                            )}
                        </FormItem>
                break;

            case 'imageUpload':
                defaultValue = this.state.img_url || defaultValue || '';
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <img className="uploadImg" src={defaultValue} />

                            {getFieldDecorator(item.name, { initialValue:defaultValue})(
                                <Input onChange={this.changeImgUrl} />
                            )}

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
