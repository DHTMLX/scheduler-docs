---
title: Многопользовательские Live-обновления
sidebar_label: "Многопользовательские Live-обновления"
---

# Многопользовательские Live-обновления

:::note
Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/scheduler-multiuser-backend-demo/).
:::

:::note
Эта статья относится к реализации режима Live Updates для DHTMLX Scheduler версии 7.2. Подробности по более ранним версиям [здесь](guides/live-update.md).
:::

## Принцип

DHTMLX Scheduler предоставляет помощник `RemoteEvents` для синхронизации изменений между несколькими пользователями в реальном времени.

### Основная схема работы

- Клиент `RemoteEvents` устанавливает соединение WebSocket при инициализации Scheduler.
- Изменения пользователя (создание, редактирование или удаление событий) отправляются на сервер через `DataProcessor` с использованием REST API.
- Сервер транслирует обновления всем подключенным клиентам через WebSocket после обработки.
- Клиент `RemoteEvents` получает обновления и применяет их к Scheduler, обеспечивая синхронизацию между пользователями.

Дизайн позволяет этому бекенд-модулю поддерживать несколько виджетов DHTMLX (например, Kanban, Gantt, Scheduler) в одном приложении. Общий формат упрощает синхронизацию данных без необходимости отдельных бэкендов для каждого виджета.

## Интеграция на стороне клиента

Инициализируйте `RemoteEvents` и настройте `DataProcessor` в той же секции кода, где загружаются данные Scheduler.

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

### Ключевые детали

- Конструктор `RemoteEvents` требует токен авторизации, который отправляется в заголовке **"Remote-Token"** для проверки на стороне сервера.
- Первый аргумент указывает конечную точку `WebSocket` (например, **/api/v1**).
- Помощник `remoteUpdates` обрабатывает входящие сообщения `WebSocket` и синхронизирует данные Scheduler.

## Реализация на стороне сервера

Эта секция описывает, как построить бэкенд, поддерживающий обновления в реальном времени.

### Упрощённый пример

- [См. пример на GitHub](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

Чтобы протестировать реализацию:

- Распакуйте и запустите бэкенд-проект, выполнив команды `npm install` и `npm run start`.
- Откройте фронтенд-пример в двух отдельных вкладках браузера.
- Измените событие в одной вкладке; изменения должны появиться во второй вкладке.

### Рабочий процесс на стороне сервера

#### 1. Запрос рукопожатия

При инициализации `RemoteEvents` отправляет GET-запрос на сервер для установления соединения.

Пример:
~~~ 
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

Ответ:

~~~ 
{"api":{},"data":{},"websocket":true}
~~~

#### 2. Соединение WebSocket

После получения ответа `RemoteEvents` устанавливает соединение WebSocket с указанной точкой.

Пример:

~~~ 
ws://${URL}?token=${token}&ws=1
~~~

Сервер проверяет токен и отвечает сообщением:

~~~ 
{"action":"start","body":"connectionId"}
~~~

Пример реализации:

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

После установки соединения `RemoteEvents` подписывается на обновления для конкретных сущностей, например `events` для Scheduler:

~~~json
{"action":"subscribe","name":"events"}
~~~

Чтобы отписаться:

~~~json
{"action":"unsubscribe","name":"events"}
~~~

:::note
Этот формат поддерживает сценарии, когда приложение одновременно использует несколько виджетов DHTMLX. Каждый виджет подписывается лишь на обновления, относящиеся к его данным.
:::

Пример:

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
        console.error('Ошибка разбора сообщения WebSocket:', err);
    }
});
~~~

#### 4. Рассылка обновлений

Сервер отправляет обновления через WebSocket для изменений вроде создания, обновления или удаления событий в формате, приведённом ниже.

После получения этих сообщений `Scheduler` автоматически синхронизирует данные с помощью помощника `remoteUpdates`.

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

    // Рассылка изменений подключенным клиентам
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

    // Рассылка изменений подключенным клиентам
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

    // Рассылка удаления подключенным клиентам
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

## Продвинутые способы настройки

### Пользовательские обработчики

В описанном формате помощник `RemoteEvents` отвечает за начальное рукопожатие и установление WebSocket-соединения с сервером и получение сообщений.
Вторая часть модуля — помощник `remoteUpdates`, который отвечает за разбор сообщений, получаемых через WebSocket, и применение соответствующих изменений к Scheduler.

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

Обычно эти помощники можно использовать без дополнительной настройки. Но возможно расширить существующий протокол, добавив дополнительный помощник или реализовав пользовательский обработчик для удалённых обновлений.

Метод `RemoteEvents.on` принимает объект-аргумент, в котором можно задать обработчики для одной или нескольких сущностей:

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

Если нужно добавить настраиваемое действие, можно сделать это, добавив дополнительный обработчик для `remoteEvents`:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "custom-action":
                // обработать настраиваемое действие
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

Если вы хотите использовать `RemoteEvents` для получения обновлений по настраиваемым сущностям, можно сделать это, добавив обработчик:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// подписка на настраиваемые сущности
remoteEvents.on({ 
    calendars: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // обработать настраиваемое действие
                break;
        }
    }
});
~~~

При инициализации таким образом объект `remoteEvents` отправит через WebSocket сообщение подписки в формате:

~~~json
{"action":"subscribe","name":"calendars"}
~~~

И обработчик будет вызываться каждый раз, когда будет получено сообщение, адресованное указанной сущности:

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

Это руководство предоставляет базу для реализации и настройки обновлений в реальном времени в DHTMLX Scheduler. Для полного примера смотрите [репозиторий на GitHub](https://github.com/DHTMLX/scheduler-multiuser-backend-demo/).