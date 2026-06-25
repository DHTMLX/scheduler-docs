---
sidebar_label: highlight_displayed_event
title: "highlight_displayed_event конфигурация"
description: "определяет, следует ли выделять события, полученные методом showEvent, во время отображения"
---

# highlight_displayed_event

### Description

@short: Определяет, следует ли выделять события, полученные методом showEvent, во время отображения

@signature: highlight_displayed_event: boolean

### Example

~~~jsx
scheduler.config.highlight_displayed_event=false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** true

### Details

Параметр доступен с версии 3.5 и используется только в контексте метода [showEvent](api/method/showevent.md).

### Related API
- [showEvent](api/method/showevent.md)