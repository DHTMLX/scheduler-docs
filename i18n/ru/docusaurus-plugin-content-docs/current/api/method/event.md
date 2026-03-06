---
sidebar_label: "event"
title: "event method"
description: "устанавливает обработчик event на HTML элемент"
---

# event

### Description

@short: Устанавливает обработчик event на HTML элемент

@signature: event: (node: HTMLElement|string, event: string, handler: SchedulerCallback, master?: any) =\> string

### Parameters

- `node` - (required) *HTMLElement | string* - HTML элемент или его id
- `event` - (required) *string* - название HTML event (без префикса 'on')
- `handler` - (required) *function* - функция, которая обрабатывает event
- `master` - (optional) *object* - объект, на который ссылается <i>this</i> внутри handler

### Returns
- ` id` - (string) - id обработчика event (можно использовать с методом <b>eventRemove()</b>)

### Example

~~~jsx
// добавляет обработчик для event 'click'
scheduler.event("divId", "click", function(e){
    //e - нативный объект event
    do_something();
});
~~~

### Details

Все слушатели event, добавленные через **event**, будут автоматически удалены при вызове [destructor](api/method/destructor.md).

### Related API
- [eventRemove](api/method/eventremove.md)

### Change log
- добавлено в версии 4.4
