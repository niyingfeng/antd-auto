/**
 * modal 创建工具
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
 *
 *      title string （必须）弹框标题
 *      visible boolean （必须）弹框显示状态
 *      
 *      okCallback function （必需） 为点击确定后 无格式错误之后传递的表单数据回调函数
 *      cancelCallback function （必需） 点击之后 隐藏modal的回调函数
 *      
 *      updateData object （非必需） 若为更新数据 传入该数据对象
 *      
 * }
 */

import React from 'react';
import {
    Form,
    Button,
    Modal
} from 'antd';

const FormItem = Form.Item;

import FormerItem from './FormerItem';

class Modaler extends React.Component {
    handleOK = () => {
        this.props.form.validateFields((err, values) => {
            console.log('Received errors of form: ', err);

            if (!err) {
                console.log('Received values of form: ', values);

                this.props.okCallback(values);
            }
        });
    }

    handleCancel = () => {
        this.props.form.resetFields();
        this.props.cancelCallback();
    }

    render() {
        const {
            fields = [], updateData = {}, form, title, visible
        } = this.props;
        const {
            getFieldDecorator
        } = form;

        return <Modal
                        visible={visible}
                        title={title}
                        okText="确定"
                        onCancel={this.handleCancel}
                        onOk={this.handleOK}>

                    <Form layout="horizontal">
                        { 
                            fields.map(function(item){
                                item.defaultValue = updateData[item.name] || item.defaultValue || '';

                                let props = {
                                    item: item,
                                    getFieldDecorator: getFieldDecorator
                                }

                                return <FormerItem key={item.name} {...props}/>
                            })
                        }
                    </Form>
                </Modal>
    }
}

export default Form.create()(Modaler);