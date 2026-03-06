---
sidebar_label: "onEventSelected"
title: "onEventSelected event"
description: "срабатывает, когда пользователь выбирает событие в планировщике"
---

# onEventSelected

### Description

@short: Срабатывает, когда пользователь выбирает событие в планировщике

@signature: onEventSelected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - ID выбранного события

### Example

~~~jsx
scheduler.attachEvent("onEventSelected", function(id){
    //любая ваша логика здесь
});
~~~

### Related API
- [onEventUnselected](api/event/oneventunselected.md)
