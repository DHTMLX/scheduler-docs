---
title: 安装 React Scheduler
sidebar_label: 安装
description: "如何通过 npm 安装 React Scheduler 的评估版或商业版。"
---

# 安装 React Scheduler

React Scheduler 有两种发行版：

1. **评估版** 在 npm 上公开提供，包含试用水印，并可选择与一个免费评估期配合，以获得技术支持。
2. **专业版（商业版）** 可从私有 DHTMLX npm 仓库获取，适用于生产环境。

两个发行版包含相同的 API。

## 安装评估版本（公开 npm）

评估构建在 npm 上以 [@dhtmlx/trial-react-scheduler](https://www.npmjs.com/package/@dhtmlx/trial-react-scheduler) 提供：

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

或者使用 Yarn：

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

此构建功能完备，但会显示一条消息，指示库正在评估模式下运行。

### 可选：开启完整评估期（推荐）

尽管试用包安装没有限制，您也可通过以下网站开启正式评估：

[https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml).

正式评估将为您在试用期内提供免费技术支持。

**下载离线示例（zip）**

评估表单还包括包含离线就绪示例的可下载 ZIP 文件。

您也可以通过查看 [React Scheduler Demos on GitHub](https://github.com/DHTMLX/?q=react-scheduler&type=all&language=&sort=) 在官方 GitHub 上探索更多示例和演示项目。

## 专业版（私有 npm）

专业版用于生产应用，包含商业许可和全面的技术支持。

获得商业许可证后，您可以在 [Client's Area](https://dhtmlx.com/clients/) 生成私有 npm 凭据。

生成登录名/密码后，配置 npm：

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

然后安装 Professional 包：

~~~bash
npm install @dhx/react-scheduler
~~~

或者，使用 Yarn：

~~~bash
yarn add @dhx/react-scheduler
~~~

## 下一步

安装后，请继续：

- [快速上手](integrations/react/quick-start.md)
- [概览](integrations/react/overview.md)
- [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md)
- [框架指南](/category/framework-integrations/)