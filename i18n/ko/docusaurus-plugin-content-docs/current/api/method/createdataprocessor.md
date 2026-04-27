---
sidebar_label: "createDataProcessor"
title: "createDataProcessor method"
description: "새로운 dataProcessor 인스턴스를 생성하고 이를 scheduler에 연결합니다."
---

# createDataProcessor

### Description

@short: 새로운 dataProcessor 인스턴스를 생성하고 이를 scheduler에 연결합니다.

@signature: createDataProcessor: (config: any) =\> any

### Parameters

- `config` - (required) *string | object* - dataProcessor를 위한 설정 객체

### Returns
- ` dataProcessor` - (object) - 생성된 dataProcessor 인스턴스

### Example

~~~jsx
const dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

### Details

이 메서드는 다음 두 가지 파라미터 타입 중 하나를 받습니다:

1\. `{url:string, mode:string}` 형태의 객체로, 데이터를 전송하는 사전 정의된 방식을 지정합니다.

~~~js
const dp = scheduler.createDataProcessor({
   url: "/api",
   mode: "REST"
});
~~~

여기서:

- url - 서버 엔드포인트
- mode - 데이터 전송 방식: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2\. 또는, 커스텀 라우터 객체를 제공할 수 있습니다:

~~~js
const dp = scheduler.createDataProcessor(router);
~~~

라우터는 함수일 수 있습니다:

~~~js
// entity - "event"
// action - "create"|"update"|"delete"
// data - 이벤트 상세 정보를 담은 객체
// id – 처리 중인 객체(event)의 id
const dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
               return scheduler.ajax.post(
                server + "/" + entity,
                data
               );
        break;
        case "update":
               return scheduler.ajax.put(
                server + "/" + entity + "/" + id,
                data
            );
        break;
        case "delete":
               return scheduler.ajax.del(
                server + "/" + entity + "/" + id
               );
        break;
       }
});
~~~

또는 다음과 같은 구조의 객체일 수 있습니다:

~~~js
const dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

라우터 객체 내 각 함수는 Promise 또는 데이터 응답 객체를 반환해야 합니다. 이렇게 하면 dataProcessor가 데이터베이스 id를 업데이트하고 **onAfterUpdate** 이벤트를 연결할 수 있습니다.

~~~js
router = function(entity, action, data, id) {
    return new scheduler.Promise(function(resolve, reject) {
        // … 일부 로직
        return resolve({tid: databaseId});
     });
}
~~~

이 유연성 덕분에 DataProcessor는 특정 URL에 종속되지 않은 localStorage나 다른 저장소 유형에 데이터를 저장하거나, 생성과 삭제 작업을 각각 다른 서버(URL)가 관리하는 경우에도 데이터를 처리할 수 있습니다.

### Related Guides
- ["Server-Side Integration"](guides/server-integration.md)
