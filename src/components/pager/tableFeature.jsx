// 纯数据展现情况列表
import React, { Component } from 'react';

import { Table, Input, message } from 'antd';

// 搜索查询栏form 创建新item-form 更新form
import UForm from './comp/UpdateForm';
import CForm from './comp/CreateForm';
import RForm from './comp/RetrieveForm';

const renderFunc = (type) => {
    switch (type) {
        case 'link':
            return (text) => (
                        <span>
                            <a href={text}>{text}</a>
                        </span>
                        );
            break;

        case 'image':
            return (url) => (
                        <span>
                            <img src={url} />
                        </span>
                        );
            break;

        default:
            return;
    }
}

// 依赖 props 生成react 组件函数
class TableFeature extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            columns: this.handleColumns(props.columns),
            resultList: [],
            loading: true,

            updateFromShow: false,
            updateFromItem: {},

            total: 0,
            pageSize: 10
        }
    }

    componentDidMount() {
        const { pageData, initData } = this.props;
        // 处理接口分页的逻辑
        if(pageData){
            this.getpageData(1);
        }else{ // 处理 前端分页的逻辑
            initData((list) => {
                this.setState({
                    loading: false,
                    resultList: list
                });
            });
        }
    }

    render() {

        const { pageData, RType, CType, UType } = this.props;

        let table;
        if(pageData){
            const pagination = {
                total: this.state.total,
                pageSize: this.state.pageSize,
                onChange: this.getpageData
            }

            table = <Table dataSource={this.state.resultList} columns={this.state.columns} loading={this.state.loading} pagination={pagination} bordered/>;
        }else{
            table = <Table dataSource={this.state.resultList} columns={this.state.columns} loading={this.state.loading} bordered/>;
        }

        return  <div className={this.props.className} style={this.props.style}>
                    <RForm RType={RType} submit={this.handleRetrieve}/>
                    <CForm CType={CType} submit={this.handleCreate}/>
                    <UForm UType={UType} submit={this.handleUpdate} isShow={this.state.updateFromShow} updateItem={this.state.updateFromItem} hideForm={this.hideUpdateForm}/>
                    {table}
                </div>
    }

    // 预处理配置显示中的 colums 数据 用于anted的table配置
    handleColumns = (lists) => {
        const self = this;

        let columns = [];
        lists.forEach((item) => {
            let column = {
                title: item.title,
                dataIndex: item.dataIndex,
                key: item.dataIndex,
                width: item.width
            }

            if( item.type === 'operate' ){
                // 兼容单一形式与数组形式
                let btns = Array.isArray(item.btns) ? item.btns : [item.btns];

                // 处理表单 操作 栏目以及回调函数
                column.render = item.render || function(txt, record){
                    return <span>
                            {
                                btns.map(function(btn,i) {
                                    if( btn.text ){
                                        return  (
                                            <span key={i}>
                                                <a href="javascript:void 0;" onClick={self.operateCallbacks.bind(self, record, btn)}>{btn.text}</a>
                                                {i!==btns.length-1?<span className="ant-divider"></span>:''}
                                            </span>
                                        );
                                    }else if( btn.render ){
                                        return (
                                            <span key={i}>
                                                {btn.render(txt, record)}
                                                {i!==btns.length-1?<span className="ant-divider"></span>:''}
                                            </span>
                                        );
                                    }

                                })
                            }
                            </span>
                };
            } else if( !item.dataIndex ) {
                item.dataIndex = 'NORMAL_INDEX' + (Math.random() * 1000 | 0);
                column.render = item.render || renderFunc(item.type);
            } else{
                column.render = item.render || renderFunc(item.type) || ((text) => (<span>{text}</span>));
            }

            if(item.sort){
                column.sorter = item.sorter || ((a, b) => a[item.dataIndex] - b[item.dataIndex]);
            }
            columns.push(column);

        });

        return columns;
    }

    handleCreate = (info) => {
        const self = this;
        const { Create, initData } = this.props;

        Create.Create(info, function(item){
            // 初级接口的坑
            if(!item){
                initData.initData(function(list){
                    self.setState({
                        loading: false,
                        resultList: list
                    });
                });
                return;
            }

            let lists = self.state.resultList;
            lists.unshift(item);

            self.setState({
                loading: false,
                resultList: lists
            });
        });
    }

    handleUpdate = (info) => {
        const self = this;
        let result = {
            ...this.state.resultList
        }

        let infoN = {
            ...this.state.updateFromItem,
            ...info
        }

        this.props.Update(infoN, function(item){
            const resultList = result.map(function(v, i){
                if(v.key === item.key){
                    return item;
                }else{
                    return v;
                }
            });
            message.success('更新成功');

            self.setState({
                loading: false,
                updateFromShow: false,
                resultList: resultList
            });
        });
    }
    hideUpdateForm = () => {
        this.setState({
            updateFromShow: false,
            updateFromItem: {}
        });
    }

    // 搜索更新处理
    handleRetrieve = (info) => {
        const self = this;
        this.setState({
            loading: true
        });

        this.props.Retrieve(info, function(list){
            self.setState({
                loading: false,
                resultList: list
            });
        });
    }

    // table 操作列回调处理
    operateCallbacks = (item, btn) => {
        const self = this;

        if(btn.type){

            let resultList;
            let type = btn.type;
            let itemI = { ...item };
            let result = [ ...this.state.resultList ];

            // table 操作栏目通用设定为 更新与删除 两项
            if(type === 'update'){
                this.setState({
                    updateFromShow: true,
                    updateFromItem: itemI
                });
            }else if(type === 'delete'){
                this.setState({
                    loading: true
                });

                this.props.Delete(itemI, function(){
                    resultList = result.filter(function(v, i){
                        if(v.key !== itemI.key){
                            return true;
                        }
                    });
                    message.success('删除成功');

                    self.setState({
                        loading: false,
                        resultList: resultList
                    });
                });
            }

        }else if(btn.callback){
            btn.callback(item);
        }
    }

    getpageData = (num) => {

        this.setState({
            loading: true
        });

        this.props.pageData(num, (list, info) => {
            this.setState({
                loading: false,
                resultList: list,
                total: info.total,
                pageSize: info.pageSize||10,
            });
        });

    }
}


export default TableFeature;
