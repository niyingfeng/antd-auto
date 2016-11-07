import React, { PropTypes } from 'react';
import { Router, Route} from 'dva/router';
import IndexPage from './routes/IndexPage';

export default function({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={IndexPage} />
            <Route path="/:FeatureId(/:params)" component={IndexPage} />
        </Router>
    );
};
