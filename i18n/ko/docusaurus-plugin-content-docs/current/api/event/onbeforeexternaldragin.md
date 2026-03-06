---
sidebar_label: "onBeforeExternalDragIn"
title: "onBeforeExternalDragIn event"
description: "외부 DHTMLX 컴포넌트에서 스케줄러로 요소가 드래그되기 바로 전에 트리거됩니다 (dnd 확장이 활성화되어 있어야 합니다)"
---

# onBeforeExternalDragIn

### Description

@short: 외부 DHTMLX 컴포넌트에서 스케줄러로 요소가 드래그되기 바로 전에 트리거됩니다 (dnd 확장이 활성화되어 있어야 합니다)

@signature: onBeforeExternalDragIn: (source: HTMLElement, dhtmlx: object, tArea: HTMLElement, tNode: HTMLElement, e: Event) =\> boolean

### Parameters

- `source` - (required) *HTMLElement* - 스케줄러로 드래그될 HTML 요소
- `dhtmlx` - (required) *object* - 글로벌 DHTMLX 객체
- `tArea` - (required) *HTMLElement* - 스케줄러의 데이터 영역을 나타내는 HTML 요소
- `tNode` - (required) *HTMLElement* - 스케줄러 내 대상 HTML 요소 (Day 뷰의 컬럼이나 Timeline 뷰의 섹션 등)
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정

### Example

~~~jsx
scheduler.attachEvent("onBeforeExternalDragIn",function(source,dhtmlx,tArea,tNode,e)
{
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

:::note
 이 이벤트는 [outerdrag](guides/extensions-list.md#outerdrag) 플러그인이 활성화되어 있어야 합니다. 
:::

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 외부 요소가 스케줄러로 드래그되는 것을 막습니다.

### Related API
- [onExternalDragIn](api/event/onexternaldragin.md)
