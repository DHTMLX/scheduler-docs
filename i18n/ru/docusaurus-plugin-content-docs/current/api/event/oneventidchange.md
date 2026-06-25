---
sidebar_label: onEventIdChange
title: "onEventIdChange событие"
description: "срабатывает при изменении id события"
---

# onEventIdChange

### Description

@short: Срабатывает, когда изменяется id события

@signature: onEventIdChange: (old_id: string, new_id: string) =\> void;

### Parameters

- `old_id` - (required) *string* - исходный идентификатор события
- `new_id` - (required) *string* - новый идентификатор события

### Example

~~~jsx
scheduler.attachEvent("onEventIdChange", function(old_id,new_id){
    // любая ваша логика здесь
});
~~~

### Details

Обычно событие срабатывает после получения подтверждения операции вставки (замена ID на стороне клиента на ID в базе данных)