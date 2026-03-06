---
sidebar_label: "setEventText"
title: "setEventText method"
description: "更新特定事件的文本内容"
---

# setEventText
:::warning 
此功能已棄用。
:::
### Description

@short: 更新特定事件的文本内容

@signature: setEventText: (id: string, text: string) =\> void

### Parameters

- `id` - (required) *string* - 事件的唯一标识符
- `text` - (required) *string* - 事件的更新文本内容

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).text = "Meeting";
scheduler.updateEvent(eventId);
~~~

### Related API
- [getEventText](api/method/geteventtext.md)
