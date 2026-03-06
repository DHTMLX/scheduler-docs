---
sidebar_label: "eventRemove"
title: "eventRemove method"
description: "удаляет обработчик события с HTML-элемента"
---

# eventRemove

### Description

@short: Удаляет обработчик события с HTML-элемента

@signature: eventRemove: (id: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор обработчика события

### Example

~~~jsx
var eventId = scheduler.event("divId", "click", function(e){
    do_something();
});

scheduler.eventRemove(eventId);
~~~

### Details

Все слушатели событий, добавленные с помощью [event](api/method/event.md), автоматически удаляются при вызове [destructor](api/method/destructor.md).

### Related API
- [event](api/method/event.md)

### Change log
- added in version 4.4
