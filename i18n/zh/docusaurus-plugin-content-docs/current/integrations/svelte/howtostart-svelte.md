---
title: "dhtmlxScheduler 与 Svelte 集成指南"
sidebar_label: "dhtmlxScheduler 与 Svelte 集成指南"
---

# dhtmlxScheduler 与 Svelte 集成指南

本指南假设您已具备 Svelte 的基本概念和使用模式。如需入门，请参考 [Svelte 官方文档](https://svelte.dev/) 提供的教程。

DHTMLX Scheduler 可与 Svelte 很好地配合使用。您可以在 GitHub 上查看实际示例:[DHTMLX Scheduler with Svelte Demo](https://github.com/DHTMLX/svelte-scheduler-demo)。

## 创建项目

在创建新项目之前，请确保已安装 [Vite](https://vite.dev/)（可选）和 [Node.js](https://nodejs.org/en/)。

使用 Vite 创建 Svelte 项目，请运行以下命令:

~~~
npm create vite@latest
~~~

更多细节可参考 [相关文档](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit)。

### 安装依赖

接下来，进入您的应用目录。假设项目名称为 **scheduler-svelte** 并选择 **svelte** 选项。然后执行:

~~~
cd scheduler-svelte
~~~

之后，使用您喜欢的包管理器安装依赖并启动应用:

- 使用 **yarn**:

~~~
yarn install
yarn dev
~~~

- 使用 **npm**:

~~~
npm install
npm run dev
~~~

您的 Svelte 项目现在应该可以通过 [http://localhost:5173](http://localhost:5173) 访问。

![Scheduler Svelte app running](/img/scheduler_svelte_app_run.png)

## 创建 Scheduler

要添加 DHTMLX Scheduler，首先在终端按 **Ctrl+C** 停止应用。然后安装 Scheduler 包。

## 步骤 1. 安装包

库的 PRO 版本可通过 **npm/yarn** 从我们的私有仓库获取。请按照
[此说明](guides/installation.md#npmevaluationandproversions) 获取访问权限。

获得 Evaluation 版本后，使用以下命令安装:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

另外，由于库的 zip 包结构为 **npm** 模块，您也可以
[从本地文件夹安装](guides/installation.md#install-from-local-folder)。

## 步骤 2. 创建组件

创建新的 Svelte 组件以在应用中添加 Scheduler。在 ***src/*** 目录下新建文件 ***Scheduler.svelte***。

### 导入源文件

打开 ***Scheduler.svelte*** 并导入 Scheduler 文件。根据您的安装方式:

- 如果从本地文件夹安装，导入如下:

~~~js title="Scheduler.svelte"
import { Scheduler } from "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- 如果使用 trial 版本，导入如下:

~~~js title="Scheduler.svelte"
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

本指南采用 **trial** 版本。

### 设置容器并添加 Scheduler

为显示 Scheduler，需定义一个容器元素。如下代码所示:

~~~js title="Scheduler.svelte"
<script>
    import { onMount } from "svelte";
    import { Scheduler } from "@dhx/trial-scheduler";
    import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

    let scheduler;
    let container;
    onMount(() => {
        scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.init(container, new Date(2023, 9, 6), "week");

        return () => scheduler.destructor();
    });
</script>

<div bind:this="{container}"></div>
~~~

如需让 Scheduler 容器填满整个页面，请移除 ***src/*** 下 ***app.css*** 的默认样式，并添加:

~~~js title="src/app.css"
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## 步骤 3. 在应用中添加 Scheduler

接下来，将 Scheduler 组件引入您的应用。在 ***src/App.svelte*** 中用以下内容替换默认内容:

~~~js title="App.svelte"
<script>
  import Scheduler from "./Scheduler.svelte";
</script>

<Scheduler/>
~~~

启动应用后，页面上应会显示一个空的 Scheduler:

![Scheduler Svelte init](/img/scheduler_init.png)

## 步骤 4. 提供数据

要显示事件，需要为 Scheduler 提供数据。在 ***src/*** 下新建 ***data.js*** 文件，并添加一些示例数据:

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

然后，将该数据作为 prop 传递给 Scheduler 组件，在 ***App.svelte*** 中:

~~~js title="App.svelte"
<script>
  import Scheduler from "./Scheduler.svelte";
  import { getData } from "./data.js";
</script>

<Scheduler data="{getData()}" />
~~~

在 ***Scheduler.svelte*** 内，使用该 prop 并通过 **scheduler.parse()** 加载数据:

~~~js title="Scheduler.svelte"
<script>
    import { onMount } from "svelte";
    
    import { Scheduler } from "@dhx/trial-scheduler";
    import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css"
    export let data; /*!*/

    let scheduler;
    let container;
    onMount(() => {
        scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace"
        scheduler.init(container, new Date(2024, 5, 10), "week");

        return () => scheduler.destructor();
    });

    $: scheduler?.parse(data); /*!*/
</script>

<div bind:this="{container}"></div>
~~~

重新加载应用后，Scheduler 中将显示事件:

![Scheduler Svelte events](/img/scheduler_events.png)

## 步骤 5. 数据保存

要处理 Scheduler 中的更改，可使用 [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 处理器，实现与后端的通信。该处理器可以是函数或路由对象。dhtmlxScheduler 支持 Promise 响应，因此会等待操作完成。

使用 **createDataProcessor()** 创建 **DataProcessor** 并捕获更改:

~~~js
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

如果您的后端在创建新记录时会更改事件 ID（常见情况），请确保 Promise 返回的对象格式为 **(id: databaseId)** 或 **(tid: databaseId)**，以便 Scheduler 正确更新事件。更多信息请参考 [server side integration](guides/server-integration.md)。

至此，您的 Svelte Scheduler 已准备就绪。欢迎在 GitHub 上查看完整示例:[svelte-scheduler-demo](https://github.com/DHTMLX/svelte-scheduler-demo)。

## XSS、CSRF 及 SQL 注入攻击

请注意，Scheduler 本身不提供针对 SQL 注入、XSS 或 CSRF 等威胁的防护。应用安全需由后端开发者负责。

请参考 [Application Security](guides/app-security.md) 文章，了解组件的潜在风险点及推荐安全措施。
