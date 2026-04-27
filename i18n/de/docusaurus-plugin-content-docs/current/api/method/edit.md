---
sidebar_label: "edit"
title: "edit method"
description: "öffnet den Inline-Editor, um den Text des Events direkt innerhalb des Event-Boxes zu ändern"
---

# edit

### Description

@short: Öffnet den Inline-Editor, um den Text des Events direkt innerhalb des Event-Boxes zu ändern

@signature: edit: (id: string) =\> void

### Parameters

- `id` - (required) *string* - die eindeutige Kennung des Events

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.edit(eventId);
~~~

### Details

![edit_method](/img/edit_method.png)

### Related API
- [editStop](api/method/editstop.md)
