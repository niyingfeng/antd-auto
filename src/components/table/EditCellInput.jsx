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
    Input,
    Icon
} from 'antd';

class EditCellInput extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            value
        });
    }
    check = () => {
        this.setState({
            editable: false
        });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({
            editable: true
        });
    }

    render() {
        const {
            value,
            editable
        } = this.state;
        return (
            <div className="editable-cell">
            {
            editable ?
                <div className="editable-cell-input-wrapper">
                    <Input value={value}
                    onChange={this.handleChange}
                    onPressEnter={this.check} />
                    <Icon type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check} />
                </div>
            :
                <div className="editable-cell-text-wrapper">
                    {value || ' '}
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