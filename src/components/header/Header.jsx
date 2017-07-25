import React from 'react';
import {
    Icon
} from 'antd';
import {
    Link
} from 'dva/router';

const Header = (props) => {
    return <div style={props.style} className="header">
                <h2>
                    <Icon className="icon" type={props.icon} />
                    {props.title}
                </h2>
                {
                    props.menu ?
                    <div className="head-menu">
                        { 
                            props.menu.map(function(item){
                                return  <Link key={item.key} to={'/'+item.key}>{item.title}</Link>
                            })
                        }
                    </div>:
                    ""
                }
                <div className="aver">
                    <img src={props.aver} />
                    <span>{props.name}</span>
                </div>
            </div>;
};

export default Header;