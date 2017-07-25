import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'

const Main = (props) => {
    
    let Page = props.page;

    return  <div key={props.pageId} className="mainer">
                {
                    props.title ?
                    <h3 className="title">{props.title}</h3>:
                    ''
                }
                <Page params={props.params || ''}  className="item" />
            </div>
}

export default Main;
