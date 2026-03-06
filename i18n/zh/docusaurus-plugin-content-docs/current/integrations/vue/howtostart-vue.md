---
title: "dhtmlxScheduler 与 Vue.js 集成指南"
sidebar_label: "dhtmlxScheduler 与 Vue.js 集成指南"
---

# dhtmlxScheduler 与 Vue.js 集成指南

本指南假设您已经具备 [Vue](https://vuejs.org/) 的基本概念和使用模式。如果需要复习，可以参考 [Vue 3 官方文档](https://vuejs.org/guide/introduction.html#getting-started) 中的快速入门教程。

DHTMLX Scheduler 能够与 Vue 平滑集成。您可以在 GitHub 上查看相关示例:[DHTMLX Scheduler with Vue Demo](https://github.com/DHTMLX/vue-scheduler-demo)。

## 创建项目

在开始新项目之前，请确保已安装 [Node.js](https://nodejs.org/en/)。

要创建 Vue 项目，请运行以下命令:

~~~
npm create vue@latest
~~~

此命令将安装并运行官方的 Vue 项目脚手架工具 **create-vue**。更多细节请参考 
[Vue.js 快速开始](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)。

### 安装依赖

接下来，进入应用目录。本指南项目名称为 **scheduler-vue**，运行:

~~~
cd scheduler-vue
~~~

然后使用包管理器安装依赖并启动开发服务器:

- 如果使用 **yarn**，运行:

~~~
yarn install
yarn dev
~~~

- 如果使用 **npm**，运行:

~~~
npm install
npm run dev
~~~

现在，您的 Vue 项目应该可以通过 [http://localhost:5173](http://localhost:5173) 访问。

![Scheduler Vue.js app running](/img/scheduler_vue_app_run.png)

## 创建 Scheduler

在添加 Scheduler 之前，请通过在终端按下 **Ctrl+C** 停止正在运行的应用。之后，继续安装 Scheduler 包。

## 第一步:安装包

该库的 PRO 版本可通过 **npm/yarn** 从我们的私有仓库获取。请按照
[此说明](guides/installation.md#npmevaluationandproversions) 获取访问权限。

获得 Scheduler 的 Evaluation 版本后，使用以下命令安装:

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

## 第二步:创建组件

创建一个 Vue 组件，将 Scheduler 集成进您的应用。在 ***src/components/*** 目录下添加新文件 ***Scheduler.vue***。

### 导入源文件

打开 ***Scheduler.vue*** 并导入 Scheduler 源文件。根据您的安装方式:

- 如果是本地文件夹安装，导入如下:

~~~js title="Scheduler.vue"
import { Scheduler } from "dhtmlx-scheduler";
…
<style>
  @import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

- 如果是 trial 版本，导入如下:

~~~js title="Scheduler.vue"
import { Scheduler } from "@dhx/trial-scheduler";
…
<style>
  @import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

本教程采用 **trial** 版本的 Scheduler。

### 设置容器并添加 Scheduler

要在页面上渲染 Scheduler，需要设置容器元素。相关代码如下:

~~~js title="Scheduler.vue"
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 9, 6), "week");
    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont"></div>
</template>
~~~

如果希望 Scheduler 容器填满整个 body，请移除 ***src/assets*** 文件夹下 ***main.css*** 的默认样式，并替换为:

~~~js title="src/assets/main.css"
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## 第三步:将 Scheduler 添加到应用

接下来，将 Scheduler 组件添加到应用中。打开 ***src/App.vue***，将默认内容替换为:

~~~js title="src/App.vue"
<script>
import Scheduler from "./components/Scheduler.vue";

export default {
  components: { Scheduler },
};
</script>

<template>
  <Scheduler/>
</template>
~~~

运行应用后，页面上将显示一个空的 Scheduler:

![Scheduler Vue init](/img/scheduler_init.png)

## 第四步:提供数据

要在 Scheduler 中显示事件，需要提供数据。在 ***src/*** 目录下创建名为 ***data.js*** 的文件，并添加一些示例事件:

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

在 ***App.vue*** 中将此数据作为 props 传递给 Scheduler 组件:

~~~js title="App.vue"
<script>
import Scheduler from "./components/Scheduler.vue";
import { getData } from "./data";

export default {
  components: { Scheduler },
  data() {
    return {
      events: getData(),
    };
  },
};
</script>

<template>
  <Scheduler :events="events" />
</template>
~~~

然后，在 Scheduler 组件内部通过 **scheduler.parse()** 方法使用该 props:

~~~js title="Scheduler.vue"
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  props: ["events"],
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 5, 10), "week");
    scheduler.parse(this.events);

    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont"></div>
</template>
~~~

重新加载页面后，Scheduler 将显示已填充的事件:

![Scheduler Vue events](/img/scheduler_events.png)

## 第五步:保存数据

要跟踪 Scheduler 内的更改，可以使用 [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 处理器，它用于与服务器后端通信。该处理器可定义为函数或路由对象。dhtmlxScheduler 支持处理器返回 Promise，以确保正确处理操作完成。

通过 **createDataProcessor()** API 方法创建 **DataProcessor**，并像这样捕获更改:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

如果后端在新建记录后会更改事件 ID（常见场景），请确保 Promise 返回包含 **(id: databaseId)** 或 **(tid: databaseId)** 的对象。这样 Scheduler 可以用新的数据库 ID 更新记录。详细信息参见 [server side integration](guides/server-integration.md)。

至此，您的 Vue Scheduler 集成已完成。欢迎在 GitHub 上查看完整演示:[https://github.com/DHTMLX/vue-scheduler-demo](https://github.com/DHTMLX/vue-scheduler-demo)。

## XSS、CSRF 及 SQL 注入攻击

请注意，Scheduler 本身不提供对 SQL 注入、XSS 或 CSRF 攻击的防护。确保应用安全是开发者的责任，尤其是后端实现时。

请参考 [Application Security](guides/app-security.md) 文章，了解组件的潜在风险点及提升应用安全性的措施。
