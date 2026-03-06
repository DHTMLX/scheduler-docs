---
sidebar_label: "onDragEnd"
title: "onDragEnd event"
description: "срабатывает, когда действие перетаскивания или изменения размера завершено"
---

# onDragEnd

### Description

@short: Срабатывает, когда действие перетаскивания или изменения размера завершено

@signature: onDragEnd: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `mode` - (required) *string* - тип действия перетаскивания: "move", "resize" или "create"
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
var dragged_event;
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // это помогает определить событие, которое перетаскивается
    dragged_event = scheduler.getEvent(id); 
    return true;
});

scheduler.attachEvent("onDragEnd", function(id, mode, e){
    var event_obj = dragged_event;
    // здесь разместите вашу кастомную логику
});
~~~

### Related API
- [onBeforeDrag](api/event/onbeforedrag.md)
