---
sidebar_label: "edit"
title: "edit method"
description: "在事件框内直接打开内联编辑器以更改事件文本"
---

# edit

### Description

@short: 在事件框内直接打开内联编辑器以更改事件文本

@signature: edit: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 事件的唯一标识符

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
