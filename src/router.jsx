import React, { PropTypes } from 'react';
import { Router, Route} from 'dva/router';
import IndexPage from './routes/IndexPage';

// router 路由配置 可使用链接放置参数数据
export default function({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={IndexPage} />
            <Route path="/:PageId(/:params)" component={IndexPage} />
        </Router>
    );
};
