---
sidebar_label: "setEvent"
title: "setEvent method"
description: "向调度器的数据池中添加一个新的事件"
---

# setEvent

### Description

@short: 向调度器的数据池中添加一个新的事件

@signature: setEvent: (id: string | number, event: any) =\> void

### Parameters

- `id` - (required) *string | number* -     事件的ID
- `event` - (required) *object* - 事件对象

### Example

~~~jsx
scheduler.setEvent(1, {
    start_date: new Date(2013, 05, 16, 09, 00),
    end_date:   new Date(2013, 05, 16, 12, 00),
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
});
scheduler.setCurrentView();
~~~

### Details

此方法的工作原理与 [addEvent](api/method/addevent.md) 类似。

**setEvent()** 和 **addEvent()** 之间的主要区别是:

- [addEvent](api/method/addevent.md) 方法会将事件添加到调度器显示中，并触发 [onEventAdded](api/event/oneventadded.md) / [onEventChanged](api/event/oneventchanged.md) 事件，这些事件可以用来更新原始数据源（如数据库）。
- **setEvent()** 方法仅将事件添加到内部数据池中，不会触发任何事件。若要使用新事件更新调度器显示，需要单独调用 [setCurrentView](api/method/setcurrentview.md)。

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [addEvent](api/method/addevent.md)
- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)

### Related Guides
- [이벤트 추가/삭제](guides/adding-events.md)
