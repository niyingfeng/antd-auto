/**
 * [Config description]
 * @type {Object}
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
 */

const Config = {
    header: {
        title: "测试配置管理后台",
        icon: "appstore",
        style: {
            backgroundColor: "#F5F5F5",
            color: "#666"
        }
    },

    sider: {
        menu: [
            {
                title: "数据展示项",
                key: "dataShow",
                icon: "bars",
                items: [
                    {title: "table数据展示项", key: "Feature1-1"},
                    {title: "table数据展示项2", key: "Feature1-1-1"},
                    {title: "simple对象数据展示项", key: "Feature1-2"},
                    {title: "数据可视化展示项", key: "Feature1-3"},
                    {title: "综合数据展示", key: "Feature1-4"}
                ]
            },
            {
                title: "数据操作项目",
                key: "dataOperate",
                icon: "bars",
                items: [
                    {title: "table数据搜索操作", key: "Feature2-1"},
                    {title: "table数据增删改操作", key: "Feature2-2"},
                    {title: "simple对象数据修改操作", key: "Feature2-3"}
                ]
            },
            {
                title: "综合自定义操作项目",
                key: "customOperate",
                icon: "bars",
                items: [
                    {title: "富文本编辑功能", key: "Feature3-1"}
                ]
            },
            {
                title: "导航1",
                key: "subTitle1",
                icon: "setting",
                items: [
                    {title: "选项1", key: "Feature1"},
                    {title: "选项2", key: "Feature2"},
                    {title: "选项3", key: "Feature3"},
                    {   
                        title: "导航3",
                        key: "subTitle3",
                        icon: "",
                        items: [
                            {title: "选项6", key: "Feature6"},
                            {title: "选项7", key: "Feature7"},
                            {title: "选项8", key: "Feature8"}
                        ]
                    }
                ]
            },{
                title: "导航2",
                key: "subTitle2",
                icon: "delete",
                items: [
                    {title: "选项4", key: "Feature4"}
                ]
            },{
                title: "选项5",
                key: "Feature5"
            }
        ],
        openKeys:['dataShow','dataOperate','customOperate'],
        selectedKey: "Feature1-1",
        style: {}
    },

    main: {
        components: {
            "Feature1-1": {
                title: 'table 数据展示',
                component: require('./components/feature/Feature1-1')
            }, 
            "Feature1-1-1": {
                title: 'table 数据展示',
                component: require('./components/feature/Feature1-1-1')
            }, 
            "Feature1-2": {
                title: 'simple对象 数据展示',
                component: require('./components/feature/Feature1-2')
            }, 
            "Feature1-3": {
                title: '数据可视化 数据展示',
                component: require('./components/feature/Feature1-3')
            }, 
            "Feature1-4": {
                title: '综合数据展示',
                component: require('./components/feature/Feature1-4')
            },

    //         "Feature2-1": {
    //             title: 'table 数据搜索操作',
    //             component: require('../feature/Feature2-1')
    //         }, 
    //         "Feature2-2": {
    //             title: 'table 数据增删改操作',
    //             component: require('../feature/Feature2-2')
    //         }, 
    //         "Feature2-3": {
    //             title: 'simple对象数据修改操作',
    //             component: require('../feature/Feature2-3')
    //         }, 

    //         "Feature3-1": {
    //             title: '富文本编辑区域',
    //             component: require('../feature/Feature3-1')
    //         }, 

    //         "Feature1": {
    //             title: '这是功能区域标题1',
    //             component: require('../feature/Feature1')
    //         },   // 纯数据展示
    //         "Feature2": {
    //             title: '这是功能区域标题2',
    //             component: require('../feature/Feature2')
    //         },   // 添加操作
    //         "Feature3": {
    //             title: '这是功能区域标题3',
    //             component: require('../feature/Feature3')
    //         },
    //         "Feature4": {
    //             title: '这是功能区域标题4',
    //             component: require('../feature/Feature4')
    //         },
    //         "Feature5": {
    //             title: '这是功能区域标题5',
    //             component: require('../feature/Feature5')
    //         },
    //         "Feature6": {
    //             title: '这是功能区域标题6',
    //             component: require('../feature/Feature6')
    //         },
    //         "Feature7": {
    //             title: '这是功能区域标题7',
    //             component: require('../feature/Feature7')
    //         },
    //         "Feature8": {
    //             title: '这是功能区域标题8',
    //             component: require('../feature/Feature2')
    //         }
        },
        style: {} 
    },

    userInfo:{
        name: BaiduInfo.name || '游客',
        aver: BaiduInfo.aver || "http://himg.bdimg.com/sys/portrait/item/113e68695f79696e6766656e67525e.jpg",
        permission: BaiduInfo.permission,
        loginUrl: BaiduInfo.loginUrl
    }
}

export default Config;