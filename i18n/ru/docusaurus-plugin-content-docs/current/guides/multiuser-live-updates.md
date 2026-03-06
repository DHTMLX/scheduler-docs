---
title: "Многопользовательские Live-обновления"
sidebar_label: "Многопользовательские Live-обновления"
---

# Многопользовательские Live-обновления

В этой статье описывается настройка серверной поддержки функции реального времени (Live Updates) в DHTMLX Scheduler.

:::note
Эта статья посвящена реализации режима Live Updates для DHTMLX Scheduler v7.2. Информацию о более ранних версиях смотрите [здесь](guides/live-update.md).
:::

## Принцип работы

DHTMLX Scheduler включает вспомогательный модуль `RemoteEvents`, который позволяет мгновенно синхронизировать изменения между несколькими пользователями.

### Основная схема работы

- Клиент `RemoteEvents` открывает WebSocket-соединение сразу после инициализации Scheduler.
- Действия пользователя, такие как создание, редактирование или удаление событий, отправляются на сервер через `DataProcessor` с использованием REST API.
- После обработки этих действий сервер рассылает обновления всем подключённым клиентам через WebSocket.
- Клиент `RemoteEvents` получает эти обновления и применяет их к Scheduler, обеспечивая, чтобы все пользователи видели одинаковые данные.

Такая схема поддерживает работу с несколькими виджетами DHTMLX (например, Kanban, Gantt, Scheduler) в одном приложении, используя общий формат, который упрощает синхронизацию и не требует отдельного бэкенда для каждого виджета.

## Интеграция на фронтенде

Настройте `RemoteEvents` и `DataProcessor` вместе в той части кода, где загружаются данные Scheduler.

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

### Важные детали

- Конструктор `RemoteEvents` требует токен авторизации, который отправляется в заголовке **"Remote-Token"** для проверки на сервере.
- Первый аргумент - это endpoint для `WebSocket` (например, **/api/v1**).
- Вспомогательный модуль `remoteUpdates` обрабатывает входящие сообщения по `WebSocket` и поддерживает синхронизацию данных Scheduler.

## Реализация на сервере

В этом разделе описано, как создать сервер, поддерживающий live-обновления.

### Упрощённый пример

- [Смотрите пример на GitHub](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

Чтобы попробовать:

- Скачайте и запустите backend-проект с помощью `npm install` и `npm run start`.
- Откройте пример frontend в двух вкладках браузера.
- Отредактируйте событие в одной вкладке и увидьте изменения в другой.

### Схема работы на сервере

#### 1. Запрос handshake

Когда запускается `RemoteEvents`, он отправляет **GET**-запрос на сервер для установки соединения.

Пример:
~~~
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

Ответ:

~~~
{"api":{},"data":{},"websocket":true}
~~~

#### 2. WebSocket-соединение

После handshake `RemoteEvents` открывает WebSocket-соединение, используя указанный endpoint.

Пример:

~~~
ws://${URL}?token=${token}&ws=1
~~~

Сервер проверяет токен и отвечает сообщением вида:

~~~
{"action":"start","body":"connectionId"}
~~~

Пример кода:

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

#### 3. Подписка

После подключения `RemoteEvents` подписывается на обновления определённых сущностей - для Scheduler это `events`:

~~~json
{"action":"subscribe","name":"events"}
~~~

Чтобы прекратить получение обновлений:

~~~json
{"action":"unsubscribe","name":"events"}
~~~

:::note
Такая схема отлично подходит для приложений, использующих несколько виджетов DHTMLX одновременно. Каждый виджет может подписываться только на нужные ему обновления.
:::

Пример обработки на сервере:

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

#### 4. Рассылка обновлений

Сервер отправляет сообщения по WebSocket, чтобы уведомить клиентов о создании, изменении или удалении событий, следуя следующему формату.

Когда такие сообщения приходят, Scheduler использует helper `remoteUpdates` для автоматического обновления данных.

**Событие создано**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"add-event","event":EVENT_OBJECT}}}
~~~

Пример:

~~~js
app.post('/events', (req, res) => {
    const newEvent = req.body.event;
    const insertedEvent = crud.events.insert(newEvent);

    // Уведомить всех клиентов о новом событии
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

**Событие обновлено**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"update-event","event":EVENT_OBJECT}}}
~~~

Пример:

~~~js
app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const updatedEvent = req.body.event;

    crud.events.update(id, updatedEvent);

    // Уведомить клиентов об обновлении
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

**Событие удалено**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"delete-event","event":{"id":ID}}}}
~~~

Пример:

~~~js
app.delete('/events/:id', (req, res) => {
    const id = req.params.id;

    crud.events.delete(id);

    // Сообщить клиентам об удалении
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

## Расширенная настройка

### Пользовательские обработчики

Вспомогательный модуль `RemoteEvents` отвечает за начальный handshake и WebSocket-соединение, а helper `remoteUpdates` - за обработку входящих сообщений и обновление данных Scheduler.

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

Обычно этих helper-ов достаточно "из коробки". Однако, при необходимости можно расширить протокол, добавив собственные обработчики или helper-ы для специфических сценариев удалённых обновлений.

Метод `RemoteEvents.on` принимает объект, в котором можно определить обработчики для одной или нескольких сущностей:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "add-event":
                // обработать добавление события
                break;
            case "update-event":
                // обработать обновление события
                break;
            case "delete-event":
                // обработать удаление события
                break;
        }
    }
});
~~~

Чтобы обрабатывать пользовательские действия, можно добавить ещё один обработчик в `remoteEvents`:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "custom-action":
                // обработать пользовательское действие
                break;
        }
    }
});
~~~

Этот обработчик будет вызван сообщениями вида:

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"custom-action","event":value}}}
~~~

Чтобы получать обновления для пользовательских сущностей, добавьте соответствующий обработчик:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// подписка на пользовательские сущности
remoteEvents.on({ 
    calendars: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // обработать пользовательское действие
                break;
        }
    }
});
~~~

При такой настройке `remoteEvents` отправит сообщение о подписке:

~~~json
{"action":"subscribe","name":"calendars"}
~~~

А обработчик будет реагировать на сообщения вида:

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

Это руководство описывает основы настройки и расширения live-обновлений в DHTMLX Scheduler. Для полного рабочего примера посетите репозиторий на GitHub.
