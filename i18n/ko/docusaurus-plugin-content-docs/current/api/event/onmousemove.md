---
sidebar_label: "onMouseMove"
title: "onMouseMove event"
description: "스케줄러 위에서 마우스 커서가 움직일 때 트리거됩니다."
---

# onMouseMove

### Description

@short: 스케줄러 위에서 마우스 커서가 움직일 때 트리거됩니다.

@signature: onMouseMove: (id: string, e: Event) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function (id, e){
    //여기에 커스텀 로직 작성
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- 10_integration/02_dhtmlxTree_outer_drag.html

### Details

커서가 이벤트 위로 이동하면 핸들러는 해당 이벤트의 id를 받으며, 그렇지 않으면 null을 받습니다.
