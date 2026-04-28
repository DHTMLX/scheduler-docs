---
sidebar_label: batchUpdate
title: "batchUpdate метод"
description: "обновляет сразу несколько событий"
---

# batchUpdate

### Description

@short: Обновляет сразу несколько событий

@signature: batchUpdate: (callback: SchedulerCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (обязательный) *функция* - колбэк-функция
- `noRedraw` - (необязательный) *boolean* - указывает, следует ли Scheduler перерисовать график после вызова callback-функции; <i>true</i> - не перерисовывать и <i>false</i> (по умолчанию) - перерисовывать

### Example

~~~jsx
scheduler.batchUpdate(function(){
    const events = scheduler.getEvents();
    for(let i = 0; i < events.length; i++){
        const event = events[i];
        event.start_date = scheduler.date.add(event.start_date, 1, "day");
        event.end_date = scheduler.date.add(event.end_date, 1, "day");
        scheduler.updateEvent(event.id);
    }
});
~~~

### Details

Вы можете использовать этот метод для обновления сразу нескольких событий за одну перерисовку, вместо выполнения нескольких обновлений с несколькими повторными перерисовками.

### Related API
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)