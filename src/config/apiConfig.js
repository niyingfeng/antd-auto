/**
 * @file CMS平台整体api文件配置
 * @author niyingfeng<yingfeng.ni@gmail.com> 
 *
 */

const isLocal = location.hostname === 'localhost';

const apiConfig = {
    getbigsetlist: isLocal ? '/api/getbigsetlist' : '/udata/mis/getbigsetlist?app=flyflow',
    exportbigset: isLocal ? '/api/exportbigset' : '/udata/mis/exportbigset?app=flyflow',
    uploadBigset: isLocal ? '/api/uploadBigset' : '/udata/mis/uploadBigset',
    delbigset: isLocal ? '/api/delbigset' : '/udata/mis/delbigset?app=flyflow',

    getcatelist: isLocal ? '/api/getcatelist' : '/udata/mis/getcatelist?app=flyflow',
    saveCate: isLocal ? '/api/saveCate' : '/udata/mis/saveCate?app=flyflow',
    delCate: isLocal ? '/api/delCate' : '/udata/mis/delCate?app=flyflow',

    getMetaDataOptions: isLocal ? '/api/getMetaDataOptions' : '/udata/mis/getMetaDataOptions?app=flyflow',

    getuserlist: isLocal ? '/api/getuserlist' : '/udata/mis/getuserlist?app=flyflow',

    GetUserAcl: isLocal ? '/api/GetUserAcl' : '/udata/mis/GetUserAcl?app=flyflow',

    getmodules: isLocal ? '/api/getmodules' : '/udata/mis/getmodules?app=flyflow',

    getdatainfo: isLocal ? '/api/getdatainfo' : '/udata/mis/getdatainfo?app=flyflow',

    getlog: isLocal ? '/api/getlog' : '/udata/mis/getlog?app=flyflow',
}


export default apiConfig;