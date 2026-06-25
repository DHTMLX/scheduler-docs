---
title: "다중 사용자 실시간 업데이트"
sidebar_label: "다중 사용자 실시간 업데이트"
---

# 다중 사용자 실시간 업데이트

이 문서는 DHTMLX Scheduler의 실시간 업데이트 모듈에 대한 서버 측 지원을 구현하는 방법을 설명합니다.

:::note
전체 소스 코드는 [GitHub에서 확인할 수 있습니다](https://github.com/DHTMLX/scheduler-multiuser-backend-demo/).
:::

:::note
이 문서는 DHTMLX Scheduler v7.2용 Live Updates 모드의 구현을 다룹니다. 이전 버전에 대한 세부 정보는 [여기](guides/live-update.md)에서 확인할 수 있습니다.
:::

## 원리

DHTMLX Scheduler는 다중 사용자가 실시간으로 변경 내용을 동기화할 수 있도록 `RemoteEvents` 도우미를 제공합니다.

### 핵심 워크플로우

- Scheduler가 초기화될 때 `RemoteEvents` 클라이언트가 WebSocket 연결을 엽니다.
- 사용자의 변경 사항(“create”, “edit” 또는 “delete” 이벤트)은 REST API를 사용해 `DataProcessor`를 통해 서버로 전송됩니다.
- 서버는 이를 처리한 후 WebSocket를 통해 모든 연결된 클라이언트에 업데이트를 브로드캐스트합니다.
- `RemoteEvents` 클라이언트가 업데이트를 수신하고 Scheduler에 적용하여 사용자 간의 동기화를 보장합니다.

이 설계는 이 백엔드 모듈이 같은 애플리케이션 내에서 다수의 DHTMLX 위젯(예: Kanban, Gantt, Scheduler)을 지원하도록 허용합니다. 공유 형식은 각 위젯에 대해 별도 백엔드가 필요 없이 데이터 동기화를 간소화합니다.

## 프런트 엔드 통합

`RemoteEvents`를 초기화하고 Scheduler 데이터가 로드되는 코드 섹션에서 같은 위치에 `DataProcessor`를 설정합니다.

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

### 주요 세부 정보

- `RemoteEvents` 생성자는 인증 토큰이 필요하며, 이는 서버 검증을 위해 **"Remote-Token"** 헤더로 전송됩니다.
- 첫 번째 인수는 `WebSocket` 엔드포인트를 지정합니다(예: **/api/v1**).
- `remoteUpdates` 도우미는 수신된 `WebSocket` 메시지를 처리하고 Scheduler 데이터를 동기화합니다.

## 백엔드 구현

이 섹션은 실시간 업데이트를 지원하는 백엔드를 구축하는 방법을 설명합니다.

### 간략한 예제

- [GitHub의 예제 확인](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

구현을 테스트하려면:

- 백엔드 프로젝트를 추출하고 `npm install` 및 `npm run start` 명령으로 실행합니다.
- 프런트엔드 예제를 두 개의 서로 다른 브라우저 탭에서 엽니다.
- 한 탭에서 이벤트를 수정하면 변경 내용이 두 번째 탭에 나타나야 합니다.

### 서버 측 워크플로

#### 1. 핸드셰이크 요청

인스턴스화되면, `RemoteEvents`는 연결을 초기화하기 위해 서버에 **GET** 요청을 보냅니다.

예시:
~~~
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

응답:

~~~
{"api":{},"data":{},"websocket":true}
~~~

#### 2. WebSocket 연결

응답을 받은 후, `RemoteEvents`는 제공된 엔드포인트로 WebSocket 연결을 수립합니다.

예시:

~~~
ws://${URL}?token=${token}&ws=1
~~~

서버는 토큰을 검증하고 아래와 같은 메시지로 응답합니다:

~~~
{"action":"start","body":"connectionId"}
~~~

구현 예시:

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

#### 3. 구독

연결이 확립된 후, `RemoteEvents`는 Scheduler의 경우 특정 엔티티에 대한 업데이트를 구독합니다:

~~~json
{"action":"subscribe","name":"events"}
~~~

언subscribe하려면:

~~~json
{"action":"unsubscribe","name":"events"}
~~~

:::note
이 형식은 애플리케이션이 여러 DHTMLX 위젯을 동시에 사용하는 시나리오를 지원합니다. 각 위젯은 자신의 데이터에 관련된 업데이트에만 구독합니다.
:::

예:

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

#### 4. 업데이트 브로드캐스팅

서버는 아래에 설명된 형식으로 이벤트 생성, 업데이트 또는 삭제와 같은 변경사항에 대해 WebSocket를 통해 업데이트를 전송합니다.

이 메시지를 수신하면 Scheduler는 `remoteUpdates` 도우미를 사용하여 데이터를 자동으로 동기화합니다.

**이벤트 생성 Event Created**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"add-event","event":EVENT_OBJECT}}}
~~~

예:

~~~js
app.post('/events', (req, res) => {
    const newEvent = req.body.event;
    const insertedEvent = crud.events.insert(newEvent);

    // 연결된 클라이언트에 변경사항 브로드캐스트
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

**이벤트 업데이트 Event Updated**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"update-event","event":EVENT_OBJECT}}}
~~~

예:

~~~js
app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const updatedEvent = req.body.event;

    crud.events.update(id, updatedEvent);

    // 연결된 클라이언트에 변경사항 브로드캐스트
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

**이벤트 삭제 Event Deleted**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"delete-event","event":{"id":ID}}}}
~~~

예:

~~~js
app.delete('/events/:id', (req, res) => {
    const id = req.params.id;

    crud.events.delete(id);

    // 연결된 클라이언트에 삭제 브로드캐스트
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

## 고급 사용자 정의

### 커스텀 핸들러

설명된 형식에서 `RemoteEvents` 도우미는 서버와의 웹소켓 연결 초기 핸드셰이크를 수행하고 메시지를 수신하는 역할을 담당합니다.
모듈의 두 번째 부분은 수신된 웹소켓 메시지를 구문 분석하고 Scheduler에 적절한 변경을 적용하는 역할을 하는 `remoteUpdates` 도우미입니다.

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~


일반적으로 이 도우미들은 추가 구성 없이도 사용할 수 있습니다. 하지만 기존 프로토콜을 확장하기 위해 커스텀 도우미를 추가하거나 원격 업데이트를 위한 커스텀 핸들러를 구현하는 것도 가능합니다.

`RemoteEvents.on` 메서드는 하나 또는 여러 엔티티에 대한 핸들러를 지정할 수 있는 객체 인수를 기대합니다:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "add-event":
                // 이벤트 추가 처리
                break;
            case "update-event":
                // 업데이트 이벤트 처리
                break;
            case "delete-event":
                // 삭제 이벤트 처리
                break;
        }
    }
});
~~~

커스텀 작업을 추가해야 하는 경우, `remoteEvents`에 추가 핸들러를 추가하여 구현할 수 있습니다:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "custom-action":
                // 커스텀 동작 처리
                break;
        }
    }
});
~~~

핸들러는 다음 메시지에 의해 호출됩니다:

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"custom-action","event":value}}}
~~~

원하는 경우 커스텀 엔티티의 업데이트를 받기 위해 핸들러를 추가하여 사용할 수 있습니다:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// 커스텀 엔티티 구독
remoteEvents.on({ 
    calendars: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // 커스텀 동작 처리
                break;
        }
    }
});

~~~

이와 같이 초기화되면, `remoteEvents` 객체는 웹소켓에 구독 메시지를 다음과 같은 형식으로 보냅니다:

~~~json
{"action":"subscribe","name":"calendars"}
~~~

지정된 엔티티로 향하는 메시지가 수신될 때 핸들러가 호출됩니다:

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

이 가이드는 DHTMLX Scheduler에서 실시간 업데이트를 구현하고 사용자 정의하는 기초를 제공합니다. 전체 예제는 [GitHub 저장소](https://github.com/DHTMLX/scheduler-multiuser-backend-demo/.를 참고하십시오.