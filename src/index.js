 /**
  * @file CMS平台主文件
  * @author niyingfeng<yingfeng.ni@gmail.com>
  */

import './index.html';
import './index.less';
import dva from 'dva';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
