---
sidebar_label: "detachEvent"
title: "detachEvent method"
description: "удаляет ранее добавленный обработчик события (тот, который был добавлен с помощью метода attachEvent)"
---

# detachEvent

### Description

@short: Удаляет ранее добавленный обработчик события (тот, который был добавлен с помощью метода attachEvent)

@signature: detachEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор обработчика события

### Example

~~~jsx
var myEvent = scheduler.attachEvent("onClick", function (id){
    ...//код обработчика события
});
...
scheduler.detachEvent(myEvent);
~~~

### Details

Любые слушатели событий, добавленные через [event](api/method/event.md), будут автоматически удалены при вызове [destructor](api/method/destructor.md).

### Related API
- [attachEvent](api/method/attachevent.md)
