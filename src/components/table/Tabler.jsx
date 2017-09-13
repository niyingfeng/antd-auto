/**
 * form 创建工具
 * 自动化生成整体table元素
 *
 * 接受props
 * {
 *      columns array 必需  table列信息配置
 *      [
 *          item 必需  传入构建formitem的配置数据
 *          {   // 非编辑元素
 *              title string 必需        table header 文案
 *              dataIndex string 必需    数据对象内的属性，也做react vdom 的key
 *              type string 必需 link image  operate   table 内显示的类型
 *              sort  boolean 非必需  是否需要排序
 *              width  number 非必需  自定义列宽 默认自适应
 *
 *              自定义tablecell的单格渲染组件
 *              render: (text, item) => ( <span>
 *                                          <a href={text}>{item.name}</a>
 *                                      </span>)
 *          
 *          },{ // 可编辑元素
 *              title string 必需        table header 文案
 *              dataIndex string 必需    数据对象内的属性，也做react vdom 的key
 *              type string 必需 link image  operate   table 内显示的类型
 *              sort  boolean 非必需  是否需要排序
 *              width  number 必需  可编辑情况下 为了在切换编辑状态不影响列宽度 建议提供数值或者百分比
 *              
 *              editable boolean 非必需 目前仅支持type为string的 可编辑状态
 *              onChange function 非必需 若为可编辑 该回调函数则为必须来处理编辑之后返回数据的回调函数
 *
 *              options array 非必需 若type为select类型并且为可编辑 则该字段为必须字段
 *              
 *          },{
 *              // 操作的类型必须为 operate
 *              // 变可以使用btns 数组形式
 *              title: '操作',
 *              type: 'operate',    
 *              width: 120,
 *              btns: [{
 *                      text: '展示',
 *                      callback: function(item){
 *                          console.log(item)
 *                      }
 *                  }, {
 *                      render: (text, item) => (<CopyClipboard title='复制链接' type='link' data={item.url} />)
 *                  }
 *              }]
 *          }
 *      ]
 *      
 * }
 */


import React from 'react';
import {
    Table,
    Checkbox,
    Select
} from 'antd';

const CheckboxGroup = Checkbox.Group;

import EditCellInput from './EditCellInput';
import EditCellSelect from './EditCellSelect';

class Tabler extends React.Component {

    state = {
        loading: false,

        // total: 0,
        // pageSize: 10
    }

    // columns 非编辑模式下类型对应的通用render
    renderFunc = {
        link: (text) => (<span>
                            <a href={text}>{text}</a>
                        </span>),

        image: (url) => (<span>
                            <img src={url} />
                        </span>),

        checkbox: (list) => {
            return <CheckboxGroup options={list} defaultValue={list} disabled />
        },

        multipleSelect: (list) => {
            return <Select mode="multiple" defaultValue={list} disabled />
        }
    }

    // 预处理配置显示中的 colums 数据 用于anted的table配置
    dealConfigColumns = (lists) => {
        const self = this;

        let columns = [];
        lists.forEach((item) => {
            let column = {
                title: item.title,
                dataIndex: item.dataIndex || 'NORMAL_INDEX',
                // key: item.dataIndex || 'NORMAL_INDEX',
                width: item.width
            }

            // 处理item 的类型 特殊化处理operate 视为操作项 创建btn与callback
            if (item.type === 'operate') {
                // 兼容单一形式与数组形式
                let btns = Array.isArray(item.btns) ? item.btns : [item.btns];

                // 处理表单 操作 栏目以及回调函数
                column.render = item.render || function(txt, record) {
                    return <span>
                            {
                                btns.map(function(btn,i) {
                                    if( btn.text ){
                                        return  (
                                            <span key={i}>
                                                <a href="javascript:void 0;" onClick={btn.callback.bind(self, record, btn)}>{btn.text}</a>
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
            } else if (item.editable) { // 处理可编辑table cell 的情况

                switch (item.type) {
                    case 'string':
                        column.render = (txt, record) => {
                            return <EditCellInput value={txt} onChange={item.onChange} />;
                        }
                        break;

                    case 'select':
                        column.render = (txt, record) => {
                            return <EditCellSelect values={list} options={item.options} onChange={item.onChange} />;
                        }
                        break;

                    case 'multipleSelect':
                        column.render = (list, record) => {
                            return <EditCellSelect mode="multiple" values={list} options={item.options} onChange={item.onChange} />;
                        }
                        break;

                    case 'tagsSelect':
                        column.render = (list, record) => {
                            return <EditCellSelect mode="tags" values={list} options={item.options} onChange={item.onChange} />;
                        }
                        break;

                    default:
                        break;
                }
            }

            // 处理非编辑状态下的单元格rander方法
            column.render = column.render || item.render || self.renderFunc[item.type] || ((text) => (<span>{text}</span>));

            if (item.sort) {
                column.sorter = item.sorter || ((a, b) => a[item.dataIndex] - b[item.dataIndex]);
            }

            columns.push(column);
        });

        return columns;
    }

    componentWillMount() {
        this.columns = this.dealConfigColumns(this.props.columns);
    }

    render() {

        let table;
        // if(config.pageData){
        //     const pagination = {
        //         total: this.state.total,
        //         pageSize: this.state.pageSize,
        //         onChange: function(num){
        //             this.setState({
        //                 loading: true
        //             });
        //             this.getpageData(num);
        //         }.bind(this)
        //     }

        //     table = <Table dataSource={this.state.resultList} columns={this.state.columns} loading={this.state.loading} pagination={pagination} bordered/>;
        // }else{
        table = <Table dataSource={this.props.resultList} columns={this.columns} loading={this.state.loading} {...this.props.config} bordered/>;
        // }

        return <div className={this.props.className ? this.props.className + ' tabler' : 'tabler'}>
                    {table}
                </div>
    }
};

export default Tabler;