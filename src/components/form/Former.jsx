/**
 * @file CMS平台Fomer组件
 * @author niyingfeng<yingfeng.ni@gmail.com>
 *
 * form 创建工具
 * 自动化生成整体form表单元素
 * 依赖 FormerItem
 *
 * 接受props
 * {
 *      fields array （必需） 表单元素配置列表 说明请看 FormerItem的注释
 *      [
 *          item （必需） 传入构建formitem的配置数据
 *          {
 *              type: string（必需）生成表单元素的类型 包含 string date select cascader radio checkbox switch
 *              label: string（必需）label名称
 *              name: string（必需）表单字段name
 *
 *              rules: （非必需）输入规则
 *              placeholder: （非必需）输入提示文案
 *              defaultValue: （非必需）默认显示值
 *
 *              options: array 选项列表 type为 select 和 radio 时必须参数
 *
 *          }
 *      ]
 *      okCallback function （必需） 为点击确定后 无格式错误之后传递的表单数据回调函数
 *
 *      updateData object （非必需） 若为更新数据 传入该数据对象
 *
 *      layout 非必需 默认horizontal 'horizontal'|'vertical'|'inline'
 *
 *      hasResetBtn true 是否显示重置按钮
 *
 * }
 */

import React, { Component } from 'react';
import {
    Form,
    Button
} from 'antd';

import FormerItem from './FormerItem';

const FormItem = Form.Item;

class Former extends Component {

    handleOK = () => {
        this.props.form.validateFields((err, values) => {
            console.log('Received errors of form: ', err);

            if (!err) {
                console.log('Received values of form: ', values);

                this.props.okCallback(values);
            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const {
            fields = [], updateData = {}, hasResetBtn, layout = 'horizontal', formItemLayout = {}, form
        } = this.props;

        const {
            getFieldDecorator
        } = form;

        const span = formItemLayout.labelCol && formItemLayout.labelCol.span || 0;

        return <div className="f-normal">
                    <Form layout={layout}>
                        {
                            fields.map(function(item){
                                item.defaultValue = updateData[item.name] || item.defaultValue || '';

                                let props = {
                                    item: item,
                                    getFieldDecorator: getFieldDecorator,
                                    formItemLayout: formItemLayout
                                }

                                return <FormerItem key={item.name} {...props}/>
                            })
                        }

                        <FormItem wrapperCol={{ offset: span || 0 }}>
                            {
                                hasResetBtn
                                ? <Button style={{ marginRight: 15 }} onClick={this.handleReset}>重置</Button>
                                : ''
                            }
                            <Button type="primary" htmlType="submit" onClick={this.handleOK}>确定</Button>
                        </FormItem>
                    </Form>
                </div>
    }
}

export default Form.create()(Former);