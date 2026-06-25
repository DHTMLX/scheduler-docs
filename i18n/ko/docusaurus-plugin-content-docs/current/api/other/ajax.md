---
sidebar_label: "ajax"
title: "ajax config"
description: "스케줄러 ajax 모듈"
---

# ajax

### Description

@short: 스케줄러 ajax 모듈

@signature: ajax: any

### Example

~~~jsx
// 응답이 다음과 같다고 가정
{status: "ok", data: "value", data2: "value2"}


const xhr = scheduler.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    const res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // 응답이 정상임
    }
});

// HTTP POST
xhr.post({
    url:"server.php", 
    data: {
           paramName: "paramValue"
    }
}).then(function(response){
    const res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // 응답이 정상임
    }
});
~~~

### Details

### API 참조

모든 메서드는 두 가지 형식 중 하나로 매개변수를 받습니다:

1) RequestConfig 객체, 요청 설정을 포함하며 다음과 같습니다:

~~~js
{
    url: string,
      method: "PUT|GET|POST|DELETE",
      data: string | object,
      async: true|false
      callback: function,
      headers: object
}
~~~

각 속성의 의미는 다음과 같습니다:

- url - 서버 URL
- method - 선택 사항, 사용할 HTTP 메서드, 기본값은 "GET"
- data - 선택 사항, 요청과 함께 전송할 데이터; POST와 PUT은 문자열 또는 객체 모두 허용
- async - 선택 사항, 요청이 비동기인지 여부, 기본값 true
- callback - 선택 사항, 응답을 받으면 호출할 함수
- headers - 선택 사항, 요청에 포함할 "key":"value" 쌍의 헤더 객체

또는:

2) 세 개의 개별 매개변수 (단, **query()** 메서드는 *RequestConfig* 객체만 받음):

- url - 서버 URL
- data - 선택 사항, 요청과 함께 전송할 데이터
- callback - 선택 사항, 응답을 받은 후 호출할 함수

아래는 ajax 모듈 API에서 사용할 수 있는 메서드 목록입니다:

#### 콜백 옵션

모든 메서드는 콜백과 프로미스를 모두 지원하여 응답을 처리할 수 있습니다.

ajax 프로미스는 완료된 XmlHttpRequest 객체로 resolve 됩니다:

~~~js
scheduler.ajax.post({ 
    url:"some.php",
    data: {
           paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});
~~~

하위 호환성을 위해 콜백은 약간 다른 형식으로 응답을 받습니다:

~~~js
scheduler.ajax.post({ 
    url:"some.php",
    data: {
           paramName: "paramValue"
    },
    callback: function(result){
           var response = result.xmlDoc;
       
           alert(response.responseText);
    }
});
~~~


#### query

요청을 보내는 일반적인 메서드입니다. 파라미터에서 method를 지정하여 모든 요청 유형을 처리할 수 있습니다.

~~~js
scheduler.ajax.query({ 
    url:"some.php",
    method:"POST",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});

~~~

#### get

GET 요청을 보냅니다.

~~~js
scheduler.ajax.get("some.php", function(){
    // 여기에 코드 작성
});
// 또는
scheduler.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

PUT 요청을 보냅니다.

~~~js
scheduler.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // 여기에 코드 작성
});
// 또는
scheduler.ajax.put({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
    data: {}
});
~~~

#### del

DELETE 요청을 보냅니다.

~~~js
scheduler.ajax.del("server.php", function(){
    // 여기에 코드 작성
});
// 또는
scheduler.ajax.del({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### post

POST 요청을 보냅니다.

~~~js
scheduler.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // 여기에 코드 작성
});
// 또는
scheduler.ajax.post({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
    data: {}
});
~~~

### POST/PUT 메서드로 데이터 전송하기

**post** 또는 **put**을 사용할 때, 문자열 대신 객체를 데이터로 전달할 수 있습니다. ajax 모듈이 자동으로 객체를 직렬화합니다.  
간단한 객체는 폼 데이터 형식(e.g. &param=value)으로 직렬화되고, 중첩 구조는 JSON.stringify()를 사용해 직렬화됩니다.

예를 들어, 다음 객체:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

는 `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D` 같은 문자열로 변환됩니다.

<h3 id="promises">프로미스(Promises)</h3>

dhtmlxScheduler는 IE8 이상을 포함해 프로미스를 지원합니다. 내부적으로 [Bluebird](https://github.com/petkaantonov/bluebird) 라이브러리를 사용합니다. 
프로미스를 생성하려면 다음과 같이 사용하세요:

~~~js
const promise = new scheduler.Promise(function(resolve, reject) {...});
~~~

프로미스 구현은 Scheduler 내부에 범위가 제한되어 있으며 전역이 아닙니다.

AJAX 모듈은 프로미스를 반환하므로 콜백 대신 프로미스 문법을 사용할 수 있습니다. 예를 들어,

~~~js
scheduler.ajax.post(url, params, callback);
~~~

대신

~~~js
scheduler.ajax.post(url, params).then(function(){…});
~~~

를 사용할 수 있습니다.

콜백과 프로미스를 함께 사용할 수도 있습니다.

여러 요청을 동시에 보내고 모두 완료된 후 데이터를 다시 로드하는 예시는 다음과 같습니다:

~~~js 
scheduler.Promise.all([
      scheduler.ajax.post({url: "api/event", data: event1}),
      scheduler.ajax.post({url: "api/event", data: event2}),
      scheduler.ajax.post({url: "api/event", data: event3})
]).then(function(){
       scheduler.clearAll();
       scheduler.load("/api");
});
~~~

### Change log
- 버전 6.0에 추가됨
