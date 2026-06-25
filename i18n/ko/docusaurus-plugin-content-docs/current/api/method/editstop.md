---
sidebar_label: "editStop"
title: "editStop method"
description: "인라인 이벤트 에디터가 열려 있을 때 종료합니다."
---

# editStop

### Description

@short: 인라인 이벤트 에디터가 열려 있을 때 종료합니다.

@signature: editStop: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 ID

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
