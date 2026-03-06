---
sidebar_label: "onBeforeDrag"
title: "onBeforeDrag event"
description: "사용자가 드래그 또는 리사이즈 동작을 시작할 때 트리거됩니다 (버전 2.1+부터 사용 가능)"
---

# onBeforeDrag

### Description

@short: 사용자가 드래그 또는 리사이즈 동작을 시작할 때 트리거됩니다 (버전 2.1+부터 사용 가능)

@signature: onBeforeDrag: (id: string, mode: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - 이벤트의 식별자
- `mode` - (required) *string* - 드래그 동작의 유형: "move", "resize", 또는 "create"
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작을 진행할지(<b>true</b>) 아니면 방지할지(<b>false</b>) 결정합니다

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

사용자가 scheduler 내에서 드래그가 가능한 요소를 클릭할 때 이 이벤트가 트리거됩니다.

"create" 모드의 경우, 새 이벤트가 아직 생성되지 않아 id 파라미터가 설정되지 않습니다.
