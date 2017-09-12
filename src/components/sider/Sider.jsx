/**
 * @file CMS平台Sider组件
 * @author niyingfeng<yingfeng.ni@gmail.com>
 *
 * 主功能展现模块
 *
 * 接受props
 * {
 *     menu     Array   左侧栏sider列表 支持多层级
 *     openKeys Array   默认展开的sider区
 *     selectedKey  String  默认打开的功能区
 *     style    Object  自定义样式
 * }
 *
 */

import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const MenuItemCreat  = (items) => {

        return items.map((item) => {
            if(item.items){
                let title = (
                    <span>
                        {
                            item.icon
                            ? (<Icon type={item.icon} />)
                            : ''
                        }
                        <span>{item.title}</span>
                    </span>
                );

                return  <Menu.SubMenu key={item.key} title={title}>
                            {
                                MenuItemCreat(item.items)
                            }
                        </Menu.SubMenu>
            }else{

                return  <Menu.Item key={item.key}>
                            <Link to={'/'+item.key}>{item.title}</Link>
                        </Menu.Item>
            }
        });
};

const Sider = (props) => {

    return  (<div className="sider" style={props.style}>
               <Menu defaultOpenKeys={props.openKeys}
                    selectedKeys={[props.selectedKey]}
                    mode="inline">
                    {
                        MenuItemCreat(props.menu)
                    }
                </Menu>
            </div>);
};

export default Sider;
