---
sidebar_label: "edit"
title: "edit method"
description: "이벤트 박스 내에서 이벤트의 텍스트를 직접 변경할 수 있도록 인라인 에디터를 엽니다."
---

# edit

### Description

@short: 이벤트 박스 내에서 이벤트의 텍스트를 직접 변경할 수 있도록 인라인 에디터를 엽니다.

@signature: edit: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 고유 식별자

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
