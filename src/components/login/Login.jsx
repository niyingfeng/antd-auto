import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Login(props){
    return  <div className="Login">
                您暂无权限处理该系统工作，请先
                <a href={props.loginUrl}>登录</a>
                或者找相关人员申请权限。
            </div>;
};

export default Login;
