---
sidebar_label: onEventDrag
title: "onEventDrag event"
description: "срабатывает при перетаскивании или изменении размера события внутри scheduler"
---

# onEventDrag

### Description

@short: Срабатывает, когда пользователь перетаскивает/изменяет размер событий в планировщике

@signature: onEventDrag: (id: string, mode: string, ev: Event) => void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `mode` - (required) *string* - режим перетаскивания: "move","resize" или "new-size" (создание новых событий)
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", function (id, mode, e){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Lightbox только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [События только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Описание режимов:

- **move** - пользователь перетаскивает событие внутри планировщика.
- **resize** - пользователь изменяет размер события перетаскиванием.
- **new-size** - пользователь создает новое событие при перетаскивании.