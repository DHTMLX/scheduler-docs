---
sidebar_label: "onBeforeDrag"
title: "onBeforeDrag event"
description: "срабатывает, когда пользователь начинает действие перетаскивания или изменения размера (доступно с версии 2.1+)"
---

# onBeforeDrag

### Description

@short: Срабатывает, когда пользователь начинает действие перетаскивания или изменения размера (доступно с версии 2.1+)

@signature: onBeforeDrag: (id: string, mode: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - идентификатор события
- `mode` - (required) *string* - тип действия перетаскивания: "move", "resize" или "create"
- `e` - (required) *Event* - объект нативного события

### Returns
- ` result` - (boolean) - определяет, должно ли выполняться действие по умолчанию для события (<b>true</b>) или быть предотвращено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Это событие срабатывает, когда пользователь кликает внутри scheduler по элементу, поддерживающему перетаскивание.

В случае режима "create" параметр id ещё не установлен, так как новое событие ещё не создано.
