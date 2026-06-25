---
sidebar_label: "quick_info_detached"
title: "quick_info_detached config"
description: "이벤트 폼이 화면의 왼쪽/오른쪽에서 나타날지, 선택된 이벤트 바로 옆에 나타날지를 제어합니다."
---

# quick_info_detached

### Description

@short: 이벤트 폼이 화면의 왼쪽/오른쪽에서 나타날지, 선택된 이벤트 바로 옆에 나타날지를 제어합니다.

@signature: quick_info_detached: boolean

### Example

~~~jsx
scheduler.config.quick_info_detached = false;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"day");
~~~

**Default value:** true (<i>이벤트 폼이 선택된 이벤트 근처에 표시됩니다</i>)

### Related samples
- [Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)
- [Touch-oriented scheduler. Managing the event form position](https://docs.dhtmlx.com/scheduler/samples/03_extensions/30_quick_info_detached.html)

### Details

:::note
 이 속성은 [quick_info](guides/extensions-list.md#quick-info) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- ["Mobile Responsive Scheduler"](guides/touch-support.md)
- ["전체 확장 기능 목록"](guides/extensions-list.md#quick-info)
