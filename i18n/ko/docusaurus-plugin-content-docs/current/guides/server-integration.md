---
title: "Server-Side Integration"
sidebar_label: "Server-Side Integration"
---

# Server-Side Integration 

dhtmlxScheduler를 백엔드와 연동하는 가장 좋은 방법은 서버에 RESTful API를 구축하고, 클라이언트 측에서 dhtmlxDataProcessor를 사용하는 것입니다.

[DataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html)는 dhtmlxScheduler.js에 포함된 클라이언트 사이드 라이브러리입니다. 이 라이브러리는 데이터 변경 사항을 추적하고, 클라이언트에서 서버로의 요청을 관리합니다.

dhtmlxScheduler는 다양한 프레임워크와 프로그래밍 언어를 통해 REST API로 서버와 연동할 수 있습니다. 아래는 Scheduler 백엔드 연동을 위한 서버 측 구현 예시 목록입니다:

- ["dhtmlxScheduler와 PHP:Slim"](integrations/php/howtostart-php-slim4.md)
- ["dhtmlxScheduler와 ASP.NET Core"](integrations/dotnet/howtostart-dotnet-core.md)
- ["dhtmlxScheduler와 ASP.NET MVC"](integrations/dotnet/howtostart-dotnet.md)
- ["dhtmlxScheduler와 Node.js"](integrations/node/howtostart-nodejs.md)
- ["dhtmlxScheduler와 PHP"](integrations/php/howtostart-plain-php.md)
- ["dhtmlxScheduler와 PHP:Laravel 연동하기"](integrations/php/howtostart-php-laravel.md)
- ["dhtmlxScheduler와 Ruby on Rails 연동하기"](integrations/other/howtostart-ruby.md)
- ["dhtmlxScheduler와 PHP:Slim 3"](integrations/other/howtostart-php.md)

## 기본 원리 {#technique}

일반적으로 REST API를 통해 서버에서 데이터를 로드하려면 아래와 같은 절차를 따릅니다.

### 클라이언트 측

1) [load](api/method/load.md) 메서드를 사용하여 [JSON](guides/data-formats.md#json) 형식의 Scheduler 데이터를 반환하는 URL을 지정합니다.

2) [createDataProcessor](api/method/createdataprocessor.md) 메서드를 사용하고, 구성 옵션이 담긴 객체를 전달합니다:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

또는, 생성자를 사용하여 dataProcessor를 만들고 dhtmlxScheduler 객체에 연결할 수도 있습니다. scheduler.DataProcessor() 생성자는 서버 측 스크립트의 경로를 인자로 받습니다:

~~~js
scheduler.init("scheduler_here", new Date(), "month");
scheduler.load("apiUrl");

const dp = new scheduler.DataProcessor("apiUrl");
dp.init(scheduler);
~~~

자세한 내용은 다음 섹션에서 확인할 수 있습니다.

### DataProcessor 생성하기 {#createdp}

API 메서드 [createDataProcessor](api/method/createdataprocessor.md)를 통해 DataProcessor를 생성할 때 여러 방식으로 파라미터를 전달할 수 있습니다.

1. 미리 정의된 요청 모드 중 하나를 사용할 수 있습니다. 예를 들어:

~~~js
const dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

여기서:

- **url** - 서버 측 URL
- **mode** - 서버로 데이터를 전송하는 방식: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2. 커스텀 **router** 객체를 전달할 수 있습니다:

~~~js
const dp = scheduler.createDataProcessor(router);
~~~

router가 함수일 수도 있습니다:

~~~js
const server = "/api";

// entity - "event"
// action - "create"|"update"|"delete"
// data - 이벤트 데이터 객체
// id – 처리 중인 객체(이벤트)의 id
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

또는 아래와 같이 객체 형태로도 가능합니다:

~~~js
const dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

모든 router 함수는 Promise 또는 데이터 응답 객체를 반환해야 합니다. 이렇게 하면 dataProcessor가 데이터베이스 id를 할당하고 **onAfterUpdate** 이벤트를 트리거할 수 있습니다.

~~~js
const router = function(entity, action, data, id) {
    return new Promise(function(resolve, reject) {
        // … 로직 처리
        return resolve({tid: databaseId});
    });
}
~~~

이 방식을 이용하면 DataProcessor를 localStorage나 특정 URL에 종속되지 않은 저장소에 데이터를 저장하는 데 사용할 수 있으며, 객체 생성과 삭제를 서로 다른 서버(URL)에서 처리할 때도 사용할 수 있습니다.
  
<h3 id="requestresponsedetails">요청 및 응답 세부사항</h3>

URL은 다음 패턴을 따릅니다:

- api/eventId

여기서 "api"는 dataProcessor 구성에서 지정한 URL입니다.


#### REST 모드

REST 모드를 사용하려면 [createDataProcessor](api/method/createdataprocessor.md) 구성 객체의 `mode` 속성을 "REST"로 설정하세요:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

일반적인 요청 및 응답은 다음과 같습니다:

<table class="dp_table">
  <tr>
  <th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>데이터 로드</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>새 이벤트 추가</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>("action":"inserted","tid":"eventId")</td>
  </tr>
  <tr>
  <td>이벤트 수정</td>
  <td>PUT</td>
  <td>/apiUrl/:id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>이벤트 삭제</td>
  <td>DELETE</td>
  <td>/apiUrl/:id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

#### REST-JSON 모드 {#rest-json-mode}

REST-JSON 모드를 사용하려면 [createDataProcessor](api/method/createdataprocessor.md) 구성 객체의 `mode` 속성을 "REST-JSON"으로 설정하세요:
~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST-JSON"
});

~~~

이 모드에서는 scheduler가 POST/PUT/DELETE 요청을 `application/json` content type으로 전송합니다.

요청 및 응답 예시는 다음과 같습니다:

<table class="dp_table">
  <tr>
  <th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Request Body</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>데이터 로드</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td></td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>새 이벤트 추가</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... )</td>
  <td>( "action":"inserted", "tid":"eventId" )</td>
  </tr>
  <tr>
  <td>이벤트 수정</td>
  <td>PUT</td>
  <td>/apiUrl/:id</td>
  <td>( "start_date":"2024-12-18 00:00", "end_date":"2024-12-18 00:05", "text":"New event", ... )</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>이벤트 삭제</td>
  <td>DELETE</td>
  <td>/apiUrl/:id</td>
  <td></td>
  <td>("action":"deleted")</td>
  </tr>
</table>

#### POST 모드

POST 모드를 사용하려면 [createDataProcessor](api/method/createdataprocessor.md) 구성 객체의 `mode` 속성을 "POST"로 설정하세요:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "POST"
});
~~~


요청 및 응답 방식은 다음과 같습니다:

<table class="dp_table">
  <tr>
  <th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>데이터 로드</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>

  <tr>
  <td>이벤트 수정</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>("action":"inserted|updated|deleted", "tid":"eventId")</td>
  </tr>
</table>

#### JSON 모드 {#json-mode}

JSON 모드를 사용하려면 [createDataProcessor](api/method/createdataprocessor.md) 구성 객체의 `mode` 속성을 "JSON"으로 설정하세요:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "JSON"
});
~~~

이 모드에서는 각 데이터 업데이트 후 scheduler가 서버에 POST 요청을 전송합니다(POST 모드와 유사하지만 요청 형식이 다릅니다).

요청 및 응답 예시는 다음과 같습니다:

<table class="dp_table">
  <tr>
  <th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>Request Body</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>데이터 로드</td>
  <td>GET</td>
  <td></td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>새 이벤트 추가</td>
  <td>POST</td>
  <td>( "id": temporaryId, "action":"inserted", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>( "action":"inserted", "tid":"eventId" )</td>
  </tr>
  <tr>
  <td>이벤트 수정</td>
  <td>POST</td>
  <td>( "id": id, "action":"updated", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>이벤트 삭제</td>
  <td>POST</td>
  <td>( "id": id, "action":"deleted", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>("action":"deleted")</td>
  </tr>
</table>


#### 동적 로딩

동적 로딩의 요청 및 응답은 다음과 같습니다:

<table class="dp_table">
  <tr>
  <th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>데이터 로드</td>
  <td>GET</td>
  <td>/apiUrl?from=minDate&to=maxDate</td>
  <td>[JSON format](guides/data-formats.md#json)</td>
  </tr>
</table>

### 요청 파라미터 {#request-parameters}

생성/수정/삭제 요청에는 클라이언트 측 이벤트 객체의 모든 공개 속성이 포함됩니다:

- **id**: 71
- **start_date**: 2024-11-04 15:00
- **end_date**: 2024-11-04 18:00
- **text**:  Recinto Ferial - Valencia 
- **details**: Details for  Recinto Ferial - Valencia 
- **!nativeeditor_status**: updated

:::note
**!nativeeditor_status** 파라미터는 POST 모드에서만 적용됩니다.
:::

### 서버 사이드

Scheduler에서 이벤트 추가, 수정, 삭제 등 액션이 발생할 때마다 dataProcessor는 AJAX 요청을 서버에 전송하여 응답합니다.

각 요청은 데이터베이스에 변경사항을 저장하는 데 필요한 모든 데이터를 포함합니다. dataProcessor가 REST 모드로 설정되어 있으므로, 작업 유형에 따라 다른 HTTP 메서드를 사용합니다.

:::note
REST API를 사용하지 않으려는 경우, 좋은 대안으로 [dhtmlxConnector 라이브러리를 사용하는 방법](integrations/other/howtostart-connector.md)이 있습니다.
:::

## 반복 이벤트 {#recurringevents}

반복 이벤트는 [일반 이벤트의 모든 필드](guides/loading-data.md#data-properties)와 함께 추가 필드인 **rrule**, **duration**, **recurring_event_id**, **original_start**, **deleted**를 포함하는 레코드로 데이터베이스에 저장됩니다.

자세한 내용은 [반복 이벤트](guides/recurring-events.md#server-side-logic) 문서를 참고하세요.

이러한 추가 필드 외에도, 서버 사이드 컨트롤러에는 특정 로직이 필요합니다:

- **insert** 액션의 경우:
  - **event.deleted === true**이면, 응답에서 'deleted' 상태를 표시해야 합니다.
- **update** 액션의 경우:
  - **event.rrule**이 비어 있지 않고 **event.recurring_event_id**가 비어 있으면, **recurring_event_id == event.id**인 모든 이벤트를 삭제해야 합니다.
- **delete** 액션의 경우:
  - **event.rrule**이 비어 있지 않고 **event.recurring_event_id**가 비어 있으면, **recurring_event_id == event.id**인 모든 이벤트를 삭제해야 합니다.
  - **event.recurring_event_id**가 비어 있지 않으면, 이벤트를 삭제하는 대신 **event.deleted = true**로 업데이트해야 합니다.

:::note
반복 이벤트의 편집 및 삭제에 대한 자세한 예제는 [반복 이벤트 문서의 관련 섹션](guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series)에서 확인할 수 있습니다.
:::


## 커스텀 요청 헤더 및 파라미터 {#custom-request-headers-and-parameters}

### 커스텀 요청 헤더 추가

Scheduler가 백엔드로 추가 헤더를 전송해야 하는 경우, [dataProcessor.setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) 메서드를 사용하여 지정할 수 있습니다.

예를 들어, 요청에 인증 토큰을 추가하려면 다음과 같이 설정할 수 있습니다:

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

현재, [load](api/method/load.md)는 GET 요청에 대해 헤더나 페이로드 파라미터를 지원하지 않으므로, 필요하다면 xhr 요청을 직접 보내고 [parse](api/method/parse.md)를 사용해 데이터를 로드해야 합니다. 예시는 다음과 같습니다:

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

### 요청에 커스텀 파라미터 추가

요청에 추가 파라미터를 포함하는 방법은 여러 가지가 있습니다.

scheduler는 데이터 객체의 모든 속성을 백엔드로 다시 전송하므로, *data object*에 속성을 직접 추가하면 함께 전송됩니다:

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    const event = scheduler.getEvent(id);
    event.userId = currentUser;
    return true;
});
~~~

또는, [setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html)의 **payload** 속성을 사용하여 모든 요청에 커스텀 파라미터를 추가할 수 있습니다:

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

payload는 요청의 쿼리 스트링에 추가됩니다.

또 다른 방법으로, DataProcessor의 [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) 이벤트를 사용할 수 있습니다:

~~~js
const dp = scheduler.createDataProcessor("data/events.php");

dp.attachEvent("onBeforeUpdate", function(id, state, data){
    data.productName = "Product 2";
    return true;
});
~~~

이 이벤트는 백엔드로 전송되는 각 레코드에 대해 발생하며, 커스텀 파라미터는 각 Scheduler 이벤트에 이벤트 id를 접두사로 추가되어 전송됩니다:

~~~js
123_productName:Product 2
~~~


## 스크립트에서 데이터 저장 트리거 {#triggeringdatasavingfromscript}

dataProcessor가 초기화된 후에는, 사용자가 직접 또는 코드로 변경한 모든 내용이 자동으로 데이터 소스에 저장됩니다.

특정 이벤트를 프로그래밍적으로 업데이트하려면, 일반적으로 [addEvent](api/method/addevent.md) 메서드를 사용합니다:

~~~js
scheduler.parse([
     { id:1, start_date:"2017-05-13 6:00", end_date:"2017-05-13 8:00", text:"Event 1"},
     { id:2, start_date:"2017-06-09 6:00", end_date:"2017-06-09 8:00", text:"Event 2"}
]);

const event = scheduler.getEvent(1);
event.text = "Conference"; // 이벤트 데이터 수정
scheduler.addEvent(event); // 업데이트된 이벤트 표시
~~~

이미 로드된 이벤트에 대해 호출하면 [addEvent](api/method/addevent.md)는 *update* 요청을 발생시키고, 그렇지 않으면 *insert*를 발생시킵니다.

다음 메서드는 백엔드로 업데이트를 전송합니다:

- [addEvent](api/method/addevent.md)
- [deleteEvent](api/method/deleteevent.md)


## DataProcessor 없이 변경사항 저장 {#savingchangeswithoutdataprocessor}

dhtmlxScheduler는 gantt.dataProcessor 없이도 사용할 수 있습니다. 이 경우, 스케줄러에서 발생한 모든 변경사항을 수동으로 추적한 후 백엔드로 전송해야 합니다.

다음 이벤트를 감지해야 합니다:

- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)
- [onEventDeleted](api/event/oneventdeleted.md)

클라이언트에서 새 이벤트가 생성되면, 처음에는 임시 id를 갖고 있다가 데이터베이스의 영구 id를 받게 됩니다.

새 항목을 데이터베이스에 삽입한 후, 새 id를 클라이언트로 다시 전송하고 [changeEventId](api/method/changeeventid.md) 메서드를 사용해 관련 이벤트를 업데이트해야 합니다:

~~~js
// eventService는 CRUD 서비스 구현체라고 가정

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

## 커스텀 라우팅 {#custom-routing}

RESTful AJAX API가 백엔드 요구 사항에 맞지 않거나, 서버로 전송되는 내용을 수동으로 제어하고 싶다면 커스텀 라우팅을 사용할 수 있습니다.

예를 들어, Angular나 React 같은 프레임워크에서는 변경사항을 서버로 직접 전송하지 않고, 데이터를 저장하는 다른 컴포넌트로 전달할 수 있습니다.

DataProcessor에 커스텀 라우팅을 설정하려면 [**createDataProcessor()**](#createdp) 메서드를 사용하세요:

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

### 커스텀 라우터를 위한 AJAX 사용

[Scheduler AJAX 모듈](api/other/ajax.md)은 커스텀 라우팅에 유용합니다. Scheduler는 커스텀 라우터에서 작업 결과를 나타내는 Promise를 반환할 것을 기대하며, 이를 통해 액션 완료 시점을 감지할 수 있습니다.

AJAX 모듈은 Promise를 지원하며, 커스텀 라우터 내에서 잘 동작합니다. Scheduler는 Promise가 resolve될 때 처리를 진행합니다.

아래 예시에서는 새로운 작업이 생성됩니다. 서버 응답에 새로 생성된 작업의 id가 포함되어 있다면, Scheduler가 이를 적용할 수 있습니다.

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

## 오류 처리 {#error-handling}

서버는 "action":"error"가 포함된 응답을 반환하여 Scheduler에 작업 실패를 알릴 수 있습니다:

~~~js
{"action":"error"}
~~~

이 응답은 클라이언트 측에서 dataProcessor로 처리할 수 있습니다:

~~~js
const dp = scheduler.createDataProcessor("apiUrl");
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        // 여기서 오류 처리
    }
});
~~~

응답 객체에는 onAfterUpdate 핸들러의 `response` 인자를 통해 접근할 수 있는 추가 속성이 포함될 수 있습니다.

서버에서 오류를 반환했지만 클라이언트에서 변경사항이 저장된 경우, 상태 동기화를 위해 클라이언트의 데이터를 모두 지우고 서버에서 올바른 데이터를 다시 로드하는 것이 가장 좋습니다:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        scheduler.clearAll();
        scheduler.load(url);
    }
});
~~~

모든 데이터를 다시 로드하는 것이 원치 않을 경우, [deleteEvent](api/method/deleteevent.md) 메서드의 **silent** 파라미터를 사용해 단일 이벤트만 클라이언트에서 제거할 수 있습니다:

~~~js
// 서버 호출 없이 지정된 이벤트만 클라이언트에서 제거
scheduler.deleteEvent(id, true); 
~~~
 
## XSS, CSRF 및 SQL 인젝션 공격 {#xsscsrfandsqlinjectionattacks}

Scheduler 자체는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 보호 기능을 제공하지 않습니다.

애플리케이션 보안은 백엔드 개발자의 책임입니다.

잠재적 취약점과 애플리케이션 보안을 강화하는 방법에 대한 자세한 내용은 ["애플리케이션 보안"](guides/app-security.md) 문서를 참고하세요.
