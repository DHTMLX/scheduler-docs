---
sidebar_label: editStop
title: "Метод editStop"
description: "Закрывает встроенный редактор события, если он в данный момент открыт"
---

# editStop

### Description

@short: Закрывает встроенный редактор события, если он в данный момент открыт

@signature: editStop: (id: string) =\> void

### Parameters

- `id` - (обязательный) *string* - идентификатор события

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