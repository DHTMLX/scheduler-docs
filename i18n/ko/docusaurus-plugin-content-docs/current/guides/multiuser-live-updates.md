---
title: "멀티 유저 실시간 업데이트"
sidebar_label: "멀티 유저 실시간 업데이트"
---

# 멀티 유저 실시간 업데이트

이 문서에서는 DHTMLX Scheduler에서 실시간 업데이트 기능을 위한 서버 사이드 지원 설정 방법을 설명합니다.

:::note
이 문서는 DHTMLX Scheduler v7.2의 Live Updates 모드 구현에 대해 다룹니다. 이전 버전의 정보는 [여기](guides/live-update.md)에서 확인하세요.
:::

## 원리

DHTMLX Scheduler는 여러 사용자의 변경 사항을 즉시 동기화하기 위해 `RemoteEvents` 헬퍼를 포함하고 있습니다.

### 주요 워크플로우

- `RemoteEvents` 클라이언트는 Scheduler가 초기화되자마자 WebSocket 연결을 엽니다.
- 이벤트 생성, 수정, 삭제와 같은 사용자 동작은 `DataProcessor`를 통해 REST API로 서버에 전송됩니다.
- 서버는 이러한 동작을 처리한 후, WebSocket을 통해 모든 연결된 클라이언트에 업데이트를 브로드캐스트합니다.
- `RemoteEvents` 클라이언트는 이 업데이트를 받아 Scheduler에 적용하여, 모든 사용자가 동일한 데이터를 볼 수 있도록 합니다.

이 구조는 하나의 앱 내에서 여러 DHTMLX 위젯(예: Kanban, Gantt, Scheduler 등)을 동시에 사용할 때, 별도의 백엔드 없이도 동기화를 쉽게 할 수 있도록 공통 포맷을 사용합니다.

## 프론트엔드 통합

Scheduler 데이터가 로드되는 코드 부분에 `RemoteEvents`와 `DataProcessor`를 함께 설정합니다.

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

### 주요 사항

- `RemoteEvents` 생성자에는 인증 토큰이 필요하며, 이는 서버 검증을 위해 **"Remote-Token"** 헤더에 포함됩니다.
- 첫 번째 인자는 `WebSocket` 엔드포인트(예: **/api/v1**)입니다.
- `remoteUpdates` 헬퍼는 수신된 `WebSocket` 메시지를 처리하여 Scheduler 데이터를 동기화합니다.

## 백엔드 구현

이 섹션에서는 실시간 업데이트를 지원하는 백엔드 구현 방법을 안내합니다.

### 간단한 예제

- [GitHub의 예제 보기](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

체험 방법:

- 백엔드 프로젝트를 다운로드하여 `npm install` 및 `npm run start`로 실행합니다.
- 프론트엔드 예제를 두 개의 브라우저 탭에서 엽니다.
- 한 탭에서 이벤트를 수정하면 다른 탭에서도 변경 사항이 나타나는 것을 확인할 수 있습니다.

### 서버 사이드 워크플로우

#### 1. 핸드셰이크 요청

`RemoteEvents`가 시작되면, 연결 설정을 위해 서버에 **GET** 요청을 보냅니다.

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

핸드셰이크 후, `RemoteEvents`는 엔드포인트를 사용하여 WebSocket 연결을 엽니다.

예시:

~~~
ws://${URL}?token=${token}&ws=1
~~~

서버는 토큰을 확인하고 다음과 같은 메시지로 응답합니다:

~~~
{"action":"start","body":"connectionId"}
~~~

예시 코드 스니펫:

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

연결이 완료되면, `RemoteEvents`는 특정 엔터티에 대한 업데이트를 구독합니다 - Scheduler의 경우 `events`입니다:

~~~json
{"action":"subscribe","name":"events"}
~~~

업데이트 수신을 중단하려면:

~~~json
{"action":"unsubscribe","name":"events"}
~~~

:::note
이 구조는 여러 DHTMLX 위젯을 동시에 사용하는 앱에서 각 위젯이 필요한 업데이트만 구독할 수 있게 해줍니다.
:::

서버 사이드 처리 예시:

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

#### 4. 업데이트 브로드캐스트

서버는 이벤트 생성, 수정, 삭제에 대해 클라이언트에 WebSocket 메시지를 보내며, 이 포맷을 따릅니다.

이 메시지가 도착하면 Scheduler는 `remoteUpdates` 헬퍼를 통해 자동으로 데이터를 갱신합니다.

**이벤트 생성됨**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"add-event","event":EVENT_OBJECT}}}
~~~

예시:

~~~js
app.post('/events', (req, res) => {
    const newEvent = req.body.event;
    const insertedEvent = crud.events.insert(newEvent);

    // 모든 연결된 클라이언트에 새 이벤트 알림
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

**이벤트 수정됨**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"update-event","event":EVENT_OBJECT}}}
~~~

예시:

~~~js
app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const updatedEvent = req.body.event;

    crud.events.update(id, updatedEvent);

    // 클라이언트에 업데이트 알림
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

**이벤트 삭제됨**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"delete-event","event":{"id":ID}}}}
~~~

예시:

~~~js
app.delete('/events/:id', (req, res) => {
    const id = req.params.id;

    crud.events.delete(id);

    // 클라이언트에 삭제 알림
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

## 고급 커스터마이징

### 커스텀 핸들러

`RemoteEvents` 헬퍼는 초기 핸드셰이크 및 WebSocket 연결을 관리하고, `remoteUpdates` 헬퍼는 수신 메시지를 처리하여 Scheduler를 업데이트합니다.

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

일반적으로 이 헬퍼들은 별도 설정 없이 바로 동작합니다. 그러나 특정 원격 업데이트 시나리오에 맞게 커스텀 핸들러 또는 헬퍼를 추가하여 프로토콜을 확장할 수도 있습니다.

`RemoteEvents.on` 메서드는 하나 이상의 엔터티에 대한 핸들러를 정의하는 객체를 받을 수 있습니다:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "add-event":
                // add 이벤트 처리
                break;
            case "update-event":
                // update 이벤트 처리
                break;
            case "delete-event":
                // delete 이벤트 처리
                break;
        }
    }
});
~~~

커스텀 액션을 처리하려면, `remoteEvents`에 또 다른 핸들러를 추가할 수 있습니다:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "custom-action":
                // 커스텀 액션 처리
                break;
        }
    }
});
~~~

이 핸들러는 다음과 같은 메시지에 의해 트리거됩니다:

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"custom-action","event":value}}}
~~~

커스텀 엔터티의 업데이트를 받으려면, 해당 핸들러를 추가하면 됩니다:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// 커스텀 엔터티 구독
remoteEvents.on({ 
    calendars: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // 커스텀 액션 처리
                break;
        }
    }
});
~~~

이렇게 하면, `remoteEvents`는 다음과 같은 구독 메시지를 전송합니다:

~~~json
{"action":"subscribe","name":"calendars"}
~~~

그리고 핸들러는 다음과 같은 메시지에 응답합니다:

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

이 가이드는 DHTMLX Scheduler에서 실시간 업데이트를 설정하고 커스터마이징하는 기본 원리를 설명합니다. 전체 동작 예제는 GitHub 저장소에서 확인하세요.
