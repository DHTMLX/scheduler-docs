---
sidebar_label: onBeforeDrag
title: "onBeforeDrag event"
description: "срабатывает, когда пользователь начинает операцию перетаскивания/изменения размера (версия 2.1+)"
---

# onBeforeDrag

### Description

@short: Срабатывает, когда пользователь начинает операцию перетаскивания/изменения размера (версия 2.1+)

@signature: onBeforeDrag: (id: string, mode: string, e: Event) => boolean

### Parameters

- `id` - (required) *string* - идентификатор события
- `mode` - (required) *string* - режим перетаскивания: "move","resize" или "create"
- `e` - (required) *Event* - нативный объект события

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию у события (`true`) или отменено (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", (id, mode, e) => {
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Событие срабатывает, когда пользователь кликает внутри Scheduler по элементу, который можно перетащить.

Для режима "create" значение `id` не предоставляется, потому что новое событие ещё не создано.