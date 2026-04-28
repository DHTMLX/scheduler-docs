---
sidebar_label: event
title: "event method"
description: "прикрепляет обработчик события к элементу HTML"
---

# event

### Description

@short: Прикрепляет обработчик события к элементу HTML

@signature: event: (node: HTMLElement|string, event: string, handler: SchedulerCallback, master?: any) =\> string

### Parameters

- `node` - (required) *HTMLElement|string* - узел HTML или его идентификатор
- `event` - (required) *string* - имя HTML-события (без префикса 'on')
- `handler` - (required) *function* - обработчик события
- `master` - (optional) *object* - объект, к которому относится ключевое слово <i>this</i>

### Returns
- `id` - (string) - идентификатор обработчика события (можно использовать в методе <b>eventRemove()</b>)

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