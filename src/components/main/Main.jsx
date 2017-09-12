/**
 * @file CMS平台Main组件
 * @author niyingfeng<yingfeng.ni@gmail.com>
 *
 * 主功能展现模块
 *
 * 接受props
 * {
 *      page     Object  更具url中的关键key获取到../pager中的对应组件
 *      pageId   String  页面key值
 *      title    String  页面标题
 *      params   String  url的key值之后的透传数据 可自定义
 * }
 *
 */

import React from 'react';

const Main = (props) => {
    const Page = props.page;

    return  <div key={props.pageId} className="mainer">
                {
                    props.title ?
                    <h3 className="title">{props.title}</h3>:
                    ''
                }
                <Page params={props.params || ''}  className="item" />
            </div>
}

export default Main;
