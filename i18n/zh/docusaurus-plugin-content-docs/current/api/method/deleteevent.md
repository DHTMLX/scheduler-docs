---
sidebar_label: "deleteEvent"
title: "deleteEvent method"
description: "删除指定的事件"
---

# deleteEvent

### Description

@short: 删除指定的事件

@signature: deleteEvent: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     事件的ID

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2009,5,30),"day");
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"},
   {id:3, start_date:"06/30/2009 08:00", end_date:"06/30/2009 12:00", text:"Task3"}
],"json");
...
scheduler.deleteEvent(3);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

此方法可以接受第二个参数:

- **silent** - (*boolean*) 设置为 *true* 时，**deleteEvent** 仅在客户端执行，不会发起任何服务器请求:

~~~js
// 仅在客户端删除指定事件
scheduler.deleteEvent(id, true); 
~~~

第二个参数通常用于处理服务器错误时的场景。

### Related API
- [addEvent](api/method/addevent.md)
- [addEventNow](api/method/addeventnow.md)

### Related Guides
- [이벤트 추가/삭제](guides/adding-events.md)
