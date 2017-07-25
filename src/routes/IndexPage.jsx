import React, { Componnet } from 'react';
import ReactDom from 'react-dom';

import { connect } from 'dva';
import { Link } from 'dva/router';

// 平台配置总文件
import platConfig from '../config/platConfig';

import Header from '../components/header/Header';
import Sider from '../components/sider/Sider';
import Main from '../components/main/Main';

import Login from '../components/login/Login';

//const components = platConfig.main.components;
const headerInfo = {
    ...platConfig.header,
    name: platConfig.userInfo.name,
    aver: platConfig.userInfo.aver
}

const siderInfo = { ...platConfig.sider };

const mainInfo = {
    style: platConfig.sider.style
}

const IndexInfo = {
    permission: platConfig.userInfo.permission,
    loginUrl: platConfig.userInfo.loginUrl
}

const App = (props) => {

        let pageId = props.params.PageId || platConfig.sider.selectedKey;

        let pageInfo = {
            pageId: pageId,
            params: props.params.params,

            page: platConfig.main.components[pageId].component,
            title: platConfig.main.components[pageId].title,
        }
        
        if(IndexInfo.permission){
            return  <div>
                        <Header {...headerInfo}/>
                        <Sider {...siderInfo} selectedKey={pageId}/>
                        <Main {...mainInfo} {...pageInfo}/>
                    </div>
        }else{
            return  <div className="nopermission">
                        <Login loginUrl={IndexInfo.loginUrl}/>
                    </div>
        }
}

export default App;
