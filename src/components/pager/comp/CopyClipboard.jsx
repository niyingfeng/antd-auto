/**
 * 复制拷贝按钮
 */
import React from 'react';
import { Button, message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

// 百度浏览器特定文件上传组件
const CopyClipboard = (props) => {
    return  <CopyToClipboard text={props.data}
                onCopy={() => message.success('复制成功')}>
                {
                    props.type === 'link'?
                        <a>{props.title}</a>:
                        <button>{props.title}</button>

                }
            </CopyToClipboard>;
}

export default CopyClipboard;
