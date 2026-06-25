---
title: "多用户实时更新"
sidebar_label: "多用户实时更新"
---

# 多用户实时更新

本文介绍如何实现 DHTMLX Scheduler 实时更新模块的服务器端支持。

:::note  
完整源代码可在 [GitHub 上](https://github.com/DHTMLX/scheduler-multiuser-backend-demo/) 获取。  
:::  

:::note  
本文涉及的是 DHTMLX Scheduler v7.2 的 Live Updates 模式实现。有关早期版本的详细信息，请参阅[此处](guides/live-update.md)。  
:::  

## 原理

DHTMLX Scheduler 提供 `RemoteEvents` 助手，用于在多名用户之间实现实时同步变更。

### 关键工作流程

- 当 Scheduler 初始化时，`RemoteEvents` 客户端会打开一个 WebSocket 连接。  
- 用户的变更（“create”、"edit" 或 "delete" 事件）通过 `DataProcessor` 使用 REST API 发送到服务器。  
- 服务器在处理完毕后，通过 WebSocket 将更新广播给所有已连接的客户端。  
- `RemoteEvents` 客户端接收到更新并将其应用到 Scheduler，确保跨用户的同步。

该设计使该后端模块能够在同一个应用中对多个 DHTMLX 小部件（如 Kanban、Gantt、Scheduler）提供支持。共享格式简化了数据同步，而无需为每个小部件维护单独的后端。

## 前端集成

在加载 Scheduler 数据的同一代码段中初始化 `RemoteEvents` 并设置 `DataProcessor`。

~~~js
const AUTH_TOKEN = "token";
scheduler.init('scheduler_here', new Date(2027, 3, 20), "week");
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

### 关键细节

- `RemoteEvents` 的构造函数需要一个授权令牌，该令牌在服务器验证时通过 **"Remote-Token"** 头部发送。  
- 第一个参数指定 `WebSocket` 端点（例如，**/api/v1**）。  
- `remoteUpdates` 助手处理来自 `WebSocket` 的消息并同步 Scheduler 数据。

## 后端实现

本部分介绍如何构建一个支持实时更新的后端。

### 简化示例

- [在 GitHub 上查看示例](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

要测试实现：

- 使用 `npm install` 和 `npm run start` 命令提取并运行后端项目。  
- 在两个独立的浏览器标签页中打开前端示例。  
- 在一个标签页中修改事件，另一标签页应显示该修改。

### 服务器端工作流

#### 1. 握手请求

实例化时，`RemoteEvents` 会向服务器发送一个 **GET** 请求以初始化连接。

示例：  
~~~  
GET /api/v1  
Remote-Token: AUTH_TOKEN  
~~~

响应：  
~~~  
{"api":{},"data":{},"websocket":true}  
~~~

#### 2. WebSocket 连接

收到响应后，`RemoteEvents` 使用提供的端点建立 websocket 连接。

示例：  
~~~  
ws://${URL}?token=${token}&ws=1  
~~~

服务器验证令牌并返回消息：  
~~~  
{"action":"start","body":"connectionId"}  
~~~

示例实现：  
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

连接建立后，`RemoteEvents` 会订阅特定实体的更新，在 Scheduler 的情况下为 `events`：

~~~json
{"action":"subscribe","name":"events"}
~~~

如需取消订阅：  
~~~json
{"action":"unsubscribe","name":"events"}
~~~

:::note  
该格式支持应用程序同时使用多个 DHTMLX 小部件的场景。每个小部件仅订阅其数据相关的更新。  
:::

示例：  
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

服务器通过 WebSocket 发送关于创建、更新或删除事件等变更的更新，格式如下描述。

收到这些消息后，Scheduler 会使用 `remoteUpdates` 助手自动同步数据。

**事件创建**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"add-event","event":EVENT_OBJECT}}}
~~~

示例：  
~~~js
app.post('/events', (req, res) => {
    const newEvent = req.body.event;
    const insertedEvent = crud.events.insert(newEvent);

    // 广播变更给已连接的客户端
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

示例：  
~~~js
app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const updatedEvent = req.body.event;

    crud.events.update(id, updatedEvent);

    // 广播变更给已连接的客户端
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

示例：  
~~~js
app.delete('/events/:id', (req, res) => {
    const id = req.params.id;

    crud.events.delete(id);

    // 广播删除给已连接的客户端
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

### 自定义处理程序

在上述格式中，`RemoteEvents` 助手负责与服务器建立 Websocket 连接的初始握手并接收消息。该模块的第二部分是 `remoteUpdates` 助手，负责解析通过 websocket 收到的消息并对 Scheduler 应用相应的更改。

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

通常，你可以在不进行额外配置的情况下使用这些助手工具。但也可以通过添加自定义助手或实现自定义的远程更新处理程序来扩展现有协议。

`RemoteEvents.on` 方法需要一个对象参数，该参数可以为一个或多个实体指定处理程序：

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "add-event":
                // 处理新增事件
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

如果你需要添加自定义操作，可以通过为 `remoteEvents` 添加额外处理程序来实现：

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

该处理程序将通过以下消息被调用：

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"custom-action","event":value}}}
~~~

如果你愿意使用 `RemoteEvents` 来接收自定义实体的更新，可以通过添加处理程序来实现：

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

以这样的方式初始化时，`remoteEvents` 对象将向 Websocket 发送以下格式的订阅消息：

~~~json
{"action":"subscribe","name":"calendars"}
~~~

当接收到指向指定实体的消息时，处理程序将被调用：

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

本指南为在 DHTMLX Scheduler 中实现和自定义实时更新提供了基础。若要查看完整示例，请参考 [GitHub 仓库](https://github.com/DHTMLX/scheduler-multiuser-backend-demo/).