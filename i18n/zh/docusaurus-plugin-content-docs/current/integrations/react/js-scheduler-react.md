---
title: "dhtmlxScheduler 与 React"
sidebar_label: "dhtmlxScheduler 与 React"
---

# dhtmlxScheduler 与 React

使用本档文档前，你应熟悉 [React](https://react.dev/) 的基本概念和模式。
如果你还不熟悉，请参考 [React 文档](https://react.dev/learn) 的入门教程。

DHTMLX Scheduler 与 React 兼容。你可以在 GitHub 上查看对应的示例： [DHTMLX Scheduler 与 React 演示](https://github.com/DHTMLX/react-scheduler-demo)。

## 创建一个项目

在开始创建新项目之前，请安装 Node.js（[Node.js 官方网站](https://nodejs.org/en/)）。

你可以使用以下命令创建一个基本的 React 项目：

~~~
npx create-vite my-react-scheduler-app --template react
~~~

### 依赖项安装

接下来你应该进入应用目录。我们把项目命名为 **my-react-scheduler-app**，并执行：

~~~
cd my-react-scheduler-app
~~~

之后你应安装依赖并启动开发服务器。为此，请使用包管理器：

- 如果你使用 yarn，请执行以下命令：

~~~
yarn install
yarn dev
~~~

- 如果你使用 npm，请执行以下命令：

~~~
npm install
npm run dev
~~~

现在你的 React 项目应该在 **http://localhost:5173** 运行。

![Scheduler React 应用正在运行](/img/scheduler_react_app_run.png)

## 创建 Scheduler

现在我们应该获取 DHTMLX Scheduler 的代码。首先，在命令行中按下 **Ctrl+C** 停止应用。然后我们就可以继续安装 Scheduler 包。

## 步骤 1. 包安装

库的 PRO 版本可通过我们的私有仓库用于 npm/yarn 安装，请按照 [本说明](guides/installation.md#npm---evaluation-and-pro-versions) 以获取访问权限。

获得 Scheduler 的评估版本后，可以使用以下命令安装：

- 对于 npm：

~~~
npm install @dhx/trial-scheduler
~~~

- 对于 yarn：

~~~
yarn add @dhx/trial-scheduler
~~~

或者，由于库的 zip 包被构建为一个 **npm** 模块，你可以 [从本地文件夹安装](guides/installation.md#installing-the-package-from-a-local-folder)。

## 步骤 2. 组件创建

现在我们应该创建一个 React 组件，将 Scheduler 添加到应用中。让我们创建 ***src/components/Scheduler*** 文件夹。  
在这里我们将创建 ***Scheduler.jsx***、***Scheduler.css*** 和 ***index.js*** 文件。

我们需要创建 ***Scheduler.css*** 文件并为 *scheduler-container* 添加样式：


~~~css title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

为了让 Scheduler 容器占据 body 的整个空间，你需要移除位于 ***src*** 文件夹中的 ***App.css*** 的默认样式，并添加以下样式：

~~~css
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

并添加 ***index.js*** 文件，内容如下：


~~~js title="src/components/Scheduler/index.js"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### 导入源文件

打开新创建的 ***Scheduler.jsx*** 文件并导入 Scheduler 的源文件。注意：

- 如果你是从本地文件夹安装 Scheduler 包，你的导入路径将如下所示：


~~~js title="Scheduler.jsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- 如果你选择安装 trial 版本，导入路径应如：


~~~js title="Scheduler.jsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

在本教程中我们将使用 Scheduler 的 **trial** 版本。

### 设置容器并添加 Scheduler

要在页面上显示 Scheduler，我们需要设置容器以渲染组件。创建 ***Scheduler.jsx*** 文件，使用以下代码：


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

现在是将组件添加到应用中的时候。打开 ***src/App.jsx***，并使用 *Scheduler* 组件替代默认内容，插入以下代码：

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

之后，当你启动应用时，页面上应该会看到一个空的 Scheduler：

![Scheduler React init](/img/scheduler_init.png)

## 第 4 步. 提供数据

要向 Scheduler 添加数据，我们需要提供一个数据集。让我们在 ***src/*** 目录中创建 ***data.js*** 文件并添加一些数据：


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

并且应在 ***App.jsx*** 中将 props（我们的数据）传递给 Scheduler 组件：


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

并在 Scheduler 组件中对 **scheduler.parse()** 方法使用 props：


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

现在如果你重新打开应用页面，你应该会看到带有事件的 Scheduler：

![Scheduler React events](/img/scheduler_events.png)

## 第 5 步. 保存数据

要捕获在 Scheduler 中所做的更改，你可以使用 [dataProcessor] 处理程序，它允许与你的服务器端后端进行“通信”。处理程序可以被声明为函数或路由对象。dhtmlxScheduler 接受来自处理程序的 Promise 响应，因此你的 Scheduler 将正确处理操作的完成。 

你可以通过 API 方法 **createDataProcessor()** 创建一个 **DataProcessor**，并像下面这样捕获更改：


~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

如果在创建新记录后你的服务会修改事件 id（通常会这样做），请确保你的 Promise 返回一个包含 **(id: databaseId)** 或 **(tid: databaseId)** 的对象作为结果，以便 Scheduler 能将新的数据库 id 应用到记录中。获取服务器端的更多信息 [关于服务器端](guides/server-integration.md)。

好吧，React Scheduler 已就绪，欢迎你 [在 GitHub 上查看完整演示](https://github.com/DHTMLX/react-scheduler-demo)。

## XSS、CSRF 与 SQL 注入攻击

请注意，Scheduler 不提供防止应用程序免受各种威胁的任何手段，例如 SQL 注入或 XSS 与 CSRF 攻击。确保应用程序安全的责任在于实现后台的开发人员。

请查看 [应用程序安全] 文章，以了解组件最易受攻击的点以及可采取的提高应用程序安全性的措施。