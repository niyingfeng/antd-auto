# antd-auto  2.0版本升级（整体改版中）

## 升级目标

**前端自动化配置搭建CMS系统框架。解决前端CMS系统开发成本问题，释放前端开发资源。**

1. 对于基础数据展现，基本操作功能，实现独立页面级配置，脱离逻辑开发实现。
2. 对于有一定差异化的复杂操作页面，基于复杂型通用组件实现组件化级配置，开发负责简单逻辑开发，主要为实现数据处理。
3. 对于完全特殊化的操作页面，实现基于antUI组件以及提供的复杂型通用化组件等，实现完全自定义级别的开发。

## 特性

- 基于 dva 脚手架 [dva文档](https://github.com/dvajs/dva)
- 基于 antd 2.0 UI组件 [ant.design文档](https://ant.design/docs/react/introduce)
- 通过全局配置文件和页面配置文件，实现CMS系统基础功能与通用页面的配置化开发
- 基础类型：开发与业务逻辑剥离，所见即所得，开发人员仅需提供数据以及传递数据，完全不涉及数据与UI操作上的处理
- 复杂基础类型：通过复杂组件+逻辑实现复杂逻辑页面的可配置开发
- 特殊类型：基于现成通用组件实现完全自定义级别开发

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
│ │ ├── /form/       # 表单组件以及弹层表单组件
│ │ ├── /header/     # 头部组件
│ │ ├── /login/      # 登录组件
│ │ ├── /main/       # 主体组件
│ │ ├── /pager/      # v1.0版本自动化配置生成页面的组件集合
│ │ ├── /sider/      # 边栏组件
│ │ └── /table/      # 包装型table组件
│ │
│ ├── /config/       # 项目组件
│ ├── /page/         # 页面组件
│ ├── /routes/       # 路由组件
│ ├── /utils/        # 工具函数
│ ├── router.jsx     # 路由配置
│ ├── index.jsx      # 入口文件
│ ├── index.less     # 样式主体文件
│ └── index.html
│
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置
```


## 自动化配置页面功能列表(components/pager)
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

## 复杂型集成组件功能(components/)
- 配置化表单组件
- 配置化浮层表单组件
- 配置化表格组件
- 头部，侧栏，主内容区基本配置组件


## 整站配置文件详解

### src/config/platConfig.js

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
