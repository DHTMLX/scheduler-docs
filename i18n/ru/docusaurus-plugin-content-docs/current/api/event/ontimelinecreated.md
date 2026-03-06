---
sidebar_label: "onTimelineCreated"
title: "onTimelineCreated event"
description: "срабатывает один раз после настройки вида Timeline, но до его отображения на странице (применимо только к виду Timeline)"
---

# onTimelineCreated

### Description

@short: Срабатывает один раз после настройки вида Timeline, но до его отображения на странице (применимо только к виду Timeline)

@signature: onTemplatesReady: (config: object) =\> void

### Parameters

- `config` - (required) *object* - объект конфигурации для вида Timeline

### Example

~~~jsx
scheduler.attachEvent("onTimelineCreated", function (config){
    //любая ваша логика здесь
});
~~~

### Details

Это событие вызывается из метода [createTimelineView](api/method/createtimelineview.md).
