---
sidebar_label: onEventUnselected
title: "onEventUnselected event"
description: "срабатывает, когда пользователь снимает выделение с события, выбирая другое событие"
---

# onEventUnselected

### Description

@short: Срабатывает, когда пользователь снимает выделение с события, выбирая другое событие

@signature: onEventUnselected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события, которое было снято с выделения

### Example

~~~jsx
scheduler.attachEvent("onEventUnselected", function(id){
    // любая ваша логика здесь
});
~~~

### Связанные API
- [onEventSelected](api/event/oneventselected.md)