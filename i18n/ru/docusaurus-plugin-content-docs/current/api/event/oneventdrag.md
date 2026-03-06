---
sidebar_label: "onEventDrag"
title: "onEventDrag event"
description: "срабатывает при перетаскивании или изменении размера события внутри scheduler"
---

# onEventDrag

### Description

@short: Срабатывает при перетаскивании или изменении размера события внутри scheduler

@signature: onEventDrag: (id: string, mode: string, ev: Event) =\> void;

### Parameters

- `id` - (required) *string* - ID события
- `mode` - (required) *string* - режим перетаскивания: "move", "resize" или "new-size" (при создании новых событий)
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", function (id, mode, e){
    // здесь можно добавить пользовательскую логику
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Описание режимов:

- **move** - событие перетаскивается по scheduler.
- **resize** - событие изменяется в размере с помощью drag-and-drop.
- **new-size** - создаётся новое событие с помощью drag-and-drop.
