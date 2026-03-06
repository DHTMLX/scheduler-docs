---
sidebar_label: "onClick"
title: "onClick event"
description: "사용자가 이벤트에서 마우스 왼쪽 버튼을 클릭할 때 발생합니다."
---

# onClick

### Description

@short: 사용자가 이벤트에서 마우스 왼쪽 버튼을 클릭할 때 발생합니다.

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 차단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onClick", function (id, e){
       //여기에 사용자 정의 로직 작성
       return true;
  });
~~~

### Related samples
- [Hiding the select bar of the event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

이 이벤트는 차단할 수 있습니다. 핸들러에서 true 이외의 값을 반환하면 기본 동작(보통 선택 바 표시)이 중단됩니다.

### Related Guides
- ["Lightbox 조작하기"](guides/lightbox-editors-manipulations.md#opening-the-lightbox-on-a-single-click)
