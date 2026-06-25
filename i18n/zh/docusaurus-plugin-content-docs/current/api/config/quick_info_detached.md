---
sidebar_label: "quick_info_detached"
title: "quick_info_detached config"
description: "控制事件表单是从屏幕左侧/右侧弹出，还是紧挨所选事件旁边显示"
---

# quick_info_detached

### Description

@short: 控制事件表单是从屏幕左侧/右侧弹出，还是紧挨所选事件旁边显示

@signature: quick_info_detached: boolean

### Example

~~~jsx
scheduler.config.quick_info_detached = false;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"day");
~~~

**Default value:** true (<i>事件表单将显示在所选事件附近</i>)

### Related samples
- [Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)
- [Touch-oriented scheduler. Managing the event form position](https://docs.dhtmlx.com/scheduler/samples/03_extensions/30_quick_info_detached.html)

### Details

:::note
 此属性需要启用 [quick_info](guides/extensions-list.md#quickinfo) 插件。 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [전체 확장 기능 목록](guides/extensions-list.md#quickinfo)
