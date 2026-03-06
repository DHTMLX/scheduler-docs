---
sidebar_label: "getRenderedEvent"
title: "getRenderedEvent method"
description: "返回当前显示事件的 HTML 元素"
---

# getRenderedEvent

### Description

@short: 返回当前显示事件的 HTML 元素

@signature: getRenderedEvent: (id: string) =\> HTMLElement

### Parameters

- `id` - (required) *string* - 事件的 id

### Returns
- `event` - (HTMLElement) - **事件的 HTML 元素** - 如果该事件在调度器中可见。<br> **'null'** - 如果调用该方法时事件在调度器中不可见。

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
var eventObj = scheduler.getRenderedEvent(eventId);
//-> <div event_id="123649234723" ...>09:00 Meeting</div>
~~~

### Details

:::note

版本 3.5 及以上可用
 
:::
