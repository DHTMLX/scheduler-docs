---
title: "dhtmlxScheduler 与 React 集成指南"
sidebar_label: "dhtmlxScheduler 与 React 集成指南"
---

# dhtmlxScheduler 与 React 集成指南

本指南假定您已基本了解 [React](https://react.dev/) 的相关概念和模式。如果您是 React 新手，建议先阅读 [React 官方文档](https://legacy.reactjs.org/docs/getting-started.html) 入门教程。

DHTMLX Scheduler 可以很好地与 React 集成。您可以在 GitHub 上找到相关示例:[DHTMLX Scheduler with React Demo](https://github.com/DHTMLX/react-scheduler-demo)。

## 创建项目

在创建项目之前，请确保已安装 [Node.js](https://nodejs.org/en/)。

要搭建一个简单的 React 项目，请运行以下命令:

~~~
npx create-vite my-react-scheduler-app --template react
~~~

### 安装依赖

接下来，进入您的应用目录。本例中使用 **my-react-scheduler-app**:

~~~
cd my-react-scheduler-app
~~~

然后使用您喜欢的包管理器安装依赖并启动开发服务器:

- 如果使用 yarn，运行:

~~~
yarn install
yarn dev
~~~

- 如果使用 npm，运行:

~~~
npm install
npm run dev
~~~

您的 React 项目现在应该可以通过 **http://localhost:5173** 访问。

![Scheduler React app running](/img/scheduler_react_app_run.png)

## 创建 Scheduler

要添加 DHTMLX Scheduler，首先通过命令行按 **Ctrl+C** 停止应用。然后继续安装 Scheduler 包。

## 步骤 1. 安装包

库的 PRO 版本可通过我们的私有仓库使用 **npm/yarn** 获取。请参考
[此说明](guides/installation.md#npmevaluationandproversions) 获取访问权限。

获得 Scheduler 的 Evaluation 版本后，使用以下命令之一安装:

- 使用 npm:

~~~
npm install @dhx/trial-scheduler
~~~

- 使用 yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

另外，由于库的 zip 包结构与 **npm** 模块兼容，您也可以
[从本地文件夹安装](guides/installation.md#install-from-local-folder)。

## 步骤 2. 创建组件

接下来，创建一个 React 组件用于在应用中集成 Scheduler。新建文件夹 ***src/components/Scheduler***，并在其中创建以下文件:***Scheduler.jsx***、***Scheduler.css*** 和 ***index.js***。

首先创建 ***Scheduler.css***，为 *scheduler-container* 添加样式:

~~~js title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

为确保 Scheduler 容器填满整个页面，请删除 ***src*** 文件夹下 ***App.css*** 的默认样式，并添加如下内容:

~~~
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

然后添加 ***index.js*** 文件，内容如下:

~~~js title="src/components/Scheduler/index.js"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### 导入源文件

打开 ***Scheduler.jsx*** 并导入 Scheduler 源文件。根据您安装包的方式，导入代码如下:

- 如果从本地文件夹安装:

~~~js title="Scheduler.jsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- 如果使用 trial 版本:

~~~js title="Scheduler.jsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

本教程使用 **trial** 版本。

### 设置容器并添加 Scheduler

要在页面上渲染 Scheduler，需要设置一个容器。创建 ***Scheduler.jsx***，内容如下:

~~~js title="src/components/Scheduler/Scheduler.jsx"
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView( ) {
    let container = useRef();
    useEffect(() => {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(container.current, new Date(2024, 5, 10));
        return () => {
            scheduler.destructor();
            container.current.innerHTML = "";
        };
    }, []);

    return (
        <div ref="{container}" style="{{" width: "100%", height: "100%" }}></div>
    );
}
~~~

## 步骤 3. 将 Scheduler 添加到应用中

现在将 Scheduler 组件添加到您的应用中。打开 ***src/App.jsx***，将默认内容替换为:

~~~js title="src/App.jsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
            <Scheduler/>
        </div>
    );
}
export default App;
~~~

重新启动应用后，页面上会出现一个空白的 Scheduler:

![Scheduler React init](/img/scheduler_init.png)

## 步骤 4. 提供数据

要在 Scheduler 中显示事件，需要提供一组数据。在 ***src/*** 目录下创建 ***data.js*** 并添加一些事件:

~~~js title="src/data.js"
export function getData() {
    const data = [
        {
            start_date: "2024-06-10 6:00",
            end_date: "2024-06-10 8:00",
            text: "Event 1",
            id: 1,
        },
        {
            start_date: "2024-06-13 10:00",
            end_date: "2024-06-13 18:00",
            text: "Event 2",
            id: 2,
        },
    ];
    return data;
}
~~~

然后，在 ***App.jsx*** 中将此数据作为 props 传递给 Scheduler 组件:

~~~js title="App.jsx"
import { getData } from "./data.js";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
               <Scheduler events="{getData()}/">
        </div>
    );
}
export default App;
~~~

在 Scheduler 组件中，通过 **scheduler.parse()** 方法使用该 props:

~~~js title="Scheduler.jsx"
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView({events}) {
    let container = useRef();
    useEffect(() => {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(container.current, new Date(2024, 5, 10));
        scheduler.parse(events);
        return () => {
            scheduler.destructor();
            container.current.innerHTML = "";
        };
    }, []);

    return (
        <div ref="{container}" style="{{" width: "100%", height: "100%" }}></div>
    );
}
~~~

现在刷新页面，Scheduler 会加载显示事件:

![Scheduler React events](/img/scheduler_events.png)

## 步骤 5. 保存数据

要处理 Scheduler 中的变更，可以使用 [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 处理器。这样可以与您的后端服务器通信。该处理器可以是函数或路由对象。dhtmlxScheduler 支持 handler 返回 Promise，因此可以正确处理操作完成。

通过 **createDataProcessor()** 创建 **DataProcessor** 并捕获变更，如下:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

如果您的后端在创建新事件后会更改事件 id（常见情况），请确保 Promise 返回一个包含 **(id: databaseId)** 或 **(tid: databaseId)** 的对象。这样 Scheduler 会将记录更新为新的数据库 id。更多细节请参见 [server side integration](guides/server-integration.md)。

至此，React Scheduler 的基本集成已完成。您可以在 GitHub 上查看完整演示:[DHTMLX react-scheduler-demo](https://github.com/DHTMLX/react-scheduler-demo)。

## XSS、CSRF 和 SQL 注入攻击

请注意，Scheduler 本身不提供针对 SQL 注入、XSS 或 CSRF 等安全威胁的防护。保护您的应用免受这些风险是后端开发者的责任。

请参考 [应用安全](guides/app-security.md) 文章，了解常见漏洞及如何提升应用安全性。
