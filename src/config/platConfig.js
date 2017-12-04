/**
 * @file CMS平台整体配置文件
 * @author niyingfeng<yingfeng.ni@gmail.com>
 *
 * header 管理后台头部配置 （../components/header）
 *     title    String  标题
 *     icon     String  标题图标
 *     style    Object  自定义样式
 *     menu     Array   header顶部的sider列表 仅支持单级
 *
 * sider  管理后台侧栏配置 (../components/sider)
 *     menu     Array   左侧栏sider列表 支持多层级
 *     openKeys Array   默认展开的sider区
 *     selectedKey  String  默认打开的功能区
 *     style    Object  自定义样式
 *
 * main  功能区域配置
 *     components   Object  配置sider对应功能区域组件
 *         Feature1     Object  对应sider与headerd的 menu 中的功能key对 应功能组件
 *     style        Object  配置样式
 *
 * userInfo 登入用户信息
 *     name 登入用户名
 *     aver 登入用户头像
 *     permission 是否权限
 *     loginUrl 无权限时跳转的链接（对于一些通用登入权限系统）
 */

const Config = {
    // 头部组件展现配置 与 主菜单配置
    header: {
        title: '通用配置管理平台',
        icon: 'appstore',
        style: {
            backgroundColor: '#F5F5F5',
            color: '#666'
        },

        menu: [{
            title: '顶部菜单栏示例1',
            key: 'defallt'
        }, {
            title: '顶部菜单栏示例2',
            key: 'defallt2'
        }]
    },

    // 侧栏菜单配置 可无限递归菜单
    sider: {
        menu: [{
                title: 'Table数据与功能展示',
                key: 'table',
                icon: 'bars',
                items: [{
                    title: 'table接口分页数据展现',
                    key: 'Feature1-1'
                }, {
                    title: 'table块级数据分页展示',
                    key: 'Feature1-2'
                }, {
                    title: 'table数据搜索数据操作',
                    key: 'Feature1-3'
                }, {
                    title: 'table数据增加数据操作',
                    key: 'Feature1-4'
                }, {
                    title: 'table数据修改数据操作',
                    key: 'Feature1-5'
                }, {
                    title: 'table数据删除数据操作',
                    key: 'Feature1-6'
                }]
            }, {
                title: 'simple对象数据与功能展示',
                key: 'object',
                icon: 'bars',
                items: [{
                    title: 'simple对象数据展示项',
                    key: 'Feature2-1'
                }, {
                    title: 'simple对象数据修改操作',
                    key: 'Feature2-2'
                }]
            }, {
                title: '数据可视化功能展示',
                key: 'echarts',
                icon: 'bars',
                items: [{
                    title: 'echarts 数据可视化1',
                    key: 'Feature3-1'
                }, {
                    title: 'echarts 数据可视化2',
                    key: 'Feature3-2'
                }, {
                    title: 'echarts 数据可视化3',
                    key: 'Feature3-3'
                }]
            }, {
                title: '综合功能数据展示',
                key: 'complex',
                icon: 'bars',
                items: [{
                    title: '综合数据展示',
                    key: 'Feature4-1'
                }]
            }, {
                title: '综合自定义操作项目',
                key: 'customOperate',
                icon: 'bars',
                items: [{
                    title: '富文本编辑功能展现',
                    key: 'Feature5-1'
                }, {
                    title: '自组装FromUI组件方式',
                    key: 'Feature5-2'
                }]
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
        openKeys: [],
        selectedKey: 'defallt',
        style: {}
    },

    // header 与 sider 中 key 对应展现在 Main 内的的页面级组件
    main: {
        components: {
            'defallt': {
                component: require('../page/default')
            },
            'defallt2': {
                component: require('../page/default2')
            },

            'bigset': {
                title: 'Bigset 列表',
                component: require('../page/bigset')
            },
            'category': {
                title: '分类列表管理',
                component: require('../page/category')
            },
            'meta': {
                title: 'Meta配置管理',
                component: require('../page/meta')
            },
            'user': {
                title: '用户权限管理',
                component: require('../page/user')
            },
            'userDetail': {
                title: '用户权限管理',
                component: require('../page/userDetail')
            },
            'log': {
                title: '用户权限管理',
                component: require('../page/log')
            },

            'Feature1-1': {
                title: 'table 数据接口分页请求展示',
                component: require('../page/Feature1-1')
            },
            'Feature1-2': {
                title: 'table 具有相关操作数据展示',
                component: require('../page/Feature1-2')
            },
            'Feature1-3': {
                title: 'table 数据搜索数据操作',
                component: require('../page/Feature1-3')
            },
            'Feature1-4': {
                title: 'table 数据增加数据操作',
                component: require('../page/Feature1-4')
            },
            'Feature1-5': {
                title: 'table 数据更新数据操作',
                component: require('../page/Feature1-5')
            },
            'Feature1-6': {
                title: 'table 数据删除数据操作',
                component: require('../page/Feature1-6')
            },
            // 'Feature2-1': {
            //     title: 'simple对象 数据展示',
            //     component: require('../page/Feature2-1')
            // },
            // 'Feature2-2': {
            //     title: 'simple对象数据修改操作',
            //     component: require('../page/Feature2-2')
            // },
            // 'Feature3-1': {
            //     title: '数据可视化 数据展示',
            //     component: require('../page/Feature3-1')
            // },
            // 'Feature3-2': {
            //     title: '数据可视化 数据展示',
            //     component: require('../page/Feature3-2')
            // },
            // 'Feature3-3': {
            //     title: '数据可视化 数据展示',
            //     component: require('../page/Feature3-3')
            // },
            // 'Feature4-1': {
            //     title: '综合数据展示',
            //     component: require('../page/Feature4-1')
            // },
            // 'Feature5-1': {
            //     title: '富文本编辑区域',
            //     component: require('../page/Feature5-1')
            // },
            // 'Feature5-2': {
            //     title: '自定义组装',
            //     component: require('../page/Feature5-2')
            // }
        },
        style: {}
    },

    // 可自定义用户信息 与 登入状态
    userInfo: {
        name: BaiduInfo.name,
        aver: BaiduInfo.aver,
        permission: BaiduInfo.permission,
        loginUrl: BaiduInfo.loginUrl
    }
}

export default Config;