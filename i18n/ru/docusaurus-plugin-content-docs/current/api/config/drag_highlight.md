---
sidebar_label: "drag_highlight"
title: "drag_highlight config"
description: "Эта опция выделяет начальную точку события и его длительность на шкале времени при перетаскивании события в scheduler."
---

# drag_highlight

### Description

@short: Эта опция выделяет начальную точку события и его длительность на шкале времени при перетаскивании события в scheduler.

@signature: drag_highlight: boolean

### Example

~~~jsx
//отключает выделение
scheduler.config.drag_highlight = false; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![draghighlight_config](/img/draghighlight_config.png)

### Related API
- [highlightEventPosition](api/method/highlighteventposition.md)
- [drag_marker_class](api/template/drag_marker_class.md)

### Change log
- Выделение исходного положения события во время drag было добавлено в версии v7.1
