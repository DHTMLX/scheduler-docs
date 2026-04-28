---
sidebar_label: "getEvent"
title: "getEvent method"
description: "提供对应于给定 id 的事件对象"
---

# getEvent

### Description

@short: 提供对应于给定 id 的事件对象

@signature: getEvent: (event_id: string | number) =\> any

### Parameters

- `event_id` - (required) *string | number* - 事件的 id

### Returns
- ` obj` - (object) - 事件对象

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...    
const eventObj = scheduler.getEvent(eventId);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
