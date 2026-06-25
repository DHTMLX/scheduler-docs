---
sidebar_label: displayed_event_text_color
title: "конфигурация displayed_event_text_color"
description: "устанавливает цвет шрифта по умолчанию для событий, получаемых методом showEvent()"
---

# displayed_event_text_color

### Description

@short: Устанавливает цвет шрифта по умолчанию для событий, получаемых методом showEvent()

@signature: displayed_event_text_color: string

### Example

~~~jsx
scheduler.config.displayed_event_text_color="#195D8A";
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** #7e2727

### Details

Параметр доступен начиная с версии 3.5 и используется только в контексте метода [showEvent](api/method/showevent.md).

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_color](api/config/displayed_event_color.md)