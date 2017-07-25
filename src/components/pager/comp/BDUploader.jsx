/**
 * 百度图片上传react组件
 * 参数为 success 回调函数
 * <BDUploader success={this.uploadImgSuccess} /> 
 */

// 对于各个项目 重新定义图片上线组件接口 调整回调形式

import React from 'react';
import { Button, Icon, message } from 'antd';
import baidubce from 'bce-sdk-js';

let config = {
    endpoint: 'http://bj.bcebos.com',         //传入Bucket所在区域域名
    credentials: {
        ak: '******',          //您的AccessKey
        sk: '******'           //您的SecretAccessKey
    }
};

let client = new baidubce.BosClient(config);

const createKey = function(ext){
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth()+1;
    month = (month < 10) ? '0' + month: month;

    let day = date.getDate();
    day = (day < 10) ? '0' + day: day;

    return year + '/' + month + '/' + day + '/' + (+new Date())+ '.'+ext;
}

// 百度浏览器特定文件上传组件
let BDUploader = React.createClass({
    getInitialState: function() {
        return {

        };
    },

    render: function() {
        return  <div>
                    <Button type="ghost" onClick={this.openFileInput}>
                        <Icon type="upload" /> 文件上传
                    </Button>
                    <input type="file" ref="fileInput" style={{display:"none"}} onChange={this.uploadImg} />
                </div>;
    },
    
    openFileInput: function(e){
        this.refs.fileInput.click();
    },
    uploadImg: function(e){
        let self = this;
        
        let file = e.target.files[0]; // 获取要上传的文件
        let ext = file.name.split(/\./g).pop();

        let key = createKey(ext); // 保存到bos时的key，您可更改，默认以文件名作为key
        let mimeType = baidubce.MimeType.guess(ext);

        client.putObjectFromBlob("mbrowser", key, file, {
            'Content-Type': /^text\//.test(mimeType)? mimeType+'; charset=UTF-8': mimeType
        }).then(function (res) {
            // 上传完成，添加您的代码
            let imgUrl = config.endpoint+'/v1/mbrowser/'+key;
            console.log('上传成功', imgUrl);
            self.props.success&&self.props.success(imgUrl);
        }).catch(function (err) {
            // 上传失败，添加您的代码
            self.props.error&&self.props.error(error);
        });
    }
});

export default BDUploader;
