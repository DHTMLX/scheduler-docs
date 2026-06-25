---
sidebar_label: drag_highlight
title: "drag_highlight конфигурация"
description: "выделяет начальную позицию и продолжительность события на временной шкале, когда вы перетаскиваете событие над планировщиком"
---

# drag_highlight

### Description

@short: Выделяет начальную позицию и продолжительность события на временной шкале, когда вы перетаскиваете событие над планировщиком

@signature: drag_highlight: boolean

### Example

~~~jsx
//отключает выделение
scheduler.config.drag_highlight = false; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Значение по умолчанию:** true

### Details

![draghighlight_config](/img/draghighlight_config.png)

### Related API
- [highlightEventPosition](api/method/highlighteventposition.md)
- [drag_marker_class](api/template/drag_marker_class.md)

### Change log
- Выделение начальной позиции события было добавлено в версии v7.1