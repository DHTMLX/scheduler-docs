---
sidebar_label: "batchUpdate"
title: "batchUpdate method"
description: "обновляет несколько событий одновременно"
---

# batchUpdate

### Description

@short: Обновляет несколько событий одновременно

@signature: batchUpdate: (callback: SchedulerCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - функция обратного вызова
- `noRedraw` - (optional) *boolean* - необязательный параметр, определяет, должен ли Scheduler перерисовывать график после выполнения функции обратного вызова; <i>true</i> означает без перерисовки, а <i>false</i> (по умолчанию) - с перерисовкой

### Example

~~~jsx
scheduler.batchUpdate(function(){
    const events = scheduler.getEvents();
    for(var i = 0; i < events.length; i++){
        const event = events[i];
        event.start_date = scheduler.date.add(event.start_date, 1, "day");
        event.end_date = scheduler.date.add(event.end_date, 1, "day");
        scheduler.updateEvent(event.id);
    }
});
~~~

### Details

Этот метод позволяет обновлять несколько событий одновременно с одной лишь перерисовкой, что эффективнее, чем выполнение множества обновлений, каждое из которых вызывает свою собственную перерисовку.

### Related API
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)
