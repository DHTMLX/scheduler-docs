---
sidebar_label: detachEvent
title: "Метод detachEvent"
description: "отсоединяет обработчик от события (которое ранее было привязано методом attachEvent)"
---

# detachEvent

### Description

@short: Отсоединяет обработчик от события (которое ранее было привязано методом attachEvent)

@signature: detachEvent: (id: string) =\> void

### Parameters

- `id` - (обязательный) *string* - идентификатор события

### Example

~~~jsx
const myEvent = scheduler.attachEvent("onClick", function (id){
    ...//код обработчика события
});
...
scheduler.detachEvent(myEvent);
~~~

### Details

Все обработчики событий, привязанные с использованием [event](api/method/event.md) будут автоматически отсоединены при вызове [destructor](api/method/destructor.md).

### Related API
- [attachEvent](api/method/attachevent.md)