---
sidebar_label: "onEmptyClick"
title: "onEmptyClick event"
description: "사용자가 스케줄러 내 빈 영역(이벤트가 아닌 부분)을 클릭할 때 트리거됩니다."
---

# onEmptyClick

### Description

@short: 사용자가 스케줄러 내 빈 영역(이벤트가 아닌 부분)을 클릭할 때 트리거됩니다.

@signature: onEmptyClick: (date: object, e: Event) =\> void;

### Parameters

- `date` - (required) *object* - 사용자가 클릭한 위치에 해당하는 날짜
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEmptyClick", function (date, e){
       //여기에 사용자 정의 로직 작성
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
