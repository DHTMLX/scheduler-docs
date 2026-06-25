---
sidebar_label: onTimelineCreated
title: "onTimelineCreated event"
description: "срабатывает после инициализации Timeline view, но ещё не отрисован на странице (только Timeline view)"
---

# onTimelineCreated

### Description

@short: Срабатывает после инициализации Timeline view, но ещё не отрисован на странице (только Timeline view)

@signature: onTemplatesReady: (config: object) => void

### Parameters

- `config` - (required) *object* - объект конфигурации Timeline view

### Example

~~~jsx
scheduler.attachEvent("onTimelineCreated", function (config){
    // любая ваша логика здесь
});
~~~

### Details

Это событие вызывается из метода [createTimelineView](api/method/createtimelineview.md).
