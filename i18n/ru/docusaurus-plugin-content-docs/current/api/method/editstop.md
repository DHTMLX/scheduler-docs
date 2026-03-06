---
sidebar_label: "editStop"
title: "editStop method"
description: "завершает работу встроенного редактора событий, когда он открыт"
---

# editStop

### Description

@short: Завершает работу встроенного редактора событий, когда он открыт

@signature: editStop: (id: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события

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
