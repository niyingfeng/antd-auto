// 具体文档参照 Tinymce
import React from 'react';

let Feature = React.createClass({
    render: function() {
        return <div className="desction">
                    <p>前端自动化配置搭建CMS系统框架。解决前端CMS系统开发成本问题，释放前端开发资源。</p>
                    <h2>简介</h2>
                    <ol>
                        <li>对于基础数据展现，基本操作功能，实现独立页面级配置，脱离逻辑开发实现。</li>
                        <li>对于有一定差异化的复杂操作页面，基于复杂型通用组件实现组件化级配置，开发负责简单逻辑开发，主要为实现数据处理。</li>
                        <li>对于完全特殊化的操作页面，实现基于antUI组件以及提供的复杂型通用化组件等，实现完全自定义级别的开发。</li>
                    </ol>
                </div>
    }
});

export default Feature;