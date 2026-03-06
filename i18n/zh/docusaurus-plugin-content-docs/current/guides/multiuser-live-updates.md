---
title: "多用户实时更新"
sidebar_label: "多用户实时更新"
---

# 多用户实时更新

本文介绍如何为 DHTMLX Scheduler 的实时更新功能设置服务器端支持。

:::note
本文介绍了 DHTMLX Scheduler v7.2 的 Live Updates 模式实现。如需了解早期版本的信息，请查看 [这里](guides/live-update.md)。
:::

## 原理

DHTMLX Scheduler 提供了 `RemoteEvents` 辅助工具，用于在多用户之间即时同步数据变更。

### 主要工作流程

- 当 Scheduler 初始化时，`RemoteEvents` 客户端会立即建立一个 WebSocket 连接。
- 用户执行如创建、编辑或删除事件的操作时，这些操作会通过 `DataProcessor` 使用 REST API 发送到服务器。
- 服务器处理完这些操作后，会通过 WebSocket 向所有已连接的客户端广播更新。
- `RemoteEvents` 客户端接收这些更新，并将其应用到 Scheduler 上，确保所有用户看到的数据保持一致。

该方案支持在一个应用中集成多个 DHTMLX 组件（如 Kanban、Gantt、Scheduler），通过统一的数据格式实现同步，无需为每个组件单独开发后端。

## 前端集成

在加载 Scheduler 数据的代码部分，同时配置 `RemoteEvents` 和 `DataProcessor`。

~~~js
const AUTH_TOKEN = "token";
scheduler.init('scheduler_here', new Date(2025, 3, 20), "week");
scheduler.load("/events");

const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST-JSON",
    headers: {
        "Remote-Token": AUTH_TOKEN
    }
});

const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

### 关键说明

- `RemoteEvents` 构造函数需要一个授权令牌，该令牌会通过 **"Remote-Token"** 头部发送到服务器进行验证。
- 第一个参数为 `WebSocket` 端点（例如 **/api/v1**）。
- `remoteUpdates` 辅助工具负责处理收到的 `WebSocket` 消息，并保持 Scheduler 数据同步。

## 后端实现

本节介绍如何创建支持实时更新的后端。

### 简化示例

- [在 GitHub 上查看示例](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

体验步骤:

- 下载并运行后端项目，使用 `npm install` 和 `npm run start`。
- 在两个浏览器标签页中打开前端示例。
- 在一个标签页中编辑事件，另一个标签页会实时显示变化。

### 服务器端工作流程

#### 1. 握手请求

当 `RemoteEvents` 启动时，会向服务器发送一个 **GET** 请求以建立连接。

示例:
~~~
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

响应:

~~~
{"api":{},"data":{},"websocket":true}
~~~

#### 2. WebSocket 连接

握手完成后，`RemoteEvents` 使用端点建立 WebSocket 连接。

示例:

~~~
ws://${URL}?token=${token}&ws=1
~~~

服务器会验证令牌，并回复如下消息:

~~~
{"action":"start","body":"connectionId"}
~~~

示例代码片段:

~~~js
app.get('/api/v1', (req, res) => {
    const token = req.headers['remote-token'];
    if (!token || !verifyAuthHeader(token)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    res.json({ api: {}, data: {}, websocket: true });
});

wss.on('connection', (ws, req) => {
    const token = new URLSearchParams(req.url.split('?')[1]).get('token');
    if (!token || !verifyAuthToken(token)) {
        ws.close(1008, 'Unauthorized');
        return;
    }
    const connectionId = generateConnectionId();
    ws.send(JSON.stringify({ action: 'start', body: connectionId }));
});
~~~

#### 3. 订阅

连接建立后，`RemoteEvents` 会订阅特定实体的更新--对于 Scheduler，这里是 `events`：

~~~json
{"action":"subscribe","name":"events"}
~~~

如需取消订阅:

~~~json
{"action":"unsubscribe","name":"events"}
~~~

:::note
该方案适用于同时使用多个 DHTMLX 组件的应用，每个组件只需订阅其所需的更新即可。
:::

服务器端处理示例:

~~~js
ws.on('message', function(message) {
    try {
        const msg = JSON.parse(message);
        const client = clients.get(connectionId);

        if (!client) return;

        if (msg.action === 'subscribe') {
            client.subscriptions.add(msg.name);
        } else if (msg.action === 'unsubscribe') {
            client.subscriptions.delete(msg.name);
        }
    } catch (err) {
        console.error('Error parsing WebSocket message:', err);
    }
});
~~~

#### 4. 广播更新

服务器通过 WebSocket 向客户端发送消息，通知其事件的创建、更新或删除，格式如下。

当这些消息到达时，Scheduler 会使用 `remoteUpdates` 辅助工具自动更新数据。

**事件创建**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"add-event","event":EVENT_OBJECT}}}
~~~

示例:

~~~js
app.post('/events', (req, res) => {
    const newEvent = req.body.event;
    const insertedEvent = crud.events.insert(newEvent);

    // 通知所有已连接客户端有新事件
    const message = { 
        name: 'events', 
        value: {
            type: 'add-event', event: insertedEvent
        }
    };
    broadcast('event', message);

    res.status(200).json({ id: insertedEvent.id });
});

function broadcast(action, body) {
    const entity = body.name;

    for (const [connectionId, client] of clients.entries()) {
        const { ws, subscriptions } = client;

        if (subscriptions.has(entity) && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ action, body }));
        }
    }
}
~~~

**事件更新**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"update-event","event":EVENT_OBJECT}}}
~~~

示例:

~~~js
app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const updatedEvent = req.body.event;

    crud.events.update(id, updatedEvent);

    // 通知客户端事件已更新
    const message = {
        name: 'events',
        value: {
            type: 'update-event', event: updatedEvent
        }
    };
    broadcast('event', message);

    res.status(200).send();
});
~~~

**事件删除**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"delete-event","event":{"id":ID}}}}
~~~

示例:

~~~js
app.delete('/events/:id', (req, res) => {
    const id = req.params.id;

    crud.events.delete(id);

    // 通知客户端事件已删除
    const message = {
        name: 'events',
        value: {
            type: 'delete-event',
            event: { id }
        }
    };
    broadcast('event', message);

    res.status(200).send();
});
~~~

## 高级自定义

### 自定义处理器

`RemoteEvents` 辅助工具负责初始握手与 WebSocket 连接，`remoteUpdates` 辅助工具则处理收到的消息并自动更新 Scheduler。

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

通常情况下，这些辅助工具可以直接使用。但你也可以通过添加自定义处理器或辅助工具，扩展协议以适应特定的远程更新场景。

`RemoteEvents.on` 方法可以接收一个对象，为一个或多个实体定义处理器:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "add-event":
                // 处理添加事件
                break;
            case "update-event":
                // 处理更新事件
                break;
            case "delete-event":
                // 处理删除事件
                break;
        }
    }
});
~~~

如需处理自定义操作，可为 `remoteEvents` 添加额外处理器:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "custom-action":
                // 处理自定义操作
                break;
        }
    }
});
~~~

该处理器会响应如下消息:

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"custom-action","event":value}}}
~~~

如需接收自定义实体的更新，可相应添加处理器:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// 订阅自定义实体
remoteEvents.on({ 
    calendars: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // 处理自定义操作
                break;
        }
    }
});
~~~

此时，`remoteEvents` 会发送如下订阅消息:

~~~json
{"action":"subscribe","name":"calendars"}
~~~

处理器将响应如下消息:

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

本指南介绍了在 DHTMLX Scheduler 中设置和自定义实时更新的基础方法。完整示例请访问 GitHub 仓库。
