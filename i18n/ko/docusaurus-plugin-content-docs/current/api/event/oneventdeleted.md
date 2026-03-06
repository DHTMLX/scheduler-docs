---
sidebar_label: "onEventDeleted"
title: "onEventDeleted event"
description: "이벤트가 삭제된 직후에 트리거됩니다 (버전 3.0 이상부터 사용 가능)"
---

# onEventDeleted

### Description

@short: 이벤트가 삭제된 직후에 트리거됩니다 (버전 3.0 이상부터 사용 가능)

@signature: onEventDeleted: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `ev` - (required) *object* - 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventDeleted", function(id,ev){
    // 커스텀 코드
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

이 이벤트는 DataProcessor 라이브러리 사용 여부와 관계없이 발생합니다.
