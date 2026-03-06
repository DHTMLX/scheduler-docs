---
sidebar_label: "editStop"
title: "editStop method"
description: "结束打开时的inline事件编辑器"
---

# editStop

### Description

@short: 结束打开时的inline事件编辑器

@signature: editStop: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 事件的id

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.editStop(eventId);
~~~

### Details

![edit_stop_method](/img/edit_stop_method.png)

### Related API
- [edit](api/method/edit.md)
