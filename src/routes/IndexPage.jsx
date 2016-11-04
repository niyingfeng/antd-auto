import React, { Componnet } from 'react';
import ReactDom from 'react-dom';

import { connect } from 'dva';
import { Link } from 'dva/router';

import config from '../config';
import styles from './IndexPage.less';

import Header from '../components/header/Header';
import Sider from '../components/sider/Sider';
// import Main from './js/view/Main';

//const components = config.main.components;
const headerInfo = {
    title: config.header.title,
    icon: config.header.icon,
    style: config.header.style,

    name: config.userInfo.name,
    aver: config.userInfo.aver
}

const siderInfo = {
    menuList: config.sider.menu,
    menuStyle: config.sider.style,
    openKeys: config.sider.openKeys
}

const App = React.createClass({
    getDefaultProps: function(){
    },
    getInitialState: function(){
        return {
            featureId: this.props.params.FeatureId || config.sider.selectedKey,
            params:  this.props.params.params,
        }
    },
    componentWillMount: function(){},

    render: function(){
        return  <div>
                    <Header {...headerInfo}/>
                    <Sider {...siderInfo}/>
                </div>
    },

    componentDidMount: function(){
    },
    componentWillReceiveProps: function(newProps){
        // this.setState({
        //     featureId: newProps.params.FeatureId,
        //     params:  newProps.params.params,
        // });
    },
    shouldComponentUpdate: function(){
        //return true;
    },
    componentWillUpdate: function(){},
    componentDidUpdate: function(){},
    componentWillUnmount: function(){}
});

export default connect()(App);
