---
sidebar_label: "edit"
title: "edit method"
description: "открывает inline редактор для изменения текста события непосредственно в его блоке"
---

# edit

### Description

@short: Открывает inline редактор для изменения текста события непосредственно в его блоке

@signature: edit: (id: string) =\> void

### Parameters

- `id` - (required) *string* - уникальный идентификатор события

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
