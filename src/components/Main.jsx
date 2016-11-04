import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router'

import config from '../common/config';

const Main = React.createClass({
    render: function(){
        const id = this.props.featureId;
        const Data = config.main.components[id];
        const Feature = Data.component;
        const title = Data.title;

        return  config.userInfo.permission?
                <div key={id}>
                    <h3 className="f-title">{title}</h3>
                    <Feature params={this.props.params || ''}/>
                </div>:
                <div className="unpermission">
                    您暂无权限处理该系统工作，请先
                    <a href={config.userInfo.loginUrl}>登录</a>
                    或者找相关人员申请权限。
                </div>
    }
});

export default Main;
