---
title: "Live Updates Mode (Устаревший)"
sidebar_label: "Live Updates Mode (Устаревший)"
---

# Live Updates Mode (Устаревший)

:::warning
 Данный функционал устарел и больше не поддерживается.
:::
:::note
Эта статья описывает устаревшую версию режима Live Updates для DHTMLX Scheduler. Информацию о последней версии смотрите [здесь](guides/multiuser-live-updates.md).
:::

Режим Live Update поддерживает синхронизацию данных между пользователями в реальном времени.

Когда один пользователь вносит изменения, они мгновенно отображаются у всех остальных.

В этом режиме используется библиотека сокетов `Faye` для обеспечения быстрых и гибких обновлений без необходимости обновлять страницу (обновляется только соответствующий компонент).

Здесь вы найдете простой пошаговый гид по использованию этой функции.

## Основной принцип

Live updates работают путем трансляции изменений от одного подключенного клиента ко всем остальным. Для этого используется WebSocket-соединение, которое обеспечивает двустороннюю связь между клиентами и сервером.

В этой версии модуль Live Updates расширяет модуль `DataProcessor` для использования клиентской библиотеки `Faye`, а также серверного приложения, которое распределяет сообщения между клиентами.

Настройка включает три компонента:

1. **Фронтенд** с Scheduler и модулем `DataProcessor`.
2. **Бэкенд**, обрабатывающий CRUD-операции с базой данных.
3. **live-updates hub**, управляющий клиентскими соединениями.

Когда пользователь изменяет данные:

- **Фронтенд** отправляет обновление на **бэкенд**.
- Одновременно **фронтенд** отправляет то же обновление в **live-updates hub**.
- **live-updates hub** транслирует обновление всем подключенным клиентам.
- Получив обновление от **live-updates hub**, **фронтенд** применяет его к данным Scheduler без инициирования CRUD-операций на бэкенде.

## Перед началом

Для прохождения этого руководства вам потребуется рабочее приложение dhtmlxScheduler, интегрированное с серверной логикой, которая загружает данные из базы и сохраняет изменения обратно. (Подробнее [здесь](integrations/howtostart-guides.md).)

Простой пример может выглядеть так:

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

## Настройка Live Updates

:::note
Данная реализация Live Updates устарела и не входит в основной пакет.
:::

### Шаг 1. Установка

1. Скачайте **Live Updates plugin** для Scheduler: [download link](https://files.dhtmlx.com/30d/20deb2ff205dc16bc94a7e9fcef4c5fe/live_updates.zip)
2. Скачайте **Live Updates backend** приложение: [download link](https://files.dhtmlx.com/30d/57084e02b121f14bb14b6734d465ad41/websocket-backend.zip)
3. Запустите **Live Updates backend**, следуя инструкциям в его readme-файле.

### Шаг 2. Настройка фронтенда

Чтобы включить режим Live Update, добавьте два дополнительных файла в фронтенд-приложение:

- **live_updates.js** - файл плагина из предыдущего шага
- **client.js** - файл, динамически генерируемый WebSocket-бэкендом

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="http://localhost:8008/client.js"></script>
~~~

В этом примере подключение идет напрямую к WebSocket-приложению. Обычно рекомендуется проксировать этот URL через основное приложение, чтобы скрыть адрес и порт вспомогательного сервиса. Это можно сделать, настроив reverse proxy.

**Проксирование запросов через основное приложение (Node.js):**

~~~js
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

module.exports = function(app){
    app.all("/liveUpdates*", function(req, res) {
        proxy.web(req, res, {target: "http://localhost:8008"});
    });
}
~~~

**Фронтенд:**

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="/liveUpdates/client.js"></script>
~~~

### Шаг 3. Активация Live Updates

Активируйте режим, вызвав метод **live_updates()** у экземпляра `DataProcessor`. Убедитесь, что `DataProcessor` уже инициализирован. Метод принимает в качестве параметра URL точки входа WebSocket.

~~~js
const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST"
});

dp.live_updates("/liveUpdates");
~~~

Полное демо-приложение можно скачать [здесь](https://files.dhtmlx.com/30d/0aea2facd959a8300bf7caec3f5a7f42/dhtmlxscheduler-live-updates.zip).
