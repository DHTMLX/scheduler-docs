---
sidebar_label: "displayed_event_color"
title: "displayed_event_color config"
description: "определяет цвет фона по умолчанию для событий, отображаемых методом showEvent()"
---

# displayed_event_color

### Description

@short: Определяет цвет фона по умолчанию для событий, отображаемых методом showEvent()

@signature: displayed_event_color: string

### Example

~~~jsx
scheduler.config.displayed_event_color="#DFEDF7";
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** #ffc5ab

### Details

Этот параметр доступен с версии 3.5 и используется исключительно в контексте метода [showEvent](api/method/showevent.md).

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_text_color](api/config/displayed_event_text_color.md)
