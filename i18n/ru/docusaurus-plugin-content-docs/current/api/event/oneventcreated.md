---
sidebar_label: "onEventCreated"
title: "onEventCreated event"
description: "срабатывает, когда пользователь начинает создание нового события (либо двойным кликом, либо перетаскиванием)"
---

# onEventCreated

### Description

@short: Срабатывает, когда пользователь начинает создание нового события (либо двойным кликом, либо перетаскиванием)

@signature: onEventCreated: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - уникальный идентификатор события
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEventCreated", function(id,e){
    //здесь можно добавить пользовательскую логику
});
~~~
