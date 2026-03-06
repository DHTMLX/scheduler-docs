---
sidebar_label: "displayed_event_text_color"
title: "displayed_event_text_color config"
description: "определяет цвет шрифта по умолчанию для событий, отображаемых методом showEvent()"
---

# displayed_event_text_color

### Description

@short: Определяет цвет шрифта по умолчанию для событий, отображаемых методом showEvent()

@signature: displayed_event_text_color: string

### Example

~~~jsx
scheduler.config.displayed_event_text_color="#195D8A";
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** #7e2727

### Details

Этот параметр доступен с версии 3.5 и используется специально с методом [showEvent](api/method/showevent.md).

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_color](api/config/displayed_event_color.md)
