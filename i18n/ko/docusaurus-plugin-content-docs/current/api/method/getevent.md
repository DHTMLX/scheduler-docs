---
sidebar_label: "getEvent"
title: "getEvent method"
description: "주어진 id에 해당하는 이벤트 객체를 제공합니다."
---

# getEvent

### Description

@short: 주어진 id에 해당하는 이벤트 객체를 제공합니다.

@signature: getEvent: (event_id: string | number) =\> any

### Parameters

- `event_id` - (required) *string | number* - 이벤트의 id

### Returns
- ` obj` - (object) - 이벤트 객체

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...    
var eventObj = scheduler.getEvent(eventId);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
