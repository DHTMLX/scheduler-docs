---
sidebar_label: eventRemove
title: "eventRemove method"
description: "удаляет обработчик события из HTML-элемента"
---

# eventRemove

### Description

@short: Удаляет обработчик события из HTML-элемента

@signature: eventRemove: (id: string) =\> void

### Parameters

- `id` - (обязательно) *string* - идентификатор обработчика события

### Example

~~~jsx
const eventId = scheduler.event("divId", "click", function(e){
    do_something();
});

scheduler.eventRemove(eventId);
~~~

### Details

Все обработчики событий, прикрепленные с использованием [event](api/method/event.md), будут автоматически отсоединены, когда будет вызван [destructor](api/method/destructor.md).

### Related API
- [event](api/method/event.md)

### Change log
- добавлено в версии 4.4