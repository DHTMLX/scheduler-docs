---
title: "Интеграция с серверной стороной"
sidebar_label: "Интеграция с серверной стороной"
---

# Интеграция с серверной стороной

Лучший способ связать dhtmlxScheduler с сервером - настроить RESTful API на сервере и использовать dhtmlxDataProcessor на клиентской стороне.

[DataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) - это клиентская библиотека, включённая в dhtmlxScheduler.js. Она отслеживает изменения данных и управляет серверными запросами с клиента.

Вы можете подключить dhtmlxScheduler к серверу через REST API, используя различные фреймворки и языки программирования. Ниже приведён список серверных реализаций, доступных для интеграции Scheduler с сервером:

- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с PHP: Slim 3](integrations/other/howtostart-php.md)

## Техника {#technique}

В общем случае, чтобы загрузить данные с сервера через REST API, необходимо:

### Клиентская сторона

1) Использовать метод [load](api/method/load.md), указав URL, который возвращает данные Scheduler в формате [JSON](guides/data-formats.md#json).

2) Использовать метод [createDataProcessor](api/method/createdataprocessor.md) и передать объект с параметрами конфигурации:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

В качестве альтернативы вы можете создать dataProcessor с помощью конструктора и привязать его к объекту dhtmlxScheduler. Конструктор scheduler.DataProcessor() принимает путь к серверному скрипту:

~~~js
scheduler.init("scheduler_here", new Date(), "month");
scheduler.load("apiUrl");

const dp = new scheduler.DataProcessor("apiUrl");
dp.init(scheduler);
~~~

Более подробная информация приведена в следующем разделе.

### Создание DataProcessor {#createdp}

При создании DataProcessor через API-метод [createDataProcessor](api/method/createdataprocessor.md) вы можете передать параметры несколькими способами.

1. Использовать один из предопределённых режимов запросов, например:

~~~js
const dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

где:

- **url** - серверный URL
- **mode** - способ отправки данных на сервер: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2. Указать пользовательский объект **router**:

~~~js
const dp = scheduler.createDataProcessor(router);
~~~

где router может быть функцией:

~~~js
const server = "/api";

// entity - "event"
// action - "create"|"update"|"delete"
// data - объект с данными события
// id – id обрабатываемого объекта (события)
const dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
               return scheduler.ajax.post(
                `${server}/${entity}`,
                data
               );
        break;
        case "update":
               return scheduler.ajax.put(
                `${server}/${entity}/${id}`,
                data
            );
        break;
        case "delete":
               return scheduler.ajax.del(
                `${server}/${entity}/${id}`
               );
        break;
       }
});
~~~

или объектом следующей структуры:

~~~js
const dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

Все функции router должны возвращать либо Promise, либо объект ответа с данными. Это позволяет dataProcessor назначать id из базы данных и инициировать событие **onAfterUpdate**.

~~~js
const router = function(entity, action, data, id) {
    return new Promise(function(resolve, reject) {
        // … некоторая логика
        return resolve({tid: databaseId});
    });
}
~~~

Таким образом, DataProcessor можно использовать для сохранения данных в localStorage или любом хранилище, не привязанном к определённому URL, либо когда создание и удаление объектов обрабатываются разными серверами (URL).
  
### Детали запросов и ответов {#requestresponsedetails}

URL строится по следующему шаблону:

- api/eventId

где "api" - это URL, указанный в конфигурации dataProcessor.


#### Режим REST

Чтобы использовать режим REST, установите свойство `mode` объекта конфигурации [createDataProcessor](api/method/createdataprocessor.md) в значение "REST":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

Типичные запросы и ответы:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>загрузка данных</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>добавить новое событие</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>("action":"inserted","tid":"eventId")</td>
  </tr>
  <tr>
  <td>обновить событие</td>
  <td>PUT</td>
  <td>/apiUrl/:id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>удалить событие</td>
  <td>DELETE</td>
  <td>/apiUrl/:id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

#### Режим REST-JSON

Чтобы использовать режим REST-JSON, установите свойство `mode` объекта конфигурации [createDataProcessor](api/method/createdataprocessor.md) в значение "REST-JSON":
~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST-JSON"
});

~~~

В этом режиме scheduler отправляет запросы POST/PUT/DELETE с типом содержимого `application/json`.

Запросы и ответы выглядят следующим образом:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Тело запроса</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>загрузка данных</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td></td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>добавить новое событие</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... )</td>
  <td>( "action":"inserted", "tid":"eventId" )</td>
  </tr>
  <tr>
  <td>обновить событие</td>
  <td>PUT</td>
  <td>/apiUrl/:id</td>
  <td>( "start_date":"2024-12-18 00:00", "end_date":"2024-12-18 00:05", "text":"New event", ... )</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>удалить событие</td>
  <td>DELETE</td>
  <td>/apiUrl/:id</td>
  <td></td>
  <td>("action":"deleted")</td>
  </tr>
</table>

#### Режим POST

Чтобы использовать режим POST, установите свойство `mode` объекта конфигурации [createDataProcessor](api/method/createdataprocessor.md) в значение "POST":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "POST"
});
~~~


Запросы и ответы в этом режиме:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>загрузка данных</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>

  <tr>
  <td>обновить событие</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>("action":"inserted|updated|deleted", "tid":"eventId")</td>
  </tr>
</table>

#### Режим JSON

Чтобы использовать режим JSON, установите свойство `mode` объекта конфигурации [createDataProcessor](api/method/createdataprocessor.md) в значение "JSON":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "JSON"
});
~~~

В этом режиме scheduler отправляет POST-запрос на сервер после каждого изменения данных (аналогично режиму POST, но с другим форматом запроса).

Запросы и ответы выглядят следующим образом:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>Тело запроса</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>загрузка данных</td>
  <td>GET</td>
  <td></td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>добавить новое событие</td>
  <td>POST</td>
  <td>( "id": temporaryId, "action":"inserted", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>( "action":"inserted", "tid":"eventId" )</td>
  </tr>
  <tr>
  <td>обновить событие</td>
  <td>POST</td>
  <td>( "id": id, "action":"updated", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>удалить событие</td>
  <td>POST</td>
  <td>( "id": id, "action":"deleted", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>("action":"deleted")</td>
  </tr>
</table>


#### Динамическая загрузка

Запросы и ответы для динамической загрузки выглядят так:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>загрузка данных</td>
  <td>GET</td>
  <td>/apiUrl?from=minDate&to=maxDate</td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>
</table>

### Параметры запроса

Запросы на создание/обновление/удаление содержат все публичные свойства клиентского объекта события:

- **id**: 71
- **start_date**: 2024-11-04 15:00
- **end_date**: 2024-11-04 18:00
- **text**:  Recinto Ferial - Valencia 
- **details**: Details for  Recinto Ferial - Valencia 
- **!nativeeditor_status**: updated

:::note
Параметр **!nativeeditor_status** применяется только в режиме POST.
:::

### Серверная сторона

Каждый раз, когда в Scheduler выполняется какое-либо действие, например добавление, обновление или удаление событий, dataProcessor реагирует, отправляя AJAX-запрос на сервер.

Каждый запрос содержит все необходимые данные для сохранения изменений в базе данных. Поскольку dataProcessor настроен в режиме REST, он использует разные HTTP-методы в зависимости от типа операции.

:::note
Если вы по каким-либо причинам предпочитаете не использовать REST API, хорошей альтернативой является [использование библиотеки dhtmlxConnector](integrations/other/howtostart-connector.md).
:::

## Повторяющиеся события {#recurringevents}

Повторяющиеся события сохраняются в базе данных как записи, которые включают все [поля обычного события](guides/loading-data.md#dataproperties), а также ряд дополнительных полей: **rrule**, **duration**, **recurring_event_id**, **original_start** и **deleted**.

Подробнее об этом можно узнать в статье [Recurring Events](guides/recurring-events.md).

Помимо этих дополнительных полей, серверный контроллер требует особой логики:

- Для действия **insert**:
  - если **event.deleted === true**, в ответе должен быть указан статус 'deleted'
- Для действия **update**:
  - если **event.rrule** не пустое и **event.recurring_event_id** пустое, все события с **recurring_event_id == event.id** должны быть удалены
- Для действия **delete**:
  - если **event.rrule** не пустое и **event.recurring_event_id** пустое, все события с **recurring_event_id == event.id** должны быть удалены
  - если **event.recurring_event_id** не пустое, событие должно быть обновлено с **event.deleted = true** вместо удаления

:::note
Подробный пример редактирования и удаления повторяющихся событий вы можете найти в [соответствующем разделе статьи Recurring Events](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries).
:::


## Пользовательские заголовки и параметры запроса {#customrequestheadersandparameters}

### Добавление пользовательских заголовков запроса

Если необходимо, чтобы Scheduler отправлял дополнительные заголовки на ваш backend, вы можете указать их с помощью метода [dataProcessor.setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html).

Например, чтобы добавить токен авторизации в ваши запросы:

~~~js
scheduler.init("scheduler_here");
scheduler.load("/api");
 
const dp = scheduler.createDataProcessor("/api");
dp.init(scheduler);
dp.setTransactionMode({
    mode:"REST",
    headers: {
       "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

В настоящее время [load](api/method/load.md) не поддерживает передачу заголовков или параметров payload для GET-запросов, поэтому если они вам необходимы, вам потребуется отправить xhr-запрос вручную и загрузить данные в Scheduler с помощью [parse](api/method/parse.md), как показано ниже:

~~~js
const authToken = '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b';

fetch("/api", {
    method: "GET", 
    headers: {
        "Content-Type": "application/json", 
        "Authorization": `Token  ${authToken}`
    }
})
.then(response => response.json()) 
.then(data => {
    scheduler.parse(data);
})
.catch(error => {
    console.error("Error:", error);
});
~~~

### Добавление пользовательских параметров в запрос

Существует несколько способов добавить дополнительные параметры в запросы.

Поскольку scheduler отправляет все свойства объекта данных обратно на backend, вы можете просто добавить дополнительное свойство непосредственно в *data object*, и оно будет отправлено:

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    const event = scheduler.getEvent(id);
    event.userId = currentUser;
    return true;
});
~~~

Также можно добавить пользовательские параметры во все запросы, отправляемые dataProcessor, используя свойство **payload** параметра [setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html):

~~~js
scheduler.init("gantt_here");
scheduler.load("/api");
 
const dp = scheduler.createDataProcessor("/api");
dp.init(scheduler);
dp.setTransactionMode({
    mode:"REST",
    payload: {
       token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Payload будет добавлен к строке запроса.

Другой способ - использовать событие [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) объекта DataProcessor:

~~~js
const dp = scheduler.createDataProcessor("data/events.php");

dp.attachEvent("onBeforeUpdate", function(id, state, data){
    data.productName = "Product 2";
    return true;
});
~~~

Это событие срабатывает для каждой записи, отправляемой на backend, и пользовательский параметр будет добавлен к каждому событию Scheduler с id события в качестве префикса, например:

~~~js
123_productName:Product 2
~~~


## Запуск сохранения данных из скрипта {#triggeringdatasavingfromscript}

После инициализации dataProcessor любые изменения, сделанные пользователем или через код, будут автоматически сохранены в источник данных.

Для программного обновления определённого события обычно используется метод [addEvent](api/method/addevent.md):

~~~js
scheduler.parse([
     { id:1, start_date:"2017-05-13 6:00", end_date:"2017-05-13 8:00", text:"Event 1"},
     { id:2, start_date:"2017-06-09 6:00", end_date:"2017-06-09 8:00", text:"Event 2"}
]);

const event = scheduler.getEvent(1);
event.text = "Conference"; // изменяет данные события
scheduler.addEvent(event); // отображает обновлённое событие
~~~

Если этот метод вызывается для события, уже загруженного в scheduler, [addEvent](api/method/addevent.md) инициирует запрос *update*; иначе - запрос *insert*.

Эти методы вызывают отправку обновлений на backend:

- [addEvent](api/method/addevent.md)
- [deleteEvent](api/method/deleteevent.md)


## Сохранение изменений без DataProcessor {#savingchangeswithoutdataprocessor}

dhtmlxScheduler также может использоваться без gantt.dataProcessor. В этом случае вам потребуется самостоятельно отслеживать все изменения, внесённые в scheduler, и затем отправлять их на backend.

Следует слушать следующие события:

- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)
- [onEventDeleted](api/event/oneventdeleted.md)

Когда на стороне клиента создаётся новое событие, оно изначально получает временный id, пока не получит постоянный id из базы данных.

После вставки нового элемента в базу данных вы должны отправить новый id обратно клиенту и обновить соответствующее событие с помощью метода [changeEventId](api/method/changeeventid.md):

~~~js
// предположим, что eventService — это реализация CRUD-сервиса

scheduler.attachEvent('onEventAdded', function(id, event) {
  eventService.create(event)
    .then(function(result){
      scheduler.changeEventId(id, result.databaseId);
    });
});

scheduler.attachEvent('onEventChanged', function(id, event) {
  eventService.update(event);
});

scheduler.attachEvent('onEventDeleted', function(id) {
  eventService.delete(id);
});
~~~

## Кастомные маршруты {#customrouting}

Если RESTful AJAX API не подходит для вашего backend или вы хотите вручную контролировать, какие данные отправляются на сервер, можно использовать кастомные маршруты.

Например, во фреймворках Angular или React компоненты могут не отправлять изменения напрямую на сервер, а передавать их другому компоненту, ответственному за сохранение данных.

Для настройки кастомных маршрутов для DataProcessor используйте метод [**createDataProcessor()**](#createdp):

~~~js
const server = "/api";

scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
            return scheduler.ajax.post(
                `${server}/${entity}`,
                data
            );
        break;
        case "update":
            return scheduler.ajax.put(
                `${server}/${entity}/${id}`,
                data
            );
        break;
        case "delete":
            return scheduler.ajax.del(
                `${server}/${entity}/${id}`
           );
        break;
    }
});
~~~

### Использование AJAX для настройки кастомных роутеров

[AJAX-модуль Scheduler](api/other/ajax.md) может быть полезен для кастомных маршрутов. Scheduler ожидает, что кастомный роутер вернёт Promise, представляющий результат операции, что помогает определить момент завершения действия.

AJAX-модуль поддерживает promises и хорошо работает внутри кастомных роутеров. Scheduler обработает Promise после его выполнения.

В примере ниже создаётся новая задача. Если ответ сервера содержит id только что созданной задачи, Scheduler сможет его применить.

~~~js
scheduler.createDataProcessor(function(entity, action, data, id){
...
 
    switch (action) {
        case "create":
            return scheduler.ajax.post({
                headers: { 
                    "Content-Type": "application/json" 
                },
                url: server + "/" + entity + "/" + id,
                data: JSON.stringify(data)
            });
        break;
    }
});
~~~

## Обработка ошибок {#errorhandling}

Сервер может уведомить Scheduler о неудачном действии, вернув ответ с "action":"error":

~~~js
{"action":"error"}
~~~

Этот ответ можно обработать на клиенте с помощью dataProcessor:

~~~js
const dp = scheduler.createDataProcessor("apiUrl");
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        // обработка ошибки
    }
});
~~~

Объект ответа может содержать дополнительные свойства, доступные через аргумент `response` в обработчике onAfterUpdate.

Если сервер возвращает ошибку, но изменения были сохранены на клиенте, лучший способ синхронизировать состояния - очистить данные клиента и заново загрузить корректные данные с сервера:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        scheduler.clearAll();
        scheduler.load(url);
    }
});
~~~

Если не требуется перезагружать все данные, можно удалить только одно событие на клиенте, используя параметр **silent** метода [deleteEvent](api/method/deleteevent.md):

~~~js
// удаляет указанное событие только на клиенте, без обращения к серверу
scheduler.deleteEvent(id, true); 
~~~

## XSS, CSRF и SQL-инъекции {#xsscsrfandsqlinjectionattacks}

Имейте в виду, что сам Scheduler не обеспечивает защиту от угроз, таких как SQL-инъекции, XSS или CSRF-атаки.

Обеспечение безопасности вашего приложения - ответственность backend-разработчиков.

Для получения дополнительной информации о возможных уязвимостях и способах повышения безопасности приложения обратитесь к статье [Безопасность приложения](guides/app-security.md).
