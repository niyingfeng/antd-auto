 /**
  * @file CMS平台
  * @author niyingfeng<yingfeng.ni@gmail.com>
  */
'use strict';

const mock = {};

require('fs').readdirSync(require('path').join(__dirname + '/mock'))
  .forEach(function (file) {
    Object.assign(mock, require('./mock/' + file));
  });

module.exports = mock;
