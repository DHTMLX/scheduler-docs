---
sidebar_label: "onExternalDragIn"
title: "onExternalDragIn event"
description: "외부 DHTMLX 컴포넌트에서 스케줄러로 데이터가 드래그될 때 발생합니다 (dnd 확장이 활성화되어 있어야 합니다)"
---

# onExternalDragIn

### Description

@short: 외부 DHTMLX 컴포넌트에서 스케줄러로 데이터가 드래그될 때 발생합니다 (dnd 확장이 활성화되어 있어야 합니다)

@signature: onExternalDragIn: (id: string, source: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 데이터 항목의 ID
- `source` - (required) *object* - 스케줄러로 드래그된 원본 HTML 요소
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 여부를 나타냅니다

### Example

~~~jsx
scheduler.attachEvent("onExternalDragIn", function (id, source, e){
    scheduler.getEvent(id).text = source.innerHTML;
    return true;
});
~~~

### Related samples
- 10_integration/02_dhtmlxTree_outer_drag.html

### Details

:::note
 이 이벤트는 [outerdrag](guides/extensions-list.md#outerdrag) 플러그인이 활성화되어 있어야 합니다. 
:::

- 이 이벤트는 드래그인 작업으로 생성된 새 이벤트를 커스터마이징할 수 있게 합니다.
- *false*를 반환하면 드래그 중 새 이벤트 생성이 차단됩니다.

### Related API
- [onBeforeExternalDragIn](api/event/onbeforeexternaldragin.md)
