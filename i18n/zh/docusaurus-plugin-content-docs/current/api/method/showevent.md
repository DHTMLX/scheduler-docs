---
sidebar_label: "showEvent"
title: "showEvent method"
description: "在当前视图或指定视图中显示并高亮指定的事件"
---

# showEvent

### Description

@short: 在当前视图或指定视图中显示并高亮指定的事件

@signature: showEvent: (id: string, view?: string) =\> void

### Parameters

- `id` - (required) *string* - 事件的id  
- `view` - (optional) *string* - 视图名称

### Example

~~~jsx
```js
// 在“week”视图中显示id为someId的事件
scheduler.showEvent(someId, "week");

// 在当前激活的视图中显示id为someId的事件
scheduler.showEvent(someId);
```
~~~

### Related samples
- [Making an event currently displayable](https://docs.dhtmlx.com/scheduler/samples/09_api/08_show_event.html)

### Details

- 默认的视图名称包括 'day'、'week' 和 'month'。如果想使用其他视图，请传入对应的**name**参数。  
- 此方法会触发 [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md) 和 [onAfterEventDisplay](api/event/onaftereventdisplay.md) 事件。  

例如，在程序中添加一个新事件后，可以这样在scheduler中显示它:

~~~js
const eventId = scheduler.addEvent({
    start_date: "08-06-2027 09:00",
    end_date:   "08-06-2027 11:00",
    text:   "Meeting"
});
...
scheduler.showEvent(eventId);
~~~

![showEvent_method](/img/showEvent_method.png)
