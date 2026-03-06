---
sidebar_label: edit
title: "edit method"
description: "opens the inline editor to alter the event's text (the editor in the event's box)"
---

# edit

### Description

@short: Opens the inline editor to alter the event's text (the editor in the event's box)

@signature: edit: (id: string) =\> void

### Parameters

- `id` - (required) *string* - the event's id

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.edit(eventId);
~~~

### Details

![edit_method](/img/edit_method.png)

### Related API
- [editStop](api/method/editstop.md)
