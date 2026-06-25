---
sidebar_label: "showQuickInfo"
title: "showQuickInfo method"
description: "为指定事件打开弹出事件表单"
---

# showQuickInfo

### Description

@short: 为指定事件打开弹出事件表单

@signature: showQuickInfo: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 事件的id

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "08-06-2027 09:00",
    end_date:   "08-06-2027 11:00",
    text:   "Meeting"
});

window.setTimeout(function(){
    scheduler.showQuickInfo(eventId);    
},1);
~~~

### Details

:::note
 此方法需要启用[quick_info](guides/extensions-list.md#quickinfo) 插件。 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [전체 확장 기능 목록](guides/extensions-list.md#quickinfo)
