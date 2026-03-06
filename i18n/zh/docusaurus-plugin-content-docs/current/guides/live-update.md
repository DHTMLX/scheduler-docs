---
title: "实时更新模式（旧版）"
sidebar_label: "实时更新模式（旧版）"
---

# 实时更新模式（旧版）

:::note
本文介绍的是 DHTMLX Scheduler 实时更新模式的旧版。如需了解最新版本的信息，请参阅[这里](guides/multiuser-live-updates.md)。
:::

实时更新模式可让数据在用户之间实时同步。

当某个用户做出更改时，其他所有用户会立刻看到这些更改。

该模式使用 `Faye` socket 库，以确保无需刷新页面即可实现快速且灵活的更新（仅相关组件会更新）。

本文将为你提供一份简单的入门指南，帮助你快速上手此功能。

## 基本原理

实时更新通过将一个已连接客户端的更改广播给所有其他客户端来实现。这依赖于 WebSocket 连接，允许客户端与后端之间进行双向通信。

在此版本中，实时更新模块扩展了 `DataProcessor` 模块，使用 `Faye` 客户端库，并结合用于在客户端之间分发消息的后端应用。

整体架构包含三个部分:

1. 带有 Scheduler 和 `DataProcessor` 模块的**前端**。
2. 负责数据库 CRUD 操作的**后端**。
3. 管理客户端连接的**实时更新中心（hub）**。

当用户更新数据时:

- **前端**将更新发送到**后端**。
- 同时，**前端**会将相同的更新发送到**实时更新中心**。
- **实时更新中心**将该更新广播给所有已连接的客户端。
- **前端**在收到来自**实时更新中心**的更新后，会将其应用到 Scheduler 数据中，但不会触发后端的 CRUD 操作。

## 开始前准备

要完成本教程，你需要一个已集成服务端逻辑的 dhtmlxScheduler 应用，该应用能从数据库加载数据并保存更改。（详细信息见[这里](integrations/howtostart-guides.md)。）

一个简单示例如下:

~~~js
<script>
    function init() {
        scheduler.init('scheduler_here', new Date(2025,5,24), "week");
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
本实时更新实现已废弃，不再包含于主包中。
:::

### 步骤 1. 安装

1. 下载 Scheduler 的**实时更新插件**:[download link](https://files.dhtmlx.com/30d/20deb2ff205dc16bc94a7e9fcef4c5fe/live_updates.zip)
2. 下载**实时更新后端**应用:[download link](https://files.dhtmlx.com/30d/57084e02b121f14bb14b6734d465ad41/websocket-backend.zip)
3. 按照后端应用的 readme 文件说明启动**实时更新后端**。

### 步骤 2. 配置前端

要启用实时更新模式，需要在前端应用中添加两个额外文件:

- **live_updates.js** -- 上一步获得的插件文件
- **client.js** -- WebSocket 后端应用动态生成的文件

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="http://localhost:8008/client.js"></script>
~~~

此示例直接连接 WebSocket 应用。通常建议通过主应用转发此 URL，以隐藏二级应用的地址和端口。你可以通过设置反向代理实现。

**通过主应用代理请求（Node.js）:**

~~~js
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

module.exports = function(app){
    app.all("/liveUpdates*", function(req, res) {
        proxy.web(req, res, {target: "http://localhost:8008"});
    });
}
~~~

**前端:**

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="/liveUpdates/client.js"></script>
~~~

### 步骤 3. 启用实时更新

调用 `DataProcessor` 实例的 **live_updates()** 方法以激活实时更新模式。请确保已先初始化 `DataProcessor`。该方法参数为 WebSocket 入口地址。

~~~js
const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST"
});

dp.live_updates("/liveUpdates");
~~~

你可以在[这里](https://files.dhtmlx.com/30d/0aea2facd959a8300bf7caec3f5a7f42/dhtmlxscheduler-live-updates.zip)下载完整演示应用。
