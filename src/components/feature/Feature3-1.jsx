// 具体文档参照 Tinymce
import React from 'react';
import TinyMCE from 'react-tinymce';
import Reqwest from 'reqwest';

// import BDUploader from '../common/BDUploader';
// import CFormItem from '../common/CreateFormItem';

import { Form, Input, Button } from 'antd';

// const FormItem = Form.Item;

let Feature = React.createClass({
    getInitialState: function(){
        return {
            value: ''
        }
    },
    render: function() {
        let config = {
            content: this.state.value,
            config: {
                height: '250',
                plugins: [
                    "advlist autolink lists charmap print preview hr anchor pagebreak spellchecker",
                    "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime  nonbreaking",
                    "save table contextmenu directionality emoticons paste textcolor"
                ],
                toolbar: "insertfile undo redo | styleselect fontselect fontsizeselect| bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      | print preview fullpage | forecolor backcolor", 
            },
            onChange: this.handleEditorChange
        };

        // let fields = [
        //     {
        //         name: 'id',
        //         label: '唯一标识',
        //         type: 'string',
        //         placeholder: '请输入标示名称'
        //     },{
        //         name: 'date',
        //         label: '开始时间',
        //         type: 'date'
        //     },{
        //         name: 'stype',
        //         label: '项目类型',
        //         type: 'select',
        //         defaultValue: 'one',
        //         options:[{
        //             text: '选项一',
        //             value: 'one'
        //         },{
        //             text: '选项二',
        //             value: 'two'
        //         },{
        //             text: '选项三',
        //             value: 'three'
        //         }]
        //     },{
        //         name: 'rtype',
        //         label: '项目类型',
        //         type: 'radio',
        //         defaultValue: 'one',
        //         options:[{
        //             text: '选项一',
        //             value: 'one'
        //         },{
        //             text: '选项二',
        //             value: 'two'
        //         },{
        //             text: '选项三',
        //             value: 'three'
        //         }]
        //     },{
        //         name: 'ischange',
        //         label: '是否过滤',
        //         type: 'switch',
        //         defaultValue: false
        //     }

        // ];

        // const { getFieldDecorator } = this.props.form;
        // const updateItem = {};

        // return  <div style={{margin:'20px 30px'}}>
        //     <Form inline>
        //         <FormItem
        //             label="目标转码链接"
        //             key="target-url">
        //             <Input style={{width:'400px'}} placeholder="请输入需要转码的链接"/>    
        //         </FormItem>
                
        //         <FormItem>
        //             <Button type="primary" icon="swap" onClick={this.changeNews}>转码</Button>
        //         </FormItem>
        //         <FormItem>
        //             <Button type="button" icon="save" onClick={this.getFromData}>保存内容</Button>
        //         </FormItem>
        //     </Form>

        //     <Form inline style={{marginTop:'20px'}}>
        //         { 
        //             fields.map(function(item){
        //                 item.defaultValue = updateItem[item.name]||item.defaultValue||'';
        //                 //return self.dealConfigUType(item, defaultValue);
        //                 return <CFormItem key={item.name} getFieldDecorator={getFieldDecorator} item={item}/>
        //             })
        //         }
        //     </Form>

        //     <div style={{marginTop:'20px'}}>
        //         <BDUploader success={this.uploadImgSuccess} />
        //         <p>{this.state.imgUrl}</p>
        //     </div>
        //     <p>{this.states.value}</p>
        //     <TinyMCE className="editor" {...config} />
        // </div>

        return  <div style={{margin:'20px 30px'}}>
                    <p style={{margin:'20px 0'}}>{this.state.value}</p>
                    <TinyMCE className="editor" {...config} />
                </div>
    },

    // getFromData: function(){
    //     console.log(this.props.form.getFieldsValue())
    // },
    
    // uploadImgSuccess: function(url){
    //     this.setState({
    //         imgUrl:url
    //     });
    // },
    handleEditorChange: function(e){
        this.setState({
            value: this.getTinymceContent()
        });
    },
    setTinymceContent: function(value){
        tinymce.get(0).setContent(value);
    },
    getTinymceContent: function(){
        return tinymce.get(0).getContent();
    }
});

export default Feature;