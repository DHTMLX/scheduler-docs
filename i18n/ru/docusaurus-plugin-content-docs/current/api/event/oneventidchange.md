---
sidebar_label: "onEventIdChange"
title: "onEventIdChange event"
description: "срабатывает при обновлении id события"
---

# onEventIdChange

### Description

@short: Срабатывает при обновлении id события

@signature: onEventIdChange: (old_id: string, new_id: string) =\> void;

### Parameters

- `old_id` - (required) *string* - оригинальный id события    
- `new_id` - (required) *string* - обновлённый id события

### Example

~~~jsx
scheduler.attachEvent("onEventIdChange", function(old_id,new_id){
    //любая пользовательская логика здесь
});
~~~

### Details

Это событие обычно происходит после подтверждения операции вставки, когда клиентский ID заменяется на ID из базы данных.
