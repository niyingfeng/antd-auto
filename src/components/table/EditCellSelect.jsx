/**
 * 可编辑table string 元素 来自 antd 示例
 *
 * 接受props
 * {
 *      value string 必需 当前修改的默认值
 *      onChange function 必须 修改之后执行的回调函数
 * }
 */

import React from 'react';
import {
    Select,
    Icon
} from 'antd';

const Option = Select.Option;

class EditCellInput extends React.Component {
    state = {
        values: this.props.values,
        editable: false,
    }
    handleChange = (values) => {
        this.setState({
            values
        });
    }
    check = () => {
        this.setState({
            editable: false
        });
        if (this.props.onChange) {
            this.props.onChange(this.state.values);
        }
    }
    edit = () => {
        this.setState({
            editable: true
        });
    }

    componentWillMount() {
        this.childrenOption = (this.props.options || []).map(function(item) {
            return <Option key={item}>{item}</Option>
        });
    }

    render() {
        const {
            values,
            editable
        } = this.state;

        return (
            <div className="editable-cell">
            {
            editable ?
                <div className="editable-cell-select-wrapper">
                    <Select mode={this.props.mode} defaultValue={values} onChange={this.handleChange} >
                        {this.childrenOption}
                    </Select>
                    <Icon type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check} />
                </div>
            :
                <div className="editable-cell-select-wrapper">
                    {
                        values.length > 0
                        ? <Select mode={this.props.mode} defaultValue={values} disabled />
                        : <span>空</span>
                    }
                    
                    <Icon
                    type="edit"
                    className="editable-cell-icon"
                    onClick={this.edit} />
                </div>
            }
            </div>
        );
    }
}

export default EditCellInput;