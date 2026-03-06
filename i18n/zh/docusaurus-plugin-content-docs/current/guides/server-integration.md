---
title: "服务器端集成"
sidebar_label: "服务器端集成"
---

# 服务器端集成

将 dhtmlxScheduler 与后端连接的最佳方式是在服务器端设置 RESTful API，并在客户端使用 dhtmlxDataProcessor。

[DataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 是包含在 dhtmlxScheduler.js 中的客户端库。它负责跟踪数据的变更并管理来自客户端的服务器请求。

你可以通过 REST API 将 dhtmlxScheduler 与各种框架和编程语言的服务器端集成。以下是 Scheduler 后端集成可用的服务器端实现列表:

- [dhtmlxScheduler와 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler와 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler와 PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler와 PHP:Laravel 연동하기](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler와 PHP:Slim 3](integrations/other/howtostart-php.md)

## 技术说明 {#technique}

通常，要通过 REST API 从服务器加载数据，你需要:

### 客户端

1) 使用 [load](api/method/load.md) 方法，指定返回 Scheduler 数据的 [JSON](guides/data-formats.md#json) 格式的 URL。

2) 使用 [createDataProcessor](api/method/createdataprocessor.md) 方法，并传递包含配置选项的对象:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

另外，你也可以使用构造函数创建 dataProcessor，并将其附加到 dhtmlxScheduler 对象。scheduler.DataProcessor() 构造函数接受服务器端脚本的路径:

~~~js
scheduler.init("scheduler_here", new Date(), "month");
scheduler.load("apiUrl");

const dp = new scheduler.DataProcessor("apiUrl");
dp.init(scheduler);
~~~

更详细的信息请参见下节。

### 创建 DataProcessor {#createdp}

通过 API 方法 [createDataProcessor](api/method/createdataprocessor.md) 创建 DataProcessor 时，你有多种方式传递参数。

1. 使用预定义的请求模式之一，例如:

~~~js
const dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

其中:

- **url** - 服务器端 URL
- **mode** - 向服务器发送数据的方法:"JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2. 提供自定义的 **router** 对象:

~~~js
const dp = scheduler.createDataProcessor(router);
~~~

router 可以是一个函数:

~~~js
const server = "/api";

// entity - "event"
// action - "create"|"update"|"delete"
// data - 包含事件数据的对象
// id – 被处理对象（事件）的 id
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

或是如下结构的对象:

~~~js
const dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

所有 router 函数都应返回 Promise 或数据响应对象。这样 dataProcessor 可以分配数据库 id 并触发 **onAfterUpdate** 事件。

~~~js
const router = function(entity, action, data, id) {
    return new Promise(function(resolve, reject) {
        // … 业务逻辑
        return resolve({tid: databaseId});
    });
}
~~~

通过这种方式，DataProcessor 可用于将数据保存到 localStorage 或任何不绑定到特定 URL 的存储，或者当对象的创建和删除由不同服务器（URL）处理时使用。
  
### 请求与响应详情 {#request-and-response-details}

URL 遵循如下模式:

- api/eventId

其中 "api" 是 dataProcessor 配置中指定的 URL。

#### REST 模式

要使用 REST 模式，请将 [createDataProcessor](api/method/createdataprocessor.md) 配置对象的 `mode` 属性设置为 "REST":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

典型的请求与响应如下:

<table class="dp_table">
  <tr>
  <th><b>操作</b></th><th><b>HTTP 方法</b></th><th><b>URL</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>加载数据</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON 格式](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>新增事件</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>("action":"inserted","tid":"eventId")</td>
  </tr>
  <tr>
  <td>更新事件</td>
  <td>PUT</td>
  <td>/apiUrl/:id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>删除事件</td>
  <td>DELETE</td>
  <td>/apiUrl/:id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

#### REST-JSON 模式 {#rest-json-mode}

要使用 REST-JSON 模式，请将 [createDataProcessor](api/method/createdataprocessor.md) 配置对象的 `mode` 属性设置为 "REST-JSON":
~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST-JSON"
});

~~~

在此模式下，scheduler 以 `application/json` content type 发送 POST/PUT/DELETE 请求。

请求与响应如下:

<table class="dp_table">
  <tr>
  <th><b>操作</b></th><th><b>HTTP 方法</b></th><th><b>URL</b></th><th><b>请求体</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>加载数据</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td></td>
  <td>[JSON 格式](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>新增事件</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... )</td>
  <td>( "action":"inserted", "tid":"eventId" )</td>
  </tr>
  <tr>
  <td>更新事件</td>
  <td>PUT</td>
  <td>/apiUrl/:id</td>
  <td>( "start_date":"2024-12-18 00:00", "end_date":"2024-12-18 00:05", "text":"New event", ... )</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>删除事件</td>
  <td>DELETE</td>
  <td>/apiUrl/:id</td>
  <td></td>
  <td>("action":"deleted")</td>
  </tr>
</table>

#### POST 模式

要使用 POST 模式，请将 [createDataProcessor](api/method/createdataprocessor.md) 配置对象的 `mode` 属性设置为 "POST":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "POST"
});
~~~

请求与响应如下:

<table class="dp_table">
  <tr>
  <th><b>操作</b></th><th><b>HTTP 方法</b></th><th><b>URL</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>加载数据</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON 格式](guides/data-formats.md#json)</td>
  </tr>

  <tr>
  <td>更新事件</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>("action":"inserted|updated|deleted", "tid":"eventId")</td>
  </tr>
</table>

#### JSON 模式 {#json-mode}

要使用 JSON 模式，请将 [createDataProcessor](api/method/createdataprocessor.md) 配置对象的 `mode` 属性设置为 "JSON":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "JSON"
});
~~~

在此模式下，scheduler 在每次数据更新后向服务器发送 POST 请求（类似 POST 模式，但请求格式不同）。

请求与响应如下:

<table class="dp_table">
  <tr>
  <th><b>操作</b></th><th><b>HTTP 方法</b></th><th><b>请求体</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>加载数据</td>
  <td>GET</td>
  <td></td>
  <td>[JSON 格式](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>新增事件</td>
  <td>POST</td>
  <td>( "id": temporaryId, "action":"inserted", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>( "action":"inserted", "tid":"eventId" )</td>
  </tr>
  <tr>
  <td>更新事件</td>
  <td>POST</td>
  <td>( "id": id, "action":"updated", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>删除事件</td>
  <td>POST</td>
  <td>( "id": id, "action":"deleted", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>("action":"deleted")</td>
  </tr>
</table>


#### 动态加载

动态加载的请求与响应如下:

<table class="dp_table">
  <tr>
  <th><b>操作</b></th><th><b>HTTP 方法</b></th><th><b>URL</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>加载数据</td>
  <td>GET</td>
  <td>/apiUrl?from=minDate&to=maxDate</td>
  <td>[JSON 格式](guides/data-formats.md#json)</td>
  </tr>
</table>

### 请求参数

创建/更新/删除请求包含客户端事件对象的所有公共属性:

- **id**: 71
- **start_date**: 2024-11-04 15:00
- **end_date**: 2024-11-04 18:00
- **text**:  Recinto Ferial - Valencia 
- **details**: Details for  Recinto Ferial - Valencia 
- **!nativeeditor_status**: updated

:::note
**!nativeeditor_status** 参数仅适用于 POST 模式。
:::

### 服务器端

每当在 Scheduler 中执行操作（如添加、更新或删除事件）时，dataProcessor 会通过发送 AJAX 请求与服务器进行交互。

每个请求都携带了保存数据库更改所需的所有数据。由于 dataProcessor 被设置为 REST 模式，因此会根据操作类型使用不同的 HTTP 动词。

:::note
如果您因任何原因不想使用 REST API，可以选择 [使用 dhtmlxConnector 库](integrations/other/howtostart-connector.md) 作为替代方案。
:::

## 循环事件 {#recurringevents}

循环事件在数据库中以记录的形式保存，这些记录包含了[常规事件的所有字段](guides/loading-data.md#dataproperties)，并额外包含以下字段:**rrule**、**duration**、**recurring_event_id**、**original_start** 和 **deleted**。

您可以在 [循环事件](guides/recurring-events.md#server-side-integration) 文章中找到更多详细信息。

除了这些额外字段外，服务器端控制器还需实现如下特定逻辑:

- 对于 **insert** 操作:
  - 如果 **event.deleted === true**，响应应返回 'deleted' 状态
- 对于 **update** 操作:
  - 如果 **event.rrule** 不为空且 **event.recurring_event_id** 为空，则需要删除所有 **recurring_event_id == event.id** 的事件
- 对于 **delete** 操作:
  - 如果 **event.rrule** 不为空且 **event.recurring_event_id** 为空，则必须删除所有 **recurring_event_id == event.id** 的事件
  - 如果 **event.recurring_event_id** 不为空，则应将该事件的 **event.deleted = true**，而不是直接删除

:::note
您可以在 [循环事件相关章节](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries) 查看编辑和删除循环事件的详细示例。
:::


## 自定义请求头和参数 {#customrequestheadersandparameters}

### 添加自定义请求头

如果需要 Scheduler 向后端发送额外的请求头，可以通过 [dataProcessor.setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) 方法进行设置。

例如，向请求中添加授权 token:

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

目前，[load](api/method/load.md) 不支持 GET 请求的 header 或 payload 参数，因此如有需要，您需手动发送 xhr 请求，并使用 [parse](api/method/parse.md) 将数据加载到 scheduler，如下:

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

### 向请求添加自定义参数

有多种方式可以在请求中包含额外参数。

由于 scheduler 会将数据对象的所有属性发送到后端，您可以直接在 *data object* 上添加额外属性，它就会被一并发送:

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    const event = scheduler.getEvent(id);
    event.userId = currentUser;
    return true;
});
~~~

另外，也可以通过 [setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) 方法的 **payload** 属性，为 dataProcessor 发送的所有请求添加自定义参数:

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

payload 会被追加到请求的查询字符串中。

另一种方式是使用 DataProcessor 的 [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) 事件:

~~~js
const dp = scheduler.createDataProcessor("data/events.php");

dp.attachEvent("onBeforeUpdate", function(id, state, data){
    data.productName = "Product 2";
    return true;
});
~~~

此事件会在每条记录发送到后端前触发，自定义参数会以事件 id 作为前缀添加到每个 Scheduler 事件中，如下:

~~~js
123_productName:Product 2
~~~


## 通过脚本触发数据保存 {#triggeringdatasavingfromscript}

一旦初始化了 dataProcessor，用户通过界面或代码做的任何更改都会自动保存到数据源。

若要以编程方式更新指定事件，通常使用 [addEvent](api/method/addevent.md) 方法:

~~~js
scheduler.parse([
     { id:1, start_date:"2017-05-13 6:00", end_date:"2017-05-13 8:00", text:"Event 1"},
     { id:2, start_date:"2017-06-09 6:00", end_date:"2017-06-09 8:00", text:"Event 2"}
]);

const event = scheduler.getEvent(1);
event.text = "Conference"; // 修改事件数据
scheduler.addEvent(event); // 显示已更新的事件
~~~

当对已加载到 scheduler 的事件调用该方法时，[addEvent](api/method/addevent.md) 会触发 *update* 请求；否则会触发 *insert*。

以下方法会将更新发送到后端:

- [addEvent](api/method/addevent.md)
- [deleteEvent](api/method/deleteevent.md)


## 无需 DataProcessor 保存更改 {#savingchangeswithoutdataprocessor}

dhtmlxScheduler 也可以在不使用 gantt.dataProcessor 的情况下使用。在这种情况下，您需要手动跟踪 scheduler 中的所有更改，并将其发送到后端。

需监听如下事件:

- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)
- [onEventDeleted](api/event/oneventdeleted.md)

在客户端新建事件时，最初会分配一个临时 id，直到获得数据库分配的正式 id。

将新项插入数据库后，应将新 id 返回给客户端，并通过 [changeEventId](api/method/changeeventid.md) 方法更新相关事件:

~~~js
// 假设 eventService 是某种 CRUD 服务实现

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

## 自定义路由 {#customrouting}

如果 RESTful AJAX API 不适合您的后端需求，或者您希望手动控制发送到服务器的内容，可以使用自定义路由。

例如，Angular 或 React 等框架的组件可能不会直接将更改发送到服务器，而是传递给另一个负责保存数据的组件。

要为 DataProcessor 设置自定义路由，请使用 [**createDataProcessor()**](#createdp) 方法:

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

### 使用 AJAX 设置自定义路由

[Scheduler AJAX 模块](api/other/ajax.md) 对于自定义路由非常有用。Scheduler 期望自定义路由返回一个 Promise，用于表示操作结果，以便检测操作是否完成。

AJAX 模块支持 Promise，并可在自定义路由中良好工作。Scheduler 会在 Promise 被解析后进行处理。

以下示例中，创建了一个新任务。如果服务器响应中包含新任务的 id，Scheduler 可以相应地进行应用。

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

## 错误处理 {#errorhandling}

服务器可以通过返回 "action":"error" 的响应通知 Scheduler 操作失败:

~~~js
{"action":"error"}
~~~

可以在客户端通过 dataProcessor 进行处理:

~~~js
const dp = scheduler.createDataProcessor("apiUrl");
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        // 在此处理错误
    }
});
~~~

响应对象可能包含其他属性，可以通过 onAfterUpdate 处理函数的 `response` 参数访问。

如果服务器返回错误但客户端已保存更改，最佳做法是清空客户端数据并从服务器重新加载正确数据:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        scheduler.clearAll();
        scheduler.load(url);
    }
});
~~~

如果不希望重新加载所有数据，也可以仅从客户端删除单个事件，使用 [deleteEvent](api/method/deleteevent.md) 方法的 **silent** 参数:

~~~js
// 仅从客户端移除指定事件，不与服务器交互
scheduler.deleteEvent(id, true); 
~~~

## XSS、CSRF 及 SQL 注入攻击 {#xsscsrfandsqlinjectionattacks}

请注意，Scheduler 本身不提供针对 SQL 注入、XSS 或 CSRF 攻击等威胁的保护。

确保应用安全是后端开发者的责任。

有关潜在漏洞及如何提升应用安全性的更多信息，请参阅 [애플리케이션 보안](guides/app-security.md) 文章。
