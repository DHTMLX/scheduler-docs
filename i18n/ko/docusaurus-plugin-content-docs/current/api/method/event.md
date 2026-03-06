---
sidebar_label: "event"
title: "event method"
description: "HTML 요소에 이벤트 핸들러를 설정합니다."
---

# event

### Description

@short: HTML 요소에 이벤트 핸들러를 설정합니다.

@signature: event: (node: HTMLElement | string, event: string, handler: SchedulerCallback, master?: any) =\> string

### Parameters

- `node` - (required) *HTMLElement | string* - HTML 요소 또는 해당 요소의 id
- `event` - (required) *string* - HTML 이벤트 이름 ('on' 접두어 없이)
- `handler` - (required) *function* - 이벤트를 처리하는 함수
- `master` - (optional) *object* - 핸들러 내에서 <i>this</i>가 참조하는 객체

### Returns
- ` id` - (string) - 이벤트 핸들러 id (<b>eventRemove()</b> 메서드와 함께 사용할 수 있음)

### Example

~~~jsx
// 'click' 이벤트에 핸들러를 연결합니다.
scheduler.event("divId", "click", function(e){
    //e - 네이티브 이벤트 객체
    do_something();
});
~~~

### Details

**event**로 추가된 모든 이벤트 리스너는 [destructor](api/method/destructor.md)가 호출될 때 자동으로 제거됩니다.

### Related API
- [eventRemove](api/method/eventremove.md)

### Change log
- 버전 4.4에 추가됨
