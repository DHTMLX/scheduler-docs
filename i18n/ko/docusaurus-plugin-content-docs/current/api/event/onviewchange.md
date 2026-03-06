---
sidebar_label: "onViewChange"
title: "onViewChange event"
description: "현재 뷰가 다른 뷰로 전환된 후에 트리거됩니다."
---

# onViewChange

### Description

@short: 현재 뷰가 다른 뷰로 전환된 후에 트리거됩니다.

@signature: onViewChange: (new_mode: string, new_date: object) =\> void

### Parameters

- `new_mode` - (required) *string* - 업데이트된 뷰
- `new_date` - (required) *object* - 업데이트된 날짜

### Example

~~~jsx
scheduler.attachEvent("onViewChange", function (new_mode , new_date){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

현재 뷰가 업데이트될 때마다 이 이벤트가 발생합니다.
