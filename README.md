# antd-auto  (文档创建中)

前端自动化配置搭建CMS系统框架。解决前端CMS系统开发成本问题，释放前端开发资源。

## 特性

- 基于 dva 脚手架 [dva文档](https://github.com/dvajs/dva)
- 基于 antd 2.0 UI组件 [ant.design文档](https://ant.design/docs/react/introduce)
- 通过全局配置文件和页面配置文件，实现CMS系统的配置化开发
- 开发与业务逻辑剥离，所见即所得，开发人员仅需提供数据以及传递数据，完全不涉及数据与UI操作上的处理
- 特殊性功能可自实现开发处理

## 项目介绍

1. 实现前端只需提供数据便可以实现各种数据展现，包括table，simple objest，以及各类图形展现（引入echarts）
2. 提供数据操作接口，前端只需关心数据的接受与传递，便可以实现数据的增删改查，而无需再关心CMS内部的实现。暂时实现 table数据的增删改查，simple object数据的修改等
3. 在以上全自动话的基础上，可以实现自定义组装页面，目前功能包括，图片上传组件（需要正对自己项目调整接口），富文本编辑器（Tinymce），复制功能，antd UI 组件等。

## Start

克隆本项目，npm install 安装依赖，npm start 开始本地调试项目 开启 http://localhost:8989/便可以看到整体 DEMO 项目

## Build
npm Build 开始构建压缩
如果 alicdn 对部分域名有访问限制，或者需要内网环境使用 在部署上线的时候需要注意下载字体自行部署
本项目修改 index.less 的 @font-face 即可

![image](http://image.freefe.cc/20161201144536.png)

## 目录结构

```bash
├── /mock/           # mock的接口文件 
├── /dist/           # 项目构建输出目录
├── /src/            # 项目开发源码目录
│ ├── /components/   # 项目组件
│ │ ├── /common/     # 通用集成组件
│ │ ├── /feature/    # 页面配置文件 （主要配置文件）
│ │ ├── /login/      # 登录组件
│ │ ├── /header/     # 头部组件
│ │ ├── /main/       # 主体组件
│ │ └── /sider/      # 边栏组件
│ │ 
│ ├── /routes/       # 路由组件
│ ├── /utils/        # 工具函数
│ ├── router.jsx     # 路由配置
│ ├── index.jsx      # 入口文件
│ ├── index.less     # 样式主体文件
│ ├── config.js      # 全局配置文件（主要配置文件）
│ └── index.html   
│   
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置
```

## 功能列表
- [ ] 登录页面
- [x] table数据
    - [x] 展现配置化实现
    - [x] 查询配置化实现
    - [x] 新增配置化实现
    - [x] 更新配置化实现
    - [x] 删除配置化实现
- [x] 对象数据
    - [x] 展现配置化实现
    - [x] 更新配置化实现
- [x] 可视化图表
    - [x] 基于echarts的数据可视化配置实现
- [x] 富文本编辑器
- [x] 通用图片上传组件（须自行调整）
- [x] 复制粘贴功能


## 整站配置文件详解

### src/config.js

需配置整体的后台系统数据，以及自定义的配置数据

**header 管理系统头部配置(必要属性)**

* title    管理系统显示的标题
* icon     管理系统显示的icon可在 [icon](https://ant.design/components/icon/) 查看
* style    自定义设置头部样式

```
// header 示例 
header: {
    title: "测试配置管理后台",
    icon: "appstore",
    style: {
        padding: "15px 15px 15px 25px",
        borderBottom: "1px solid #E9E9E9",
        backgroundColor: "#F5F5F5"
    }
}
```

![image](http://image.freefe.cc/20161205140700.png)
    
**sider  管理后台侧栏配置(必要属性)**

* menu  sider列表 实现单层or多层级展现
    - title   展现的title
    - key     sider中对应的选项（若为菜单主项，则在openKeys中使用选择是否打开，若为功能项，则对应 selectedKey，以及 main 中 components 值）
    - icon    展现的icon选项（可选）
    - items   功能栏目列表（可选 可设置多层结构）

* openKeys      默认展开的sider主导航项目（对应menu项目主栏目中的key）
* selectedKey   默认打开的目标功能页面key（对应menu项目功能栏目中的key）
* style         自定义样式

```
// sider 边栏导航配置示例 
sider: {
    // 层级列表
    menu: [
        {   
            // 多级
            title: "导航1", // 主导航名称
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
            // 单级
            title: "选项5",
            key: "Feature5"
        }
    ],
    // 默认打开的导航项目
    openKeys:['subTitle1'],

    // 默认功能页
    selectedKey: "Feature1",

    // 自定义样式
    style: {
        backgroundColor: "#F5F5F5"
    }
}
```

![image](http://image.freefe.cc/20161205140735.png)

**main  功能区域配置**

* components    配置sider对应功能区域组件
    - FeatureKey     Object  对应sider menu 中的功能key对应功能组件

* title           功能区域标题显示名称
* component       加载对应功能区域的feature模块
* style         配置样式  

```
// main 示例 
main: {
    components: {
        // key 值对应 sider item中功能选项的 key
        "Feature1": { 
            // 功能区域标题显示名称
            title: 'table 数据展示',
            // require 加载对应功能区域的feature模块
            component: require('./components/feature/Feature1')
        },
        "Feature2": {
            title: 'simple对象 数据展示',
            component: require('./components/feature/Feature2')
        }
    },
    style: {
        backgroundColor: "#F5F5F5"
    } 
}
```

![image](http://image.freefe.cc/20161205140757.png)

**整体示例代码**

```
// header 示例 
header: {
    title: "测试配置管理后台",
    icon: "appstore",
    style: {
        padding: "15px 15px 15px 25px",
        borderBottom: "1px solid #E9E9E9",
        backgroundColor: "#F5F5F5"
    }
}

// sider 边栏导航配置示例 
sider: {
    // 层级列表
    menu: [
        {   
            // 多级
            title: "导航1", // 主导航名称
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
            // 单级
            title: "选项5",
            key: "Feature5"
        }
    ],
    // 默认打开的导航项目
    openKeys:['subTitle1'],

    // 默认功能页
    selectedKey: "Feature1",

    // 自定义样式
    style: {
        backgroundColor: "#F5F5F5"
    }
}

// main 示例 
main: {
    components: {
        // key 值对应 sider item中功能选项的 key
        "Feature1": { 
            // 功能区域标题显示名称
            title: 'table 数据展示',
            // require 加载对应功能区域的feature模块
            component: require('./components/feature/Feature1')
        },
        "Feature2": {
            title: 'simple对象 数据展示',
            component: require('./components/feature/Feature2')
        }
    },
    style: {
        backgroundColor: "#F5F5F5"
    } 
}
```

### src/components/feature/Feature.js

**配置单独功能页面的配置文件**

* table数据，单例数据，图标型数据的展现
* 查询、创建、更新、删除表单自动化处理
* 富文本编辑器功能使用
* 独立的图片上传组件使用
* 表单元素自定义使用

**必要参数**

* type  (string)    对于数据展现形式, 目前有 tableList graphList simpleObject 三种类型

```
// 对于数据展现形式 目前有 tableList graphList simpleObject 三种类型        
type: 'tableList', // tableList graphList simpleObject complexObject 
```

* initData  (function)    初始化展现的数据,参数 callback 用于接受获取的数据

```
// 初始化展现的数据，使用callback 回传列表数据
// 需要手动添加唯一id key
// callback 组件数据的回调函数(接受列表数据参数)
initData: function(callback){
    // 同步或者异步获取原始数据
    // 数据需要确认唯一的 key（react 形式）
    // 若是 table 类型 则每一条数据均需要唯一的 key
    data.key = data.id;
    callback(data);
}
```

* pageData (function) 接口分页数据处理
        
        // 接口分页处理
        // callback 回传列表数据 第二参数接受 总数与每页数目
        // 需要手动添加唯一id key
        pageData: function(num, callback){
            Reqwest({
                url: '/api/example2',
                data: {
                    page:num,
                    pageSize: 20
                },

                type: 'json',
                success: function (data) {
                    let list = data.data;
                    list.forEach(function(ele) {
                        ele.key = ele.id;
                    });
                    // 回调的第二个参数为数量总数 以及每页的数量
                    callback(list, {
                        total: 399,
                        pageSize: 20
                    });
                }
            });
        }

**table类型 展现数据**

* columns   (Array)     数据展现类型为 tableList时，设置table表头字段设置

```
// table 列表展现配置
// {
//      title       table显示表题
//      dataIndex   显示数据中的key
//      type        展现形式 （string image link）
//      render      自定义展现形式 参数 （当前数据，当前对象数据）
//      sort        是否需要排序功能
//      width       自定义该列宽度 否则等分
// }
columns: [
    {
        title: 'DOCID',     // table header 文案
        dataIndex: 'docid', // 数据对象内的属性，也做react vdom 的key
        type: 'string',     // table 内显示的类型
        sort: true,         // 是否需要排序
        width:200,
        render: (text, item) => ( <span>
                                <a href={text}>{item.name}</a>
                            </span>),
    },
    // type为operate含有特殊含义 自动化的更新与删除，以及自定义操作回调函数
    // 为特殊的操作字段
    {
        title: '操作',
        type: 'operate',    // 操作的类型必须为 operate
        width: 120,
        btns: [{
                text: '更新',
                type: 'update'
            },{
                text: '删除',
                type: 'delete'
            }, {
                text: '展示',
                callback: function(item){
                    console.log(item)
                }
            }, {
                render: (text, item) => (<CopyClipboard title='复制链接' type='link' data={item.url} />)
            }
        }]
    }
]
```

![image](http://image.freefe.cc/20161205141002.png)

**table类型 查询更新列表数据**

* RType    Array   展现的填写表单的数据字段。类型含有示例中的形式

```
// table 查询字段
// {
//      name        字段的name值
//      label       字段的展现内容
//      type        字段类型 （string date select cascader radio checkbox switch imageUpload）
//      placeholder input的placeholder内容
// }
RType: [
    {
        name: 'id',
        label: '唯一标识',
        type: 'string',
        placeholder: '请输入标示名称'
    },{
        name: 'date',
        label: '项目开始时间',
        type: 'date'
    },{
        name: 'stype',
        label: '项目类型Select',
        type: 'select',
        defaultValue: 'one',
        options:[{
            text: '选项一',
            value: 'one'
        },{
            text: '选项二',
            value: 'two'
        },{
            text: '选项三',
            value: 'three'
        }]
    },{
        name: 'rtype',
        label: '项目类型Radio',
        type: 'radio',
        defaultValue: 'one',
        options:[{
            text: '选项一',
            value: 'one'
        },{
            text: '选项二',
            value: 'two'
        },{
            text: '选项三',
            value: 'three'
        }]
    },{
        name: 'ischange',
        label: '是否过滤',
        type: 'switch',
        defaultValue: false
    }

]
```

* Retrieve    function    对于确认创建数据接口上报创建回调的函数

```
Retrieve: function(data, callback){
    // 处理对于列表查询的数据请求
    console.log(data);
    
    // 查询成功之后执行callback回调
    // 同步或者异步获取原始数据
    // 数据需要确认唯一的 key（react 形式）
    // 若是 table 类型 则每一条数据均需要唯一的 key
    list.key = list.id;
    callback(list);
}
```

![image](http://image.freefe.cc/20161205141035.png)

**table类型 创建数据**

当数据类型为table 并且含有创建新数据的需求时

* CType    Array   展现的填写表单的数据字段。类型含有示例中的形式

``` 
// table 创建新数据字段
// {
//      name        字段的name值
//      label       字段的展现内容
//      type        字段类型 （string date select cascader radio checkbox switch imageUpload）
//      placeholder input的placeholder内容
// }
CType: [
    {
        name: 'docid',
        label: '唯一标识',
        type: 'string',
        placeholder: '请输入标示名称'
    },{
        name: 'date',
        label: '日期',
        type: 'date'
    },{
        name: 'img',
        label: '图片',
        type: 'imageUpload'
    }
]
```

* Create    function    对于确认创建数据接口上报创建回调的函数

```
Create: function(data, callback){
    // 处理对于数据请求的创建
    console.log(data);
    
    // 创建成功之后执行callback回调
    callback();
}
```

![image](http://image.freefe.cc/20161205141101.png)

**table类型 更新数据**

当数据类型为table 并且含有更新数据的需求时

* UType    Array   展现的填写表单的数据字段。类型含有示例中的形式（类似创建数据）

```  
// table 更新数据字段
// {
//      name        字段的name值
//      label       字段的展现内容
//      type        字段类型 （string date select cascader radio checkbox switch imageUpload）
//      placeholder input的placeholder内容
// }
CType: [
    {
        name: 'docid',
        label: '唯一标识',
        type: 'string',
        placeholder: '请输入标示名称'
    },{
        name: 'date',
        label: '日期',
        type: 'date'
    },{
        name: 'img',
        label: '图片',
        type: 'imageUpload'
    }
]
``` 

* Update    function    对于确认创建数据接口上报创建回调的函数

```
Update: function(data, callback){
    // 处理对于数据请求的更新
    console.log(data);
    
    // 更新成功之后执行callback回调
    callback();
}
```

![image](http://image.freefe.cc/20161205141248.png)

**table类型 删除数据**

当数据类型为table 并且含有更新数据的需求时

* Delete    function    对于确认删除某条数据实例

```
Delete: function(data, callback){
    // 删除操作
    console.log(data);

    Reqwest({
        url: '/api/delete',
        data: data.id,

        type: 'json',
        success: function (data) {
            // 模拟请求删除成功的回调
            callback();
        }
    });
       
}
```

![image](http://image.freefe.cc/20161205141337.png)


## 其他组件

### 图片上传组件（需自定义调整）

### 复制文本组件

### 富文本编辑器组件（Tinymce基础功能接入）

### echarts 组件接入


## 学习文档

[ES6 react 实践的技术图](https://github.com/dvajs/dva-knowledgemap)

[dva 完成一个中型应用](https://github.com/dvajs/dva-docs/blob/master/v1/zh-cn/tutorial/01-%E6%A6%82%E8%A6%81.md)

[系统引用的UI组件文档 Ant Design of React](https://ant.design/docs/react/introduce)


bibibibi~ 改版中！！！！！！！！！！！！！！！！