---
sidebar_label: edit
title: "Редактирование метода"
description: "Открывает встроенный inline editor для изменения текста события (редактор в окне события)"
---

# edit

### Description

@short: Открывает inline editor для изменения текста события (редактор в окне события)

@signature: edit: (id: string) =\> void

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
scheduler.edit(eventId);
~~~

### Details

![edit_method](/img/edit_method.png)

### Related API
- [editStop](api/method/editstop.md)