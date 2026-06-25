---
sidebar_label: onEventDrag
title: "onEventDrag event"
description: "срабатывает при перетаскивании/изменении размеров событий в планировщике"
---

# onEventDrag

### Description

@short: Срабатывает при перетаскивании/изменении размеров событий в планировщике

@signature: onEventDrag: (id: string, mode: string, e: Event) => void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `mode` - (required) *string* - режим перетаскивания: "move","resize" или "new-size" (создание новых событий)
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", (id, mode, e) => {
    // любая пользовательская логика здесь
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Описание режимов:

- `move` - пользователь перетаскивает событие внутри Scheduler
- `resize` - пользователь изменяет размер события с помощью перетаскивания
- `new-size` - пользователь создает новое событие путем перетаскивания