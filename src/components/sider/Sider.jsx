import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const MenuItemCreat  = (items) => {
        return items.map(function(item){
            if(item.items){
                let title = <span>{item.icon ? (<Icon type={item.icon} />): ''}<span>{item.title}</span></span>;

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

function Sider(props){
    return  <div className="sider" style={props.style}>
               <Menu defaultOpenKeys={props.openKeys}
                    selectedKeys={[props.selectedKey]}
                    mode="inline">
                    { 
                        MenuItemCreat(props.menu)
                    }

                </Menu>
            </div>;
};

export default Sider;
