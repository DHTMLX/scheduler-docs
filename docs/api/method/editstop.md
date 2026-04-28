---
sidebar_label: editStop
title: "editStop method"
description: "closes the inline event editor, if it's currently open"
---

# editStop

### Description

@short: Closes the inline event editor, if it's currently open

@signature: editStop: (id: string) =\> void

### Parameters

- `id` - (required) *string* - the event's id

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.editStop(eventId);
~~~

### Details

![edit_stop_method](/img/edit_stop_method.png)

### Related API
- [edit](api/method/edit.md)
