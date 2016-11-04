/**
 * 复制拷贝按钮
 */

import React from 'react';
import { Button, message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

// 百度浏览器特定文件上传组件
let CopyClipboard = React.createClass({
    getInitialState: function() {
        return {

        };
    },

    render: function() {
        return  <CopyToClipboard text={this.props.data}
                    onCopy={() => message.success('复制成功')}>
                    {
                        this.props.type === 'link'?
                            <a>{this.props.title}</a>:
                            <button>{this.props.title}</button>

                    }
                </CopyToClipboard>;
    }
});

export default CopyClipboard;
