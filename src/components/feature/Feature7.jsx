// 纯数据展现情况列表
import React from 'react';
import { Upload, Icon } from 'antd';
import baidubce from 'bce-sdk-js';

import BDUploader from '../component/BDUploader';

const Feature7 = React.createClass({
    getInitialState: function() {
        return {
            img_url:''
        };
    },

    render: function() {
        const self = this;
        return  <div>
                    <h3 className="f-title">{this.props.title}</h3>
                    <input type="text" value={this.state.img_url} />
                    <img src={this.state.img_url} />
                    <BDUploader success={this.uploadSuccess} />
                </div>;
    },

    uploadSuccess: function(url){
        console.log(url)
        this.setState({
            img_url: url
        })
    }
});

export default Feature7;
