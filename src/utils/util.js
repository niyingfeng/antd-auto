 /**
  * @file CMS平台Util 功能文件
  * @author niyingfeng<yingfeng.ni@gmail.com>
  */
// 自定义的配置数据
// 处理时间格式数据
// 处理自定义链接参数数据

export default { 
    DateFormat: function (date, fmt) {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        let o = {
            'M+': date.getMonth() + 1, // 月份

            'D+': date.getDate(), // 日
            'd+': date.getDate(), // 日

            'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时 12小时制
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
    
    ParamsFixed: function (str) {
        let pObj = {};
        let pArr = str.split('&');
        for (let i = pArr.length - 1; i >= 0 && pArr[i]; i--) {
            let dataArr = pArr[i].split('=');
            pObj[dataArr[0]] = dataArr[1];
        }

        return pObj;
    }
};
