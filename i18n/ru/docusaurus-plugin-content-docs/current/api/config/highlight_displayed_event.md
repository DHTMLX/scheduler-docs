---
sidebar_label: "highlight_displayed_event"
title: "highlight_displayed_event config"
description: "определяет, будут ли события, полученные с помощью метода showEvent, подсвечиваться при отображении"
---

# highlight_displayed_event

### Description

@short: Определяет, будут ли события, полученные с помощью метода showEvent, подсвечиваться при отображении

@signature: highlight_displayed_event: boolean

### Example

~~~jsx
scheduler.config.highlight_displayed_event=false;
...
scheduler.init('scheduler_here',new Date(2010,0,10),"week");
~~~

**Default value:** true

### Details

Этот параметр доступен с версии 3.5 и применяется исключительно к методу [showEvent](api/method/showevent.md).

### Related API
- [showEvent](api/method/showevent.md)
