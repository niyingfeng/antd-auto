/**
 * @file CMS平台Header组件
 * @author niyingfeng<yingfeng.ni@gmail.com>
 *
 * 顶部导航条配置组件
 * 包含 配置平台名称 顶部导航栏 用户信息
 *
 * 接受props
 * {
 *      title    String  标题
 *      icon     String  标题图标
 *      style    Object  自定义样式
 *      menu     Array   header顶部的sider列表 仅支持单级
 * }
 *
 */

import React from 'react';

import {
    Icon
} from 'antd';

import {
    Link
} from 'dva/router';

const Header = (props) => {
    return  (<div style={props.style} className="header">
                <h2>
                    <Icon className="icon" type={props.icon} />
                    {props.title}
                </h2>
                {
                    props.menu ?
                    <div className="head-menu">
                        {
                            props.menu.map(function(item){
                                return  <Link
                                            key={item.key}
                                            to={'/'+item.key}
                                            className={item.key === props.selectedKey ?'selected':''}>
                                            {item.title}
                                        </Link>
                            })
                        }
                    </div>:
                    ""
                }
                <div className="aver">
                    <img src={props.aver} />
                    <span>{props.name}</span>
                </div>
            </div>);
};

export default Header;