/**
 * form 创建工具
 * 自动化生成整体form表单元素
 * 包括 创建，更新，查询，普通表单等
 * 依赖 CreateFormItem
 */

import React from 'react';
import { Form, Button } from 'antd';

import CFormItem from './CreateFormItem';

let Former = React.createClass({
    getInitialState: function() {
        return {

        };
    },

    render: function() {
        const self = this;
        const fields = this.props.fields;
        const updateItem = this.props.updateItem || {};
        
        // 详情见antd form 文档
        const { getFieldDecorator } = this.props.form;

        return  <div className="f-normal">
                    <Form inline>
                        { 
                            fields.map(function(item){
                                item.defaultValue = updateItem[item.name]||item.defaultValue||'';
                                //return self.dealConfigUType(item, defaultValue);
                                return <CFormItem key={item.name} getFieldDecorator={getFieldDecorator} item={item}/>
                            })
                        }
                    </Form>
                </div>
    },

    handleUpdate: function(){
        this.props.submit(this.props.form.getFieldsValue());
    },

    handleReset: function() {
        this.props.form.resetFields();
    }
});
Former = Form.create()(Former);

export default Former;

