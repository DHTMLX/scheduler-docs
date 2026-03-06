---
sidebar_label: "onEventAdded"
title: "onEventAdded event"
description: "스케줄러에 새로운 이벤트가 추가될 때 트리거됩니다."
---

# onEventAdded

### Description

@short: 스케줄러에 새로운 이벤트가 추가될 때 트리거됩니다.

@signature: onEventAdded: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 고유 식별자
- `ev` - (required) *object* - 이벤트 객체 자체

### Example

~~~jsx
scheduler.attachEvent("onEventAdded", function(id,ev){
    //여기에 커스텀 로직을 작성할 수 있습니다.
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
