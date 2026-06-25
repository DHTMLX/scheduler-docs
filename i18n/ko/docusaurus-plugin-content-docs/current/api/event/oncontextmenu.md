---
sidebar_label: "onContextMenu"
title: "onContextMenu event"
description: "사용자가 스케줄러 내에서 마우스 오른쪽 버튼을 클릭하여 컨텍스트 메뉴를 열 때 트리거됩니다."
---

# onContextMenu

### Description

@short: 사용자가 스케줄러 내에서 마우스 오른쪽 버튼을 클릭하여 컨텍스트 메뉴를 열 때 트리거됩니다.

@signature: onContextMenu: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onContextMenu", function (id, e){
    //여기에 커스텀 로직을 추가할 수 있습니다
});
~~~

### Related samples
- [Integration with dhtmlxMenu](https://docs.dhtmlx.com/scheduler/samples/10_integration/01_dhtmlxmenu.html)

### Details

사용자가 이벤트를 마우스 오른쪽 버튼으로 클릭하면 핸들러는 해당 이벤트의 id를 받으며, 그렇지 않으면 null을 받습니다.
