---
sidebar_label: onBeforeDrag
title: "onBeforeDrag событие"
description: "срабатывает, когда пользователь начинает операцию перетаскивания/изменения размера (версии 2.1+)"
---

# onBeforeDrag

### Description

@short: Срабатывает, когда пользователь начинает операцию перетаскивания/изменения размера (версии 2.1+)

@signature: onBeforeDrag: (id: string, mode: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - идентификатор события
- `mode` - (required) *string* - режим перетаскивания: "move","resize" или "create"
- `e` - (required) *Event* - объект нативного события

### Returns
- `\`result\` - (boolean) - определяет, будет ли выполнение действия по умолчанию у события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // любая ваша логика здесь
    return true;
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Событие срабатывает, когда пользователь кликает внутри scheduler на элемент, который можно перетаскивать. 

В случае режима "create" параметр id ещё не установлен, так как новое событие ещё не создано.
