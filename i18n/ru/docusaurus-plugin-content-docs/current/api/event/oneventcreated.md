--- 
sidebar_label: onEventCreated
title: "onEventCreated событие"
description: "срабатывает, когда пользователь начинает создание нового события (двойной клик или перетаскивание)"
---

# onEventCreated

### Description

@short: Срабатывает, когда пользователь начинает создание нового события (двойной клик или перетаскивание)

@signature: onEventCreated: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEventCreated", function(id,e){
    // любая ваша логика здесь
});
~~~