 /**
  * @file CMS平台Util 功能文件
  * @author niyingfeng<yingfeng.ni@gmail.com>
  */
// 自定义的配置数据
// 处理时间格式数据
// 处理自定义链接参数数据

export default {
    // 生成指定日期格式 如 YYYY-MM-DD/dd HH/hh:mm:ss
    DateFormat(date, fmt) {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        let o = {
            'M+': date.getMonth() + 1, // 月份

            'D+': date.getDate(), // 日
            'd+': date.getDate(), // 日

            'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时 12小时制
            'H+': date.getHours(), // 小时

            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        };

        // 需要按位数进行显示
        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1,
                    (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }

        }
        return fmt;
    },

    // 解析search参数数据格式
    ParamsFixed(str) {
        let pObj = {};
        let pArr = str.split('&');
        for (let i = pArr.length - 1; i >= 0 && pArr[i]; i--) {
            let dataArr = pArr[i].split('=');
            pObj[dataArr[0]] = dataArr[1];
        }

        return pObj;
    },

    // XMLHttpRequest post 上传图片
    uploadFiles(url, key, file, opt) {
        //return false;
        if(!window.XMLHttpRequestUpload || !window.File || !window.FileList || !window.Blob){
            return false;
        }
        opt = opt || {};
        opt.scope = opt.scope || window;

        // 发送前验证， 比如什么大小啊什么的
        if(opt.check){
            if(opt.check.call(opt.scope, file) === false){
                return true;
            }
        }

        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.onload = function() {
            opt.onload && opt.onload.call(opt.scope, this);
        };
        xhr.onerror = function() {
            opt.onerror && opt.onerror.call(opt.scope, this);
        };
        xhr.upload.onprogress = function(e) {
            opt.onprogress && opt.onprogress.call(opt.scope, e);
        };
        xhr.upload.onloadstart = function(e) {
            opt.onstart && opt.onstart.call(opt.scope, e);
        };

        // prepare FormData
        let formData = new FormData();
        formData.append(key, file);
        for (let name in (opt.param || {})) {
            formData.append(name, opt.param[name]);
        }
        xhr.send(formData);
        return true;
    }
}
