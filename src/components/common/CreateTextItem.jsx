// 普通数据展现的创建 目前只用于simple object 的数据展现

import React from 'react';
import moment from 'moment';
import { Form, Select, Input, Button, Icon , DatePicker, TimePicker, Radio, Switch, Cascader, Checkbox } from 'antd';
import { Upload, Modal, message } from 'antd';

import BDUploader from './BDUploader';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let CTextItem = React.createClass({
    getInitialState: function() {
        return {
            img_url:''
        };
    },

    render: function() {
        const formItemLayout = this.props.formItemLayout || {};
        const item = this.props.item || {};
        
        if(item.render){
            return  <FormItem
                        label={item.title}
                        key={item.dataIndex}
                        {...formItemLayout}>

                        {item.render(item.value)}
                    </FormItem>
        }else{
            switch (item.type){
                case 'string':
                    return <FormItem
                                label={item.title}
                                key={item.dataIndex}
                                {...formItemLayout}>

                                <span>{item.value}</span>
                            </FormItem>
                    break;
                
                case 'link':
                    return <FormItem
                                label={item.title}
                                key={item.dataIndex}
                                {...formItemLayout}>

                                <a href={item.value} target="_blank">{item.value}</a>

                            </FormItem>
                    break;

                case 'image':
                    return <FormItem
                                label={item.title}
                                key={item.dataIndex}
                                {...formItemLayout}>

                                <span>{item.value}</span><br />
                                <img className="uploadImg" src={item.value} style={{marginTop:"15px"}}/>
                                
                            </FormItem>
                    break;

                default:
                return <span></span>;
                    break;
            }
        }
        
    }
});

export default CTextItem;
