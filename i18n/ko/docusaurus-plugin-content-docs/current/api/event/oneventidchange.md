---
sidebar_label: "onEventIdChange"
title: "onEventIdChange event"
description: "이벤트의 ID가 업데이트될 때 트리거됩니다"
---

# onEventIdChange

### Description

@short: 이벤트의 ID가 업데이트될 때 트리거됩니다

@signature: onEventIdChange: (old_id: string, new_id: string) =\> void;

### Parameters

- `old_id` - (required) *string* - 원래 이벤트의 ID    
- `new_id` - (required) *string* - 업데이트된 이벤트의 ID

### Example

~~~jsx
scheduler.attachEvent("onEventIdChange", function(old_id,new_id){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

이 이벤트는 일반적으로 삽입 작업이 확인된 후 발생하며, 클라이언트 측 ID를 데이터베이스의 ID로 전환합니다.
