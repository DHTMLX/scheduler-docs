---
sidebar_label: onDragEnd
title: "Событие onDragEnd"
description: "Срабатывает, когда операция перетаскивания/изменения размера завершена"
---

# onDragEnd

### Description

@short: Срабатывает, когда операция перетаскивания/изменения размера завершена

@signature: onDragEnd: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `mode` - (required) *string* - режим перетаскивания: "move","resize" или "create"
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
let dragged_event;
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // это помогает определить событие, которое перетаскивается
    dragged_event = scheduler.getEvent(id); 
    return true;
});

scheduler.attachEvent("onDragEnd", function(id, mode, e){
    let event_obj = dragged_event;
    // здесь разместите вашу кастомную логику
});
~~~

### Related API
- [onBeforeDrag](api/event/onbeforedrag.md)