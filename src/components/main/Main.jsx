import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'

const Main = (props) => {
    
    let Feature = props.feature;

    return  <div key={props.featureId} className="mainer">
                <h3 className="title">{props.title}</h3>
                <Feature params={props.params || ''}  className="item" />
            </div>
}

export default Main;
