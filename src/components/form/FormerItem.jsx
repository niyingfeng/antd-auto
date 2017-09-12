/**
 * @file CMS平台Fomer item组件
 * @author niyingfeng<yingfeng.ni@gmail.com>
 *
 * 表单独立项 用于对于表单字段的创建
 * 接受props
 * {
 *      getFieldDecorator（必需） 上层form的getFieldDecorator 以供创建item
 *      item （必需） 传入构建formitem的配置数据
 *      {
 *          type: string（必需）生成表单元素的类型 包含 string date select cascader radio checkbox switch
 *          label: string（必需）label名称
 *          name: string（必需）表单字段name
 *
 *          rules: （非必需）输入规则
 *          placeholder: （非必需）输入提示文案
 *          defaultValue: （非必需）默认显示值
 *
 *          options: array 选项列表 type为 select 和 radio 时必须参数
 *
 *      }
 *      formItemLayout: （非必需）FormItem的布局
 * }
 */

import React from 'react';

import {
    Form,
    Select,
    Input,
    DatePicker,
    Radio,
    Switch,
    Cascader,
    Checkbox
} from 'antd';

import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

// 对于使用默认的时间戳
const DefaultTime = new Date();

const FormerItem = (props) => {

    let {
        getFieldDecorator,
        formItemLayout = {},
        item
    } = props;
    let {
        defaultValue = ''
    } = item;

    switch (item.type) {
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
            defaultValue = moment(defaultValue || DefaultTime, "YYYY-MM-DD hh:mm:ss");

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

        case 'checkbox':
            return <FormItem
                        label={item.label}
                        key={item.name}
                        {...formItemLayout}>

                        {getFieldDecorator(item.name, { initialValue: defaultValue })(
                            <Checkbox.Group options={item.options} />
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

        default:
            return '';
            break;
    }
}

export default FormerItem;