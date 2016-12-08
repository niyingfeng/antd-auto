import React from 'react';
import { Affix, Icon } from 'antd';

function Header(props){
    return  <div style={props.style} className="header">
                <h2>
                    <Icon className="icon" type={props.icon} />
                    {props.title}
                </h2>
                <div className="aver">
                    <img src={props.aver} />
                    <span>{props.name}</span>
                </div>
            </div>;
};

export default Header;
