import React from 'react';
import { Form, Modal, message } from 'antd';

import CFormItem from './CreateFormItem';


let UForm = React.createClass({
    getInitialState: function() {
        return {

        };
    },

    render: function() {
        const self = this;
        const UType = this.props.UType;
        const updateItem = this.props.updateItem;
        
        // 详情见antd form 文档
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        return  UType ?
                <div className="f-update">
                    <Modal title="更新对象" visible={this.props.isShow} onOk={this.handleUpdate} onCancel={this.hideModal}>
                        <Form horizontal form={this.props.form}>
                            { 
                                UType.map(function(item){
                                    item.defaultValue = updateItem[item.name]||'';
                                    //return self.dealConfigUType(item, defaultValue);
                                    return <CFormItem key={item.name} getFieldProps={getFieldProps} formItemLayout={formItemLayout} item={item}/>
                                })
                            }
                        </Form>
                    </Modal>
                </div>:
                <div></div>
    },

    handleUpdate: function(){
        this.props.submit(this.props.form.getFieldsValue());
    },

    handleReset: function() {
        this.props.form.resetFields();
    },

    hideModal: function() {
        this.props.hideForm();
        this.handleReset();
    }
});
UForm = Form.create()(UForm);

export default UForm;
