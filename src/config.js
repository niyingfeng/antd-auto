/**
 * @file CMS平台整体配置文件
 * @author niyingfeng<yingfeng.ni@gmail.com> 
 *
 * header 管理后台头部配置
 *     title    String  标题
 *     icon     String   标题图标
 *     style    Object  自定义样式
 *
 * sider  管理后台侧栏配置
 *     menu     Array   sider列表
 *     openKeys Array   默认展开的sider区
 *     selectedKey  String  默认打开的功能区
 *     style    Object  自定义样式
 *
 * main  功能区域配置
 *     components   Object  配置sider对应功能区域组件
 *         Feature1     Object  对应sider menu 中的功能key对 应功能组件
 *     style        Object  配置样式
 *
 * userInfo 登入用户信息
 *     name 登入用户名
 *     aver 登入用户头像
 *     permission 是否权限
 *     loginUrl 无权限时跳转的链接（对于一些通用登入权限系统）
 */

const Config = {
    header: {
        title: '测试配置管理后台',
        icon: 'appstore',
        style: {
            backgroundColor: '#F5F5F5',
            color: '#666'
        }
    },

    sider: {
        menu: [
            {
                title: 'Table数据与功能展示',
                key: 'table',
                icon: 'bars',
                items: [
                    {title: 'table数据展示前端分页', key: 'Feature1-1'},
                    {title: 'table数据展示接口分页', key: 'Feature1-1-1'},
                    {title: 'table数据展示项2', key: 'Feature1-2'},
                    {title: 'table数据搜索数据操作', key: 'Feature1-3'},
                    {title: 'table数据增加数据操作', key: 'Feature1-4'},
                    {title: 'table数据修改数据操作', key: 'Feature1-5'},
                    {title: 'table数据删除数据操作', key: 'Feature1-6'}
                ]
            },
            {
                title: 'simple对象数据与功能展示',
                key: 'object',
                icon: 'bars',
                items: [
                    {title: 'simple对象数据展示项', key: 'Feature2-1'},
                    {title: 'simple对象数据修改操作', key: 'Feature2-2'}
                ]
            },
            {
                title: '数据可视化功能展示',
                key: 'echarts',
                icon: 'bars',
                items: [
                    {title: 'echarts 数据可视化1', key: 'Feature3-1'},
                    {title: 'echarts 数据可视化2', key: 'Feature3-2'},
                    {title: 'echarts 数据可视化3', key: 'Feature3-3'}
                ]
            },
            {
                title: '综合功能数据展示',
                key: 'complex',
                icon: 'bars',
                items: [
                    {title: '综合数据展示', key: 'Feature4-1'}
                ]
            },
            {
                title: '综合自定义操作项目',
                key: 'customOperate',
                icon: 'bars',
                items: [
                    {title: '富文本编辑功能展现', key: 'Feature5-1'},
                    {title: '自组装FromUI组件方式', key: 'Feature5-2'}
                ]
            },

            // 格式示例
            // {
            //     title: '导航1',
            //     key: 'subTitle1',
            //     icon: 'setting',
            //     items: [
            //         {title: '选项1', key: 'Feature1'},
            //         {title: '选项2', key: 'Feature2'},
            //         {title: '选项3', key: 'Feature3'},
            //         {   
            //             title: '导航3',
            //             key: 'subTitle3',
            //             icon: ',
            //             items: [
            //                 {title: '选项6', key: 'Feature6'},
            //                 {title: '选项7', key: 'Feature7'},
            //                 {title: '选项8', key: 'Feature8'}
            //             ]
            //         }
            //     ]
            // },{
            //     title: '导航2',
            //     key: 'subTitle2',
            //     icon: 'delete',
            //     items: [
            //         {title: '选项4', key: 'Feature4'}
            //     ]
            // },{
            //     title: '选项5',
            //     key: 'Feature5'
            // }

        ],
        openKeys:['table','object','echarts','complex','customOperate'],
        selectedKey: 'Feature1-1',
        style: {}
    },

    main: {
        components: {
            'Feature1-1': {
                title: 'table 普通列表数据展示 前端处理分页',
                component: require('./components/feature/Feature1-1')
            }, 
            'Feature1-1-1': {
                title: 'table 普通列表数据展示 接口请求分页',
                component: require('./components/feature/Feature1-1-1')
            }, 
            'Feature1-2': {
                title: 'table 具有相关操作数据展示',
                component: require('./components/feature/Feature1-2')
            }, 
            'Feature1-3': {
                title: 'table 数据搜索数据操作',
                component: require('./components/feature/Feature1-3')
            }, 
            'Feature1-4': {
                title: 'table 数据增加数据操作',
                component: require('./components/feature/Feature1-4')
            },
            'Feature1-5': {
                title: 'table 数据更新数据操作',
                component: require('./components/feature/Feature1-5')
            }, 
            'Feature1-6': {
                title: 'table 数据删除数据操作',
                component: require('./components/feature/Feature1-6')
            }, 
            'Feature2-1': {
                title: 'simple对象 数据展示',
                component: require('./components/feature/Feature2-1')
            }, 
            'Feature2-2': {
                title: 'simple对象数据修改操作',
                component: require('./components/feature/Feature2-2')
            },
            'Feature3-1': {
                title: '数据可视化 数据展示',
                component: require('./components/feature/Feature3-1')
            },
            'Feature3-2': {
                title: '数据可视化 数据展示',
                component: require('./components/feature/Feature3-2')
            }, 
            'Feature3-3': {
                title: '数据可视化 数据展示',
                component: require('./components/feature/Feature3-3')
            }, 
            'Feature4-1': {
                title: '综合数据展示',
                component: require('./components/feature/Feature4-1')
            },
            'Feature5-1': {
                title: '富文本编辑区域',
                component: require('./components/feature/Feature5-1')
            }, 
            'Feature5-2': {
                title: '自定义组装',
                component: require('./components/feature/Feature5-2')
            }
        },
        style: {} 
    },

    userInfo:{
        name: BaiduInfo.name || '游客',
        aver: BaiduInfo.aver || 'http://himg.bdimg.com/sys/portrait/item/113e68695f79696e6766656e67525e.jpg',
        permission: BaiduInfo.permission,
        loginUrl: BaiduInfo.loginUrl
    }
}

export default Config;