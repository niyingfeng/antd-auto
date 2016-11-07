import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'

import styles from './Main.less';

const Main = (props) => {
    
    let Feature = props.feature;

    return  <div key={props.featureId} className={styles.main}>
                <h3 className={styles.title}>{props.title}</h3>
                <Feature params={props.params || ''}  className={styles.item} />
            </div>
}

export default Main;
