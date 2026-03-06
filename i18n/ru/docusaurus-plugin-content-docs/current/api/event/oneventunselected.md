---
sidebar_label: "onEventUnselected"
title: "onEventUnselected event"
description: "срабатывает, когда пользователь отменяет выбор события, выбрав другое"
---

# onEventUnselected

### Description

@short: Срабатывает, когда пользователь отменяет выбор события, выбрав другое

@signature: onEventUnselected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - id события, которое было отменено в выборе

### Example

~~~jsx
scheduler.attachEvent("onEventUnselected", function(id){
    //любая пользовательская логика здесь
});
~~~

### Related API
- [onEventSelected](api/event/oneventselected.md)
