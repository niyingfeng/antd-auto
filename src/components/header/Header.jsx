import React from 'react';
import { Affix, Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const HeadMenuItemCreat  = (items) => {
        return items.map(function(item){
            return  <Link key={item.key} to={'/'+item.key}>{item.title}</Link>
        });
};

function Header(props){
    return  <div style={props.style} className="header">
                <h2>
                    <Icon className="icon" type={props.icon} />
                    {props.title}
                </h2>
                {
                    props.menu ?
                    <div className="head-menu">
                        { 
                            HeadMenuItemCreat(props.menu)
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
