---
sidebar_label: "changeEventId"
title: "changeEventId method"
description: "이벤트의 id를 업데이트합니다."
---

# changeEventId

### Description

@short: 이벤트의 id를 업데이트합니다.

@signature: changeEventId: (id: string, new_id: string) =\> void

### Parameters

- `id` - (required) *string* - 현재 이벤트의 id
- `new_id` - (required) *string* - 새로운 이벤트의 id

### Example

~~~jsx
scheduler.changeEventId("ev15", "ev25"); // 이벤트의 id를 "ev15"에서 "ev25"로 업데이트합니다.
~~~

### Details

스케줄러에 표시되는 모든 이벤트는 고유한 id를 가집니다.

UI를 통해 새 이벤트가 생성되면, Scheduler 라이브러리는 임시 id를 할당합니다.

이벤트가 데이터베이스에 저장되면, 데이터베이스에서 생성된 영구 id를 받게 됩니다.
일반적으로 백엔드는 이 데이터베이스 id를 클라이언트 측에 반환하며, 스케줄러는 이를 받아 이후 이벤트 업데이트에 사용합니다.

[dataProcessor 모듈을 사용하고 서버 측 통합 튜토리얼을 따르는 경우](guides/server-integration.md#technique), 이 과정은 자동으로 처리됩니다.
하지만 백엔드에 수동으로 업데이트를 전송하는 경우, 이 메서드를 사용하여 이벤트 id를 수동으로 업데이트해야 합니다.
예를 들어:

~~~js
// 새 이벤트 생성
jQuery.ajax({
    type:"POST",
    url:"/myApi/event",
    data:{ data : event },
    complete:function(result){
        // 백엔드가 새 이벤트를 데이터베이스에 삽입한 후 응답
        scheduler.changeEventId(event.id, result.databaseId);
    }
});
~~~

이 메서드는 [onEventIdChange](api/event/oneventidchange.md) 이벤트를 트리거한다는 점을 유의하세요.

### Related API
- [onEventIdChange](api/event/oneventidchange.md)

### Related Guides
- ["Server-Side Integration"](guides/server-integration.md#technique)
