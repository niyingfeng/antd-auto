import React from 'react';
import { Affix, Icon } from 'antd';

import styles from './Header.less';

function Header(props){
    return  <div style={props.style} className={styles.header}>
                <h2>
                    <Icon className={styles.icon} type={props.icon} />
                    {props.title}
                </h2>
                <div className={styles.aver}>
                    <img src={props.aver} />
                    <span>{props.name}</span>
                </div>
            </div>;
};

export default Header;
