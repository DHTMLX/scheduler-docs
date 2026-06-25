---
sidebar_label: "editStop"
title: "editStop method"
description: "beendet den Inline-Event-Editor, wenn er geöffnet ist"
---

# editStop

### Description

@short: Beendet den Inline-Event-Editor, wenn er geöffnet ist

@signature: editStop: (id: string) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events

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
