/**
 * @file CMS平台 无权限页面展现
 * @author niyingfeng<yingfeng.ni@gmail.com>
 *
 * 目前仅接受 loginUrl 参数 作为展现页面的登入点击目标
 *
 * 接受 props
 * {
 * 		loginUrl	String 	作为展现页面的登入点击目标
 * }
 **/

import React from 'react';

const Login = (props) => {
    return  (<div className="Login">
                您暂无权限处理该系统工作，请先
                <a href={props.loginUrl}>登录</a>
                或者找相关人员申请权限。
            </div>);
}

export default Login;
