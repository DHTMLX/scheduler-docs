---
sidebar_label: displayed_event_color
title: "конфигурация displayed_event_color"
description: "устанавливает цвет фона по умолчанию для событий, получаемых методом showEvent()"
---

# displayed_event_color

### Description

@short: Устанавливает цвет фона по умолчанию для событий, получаемых методом showEvent()

@signature: displayed_event_color: string

### Example

~~~jsx
scheduler.config.displayed_event_color="#DFEDF7";
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** #ffc5ab

### Details

Параметр доступен начиная с версии 3.5 и используется только в контексте метода [showEvent](api/method/showevent.md).

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_text_color](api/config/displayed_event_text_color.md)