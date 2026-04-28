---
title: "实时更新模式（遗留版）"
sidebar_label: "实时更新模式（遗留版）"
---

# 实时更新模式（遗留版）

:::warning
所述功能已被弃用，且不再维护。
:::

:::note
本文指的是 DHTMLX Scheduler 的 Live Updates 模块的传统实现。当前版本的详细信息请参阅 [这里](guides/multiuser-live-updates.md)。
:::

Live Update 是一种在实时环境中提供同步数据更新的模式。

当一个用户进行更改时，立即对所有其他用户可见。

该模式使用 `Faye` 套接字库，使该过程尽可能快速且灵活，并且不需要页面刷新（它只更新应用了该模式的组件）。

在本文中，我们将为你提供一步步的教程，帮助你快速入门该主题。

## 基本原理

实时更新是通过将一个已连接客户端所作的更改广播给所有其他已连接客户端来实现的。\
这是通过利用 WebSocket 连接在已连接的客户端和后端之间进行双向消息交换来实现的。

在此 Live Updates 模块的版本中，通过扩展 `DataProcessor` 模块以使用 `Faye` 库客户端，并配合一个额外的后端应用程序在客户端之间分发消息来实现。

该解决方案由三部分组成：

1. 之前端，包含 Scheduler 与 `DataProcessor` 模块。  
2. 后端，在持久存储上实现 CRUD 操作。  
3. live-updates hub，负责连接客户端。

当用户对数据进行修改时：

- 前端将更新发送到后端。  
- 同时，前端将同样的更新发送到 live-updates hub。  
- live-updates hub 将更新广播给所有已连接的客户端。  
- 当前端从 live-updates hub 接收到更新时，它将其应用到 Scheduler 数据中，以避免触发对 CRUD 后端的变更。

## 开始之前

要开始本教程，你必须拥有一个与服务器端逻辑集成的完整 dhtmlxScheduler 应用程序——它能够从数据库加载数据并将修改保存回数据库。 (详细信息请参阅 [这里](integrations/howtostart-guides.md)。)

此类应用程序的一个基本示例可能如下所示：

~~~js
<script>
    function init() {
        scheduler.init('scheduler_here', new Date(2027,5,24), "week");
        scheduler.load("api/scheduler");

        const dp = scheduler.createDataProcessor({
            url: "/events",
            mode: "REST"
        });
    }
</script>
~~~

## 配置实时更新

:::note
此实现的 Live Updates 已弃用，且不包含在主包中。
:::

### 第 1 步：设置

1. 下载用于 Scheduler 的 **Live Updates 插件**：[下载链接](https://files.dhtmlx.com/30d/20deb2ff205dc16bc94a7e9fcef4c5fe/live_updates.zip)
2. 下载 **Live Updates backend** 应用：[下载链接](https://files.dhtmlx.com/30d/57084e02b121f14bb14b6734d465ad41/websocket-backend.zip)
3. 按照随附自述文件中的说明启动 **Live Updates backend**。

### 第 2 步：配置前端

要使用 Live Update 模式，在前端应用中添加两个附加文件：

- **live_updates.js** - 上一步下载的文件  
- **client.js** - 由 WebSocket 后端应用动态生成的文件

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="http://localhost:8008/client.js"></script>
~~~

在上面的代码示例中，我们直接连接到 WebSocket 应用。通常，你会希望通过主应用来路由这个 URL，以避免暴露次要应用的地址和端口。这可以通过使用反向代理来实现。

通过主应用（Node.js）进行请求代理：

~~~js
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

module.exports = function(app){
    app.all("/liveUpdates*", function(req, res) {
        proxy.web(req, res, {target: "http://localhost:8008"});
    });
}
~~~

前端：

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="/liveUpdates/client.js"></script>
~~~

### 第 3 步：启用 Live Updates

通过在 `DataProcessor` 实例上调用 **live_updates()** 方法来启用该模式。要使其工作，必须先初始化 `DataProcessor`。作为参数，该方法接受 WebSocket 入口点的 URL。

~~~js
const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST"
});

dp.live_updates("/liveUpdates");
~~~

你可以在 [此处](https://files.dhtmlx.com/30d/0aea2facd959a8300bf7caec3f5a7f42/dhtmlxscheduler-live-updates.zip) 下载一个完整的演示应用。