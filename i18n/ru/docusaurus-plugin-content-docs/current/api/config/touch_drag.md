---
sidebar_label: "touch_drag"
title: "touch_drag config"
description: "устанавливает длительность в миллисекундах, которая отличает жест долгого касания от жеста прокрутки"
---

# touch_drag

### Description

@short: Устанавливает длительность в миллисекундах, которая отличает жест долгого касания от жеста прокрутки

@signature: touch_drag: number | boolean

### Example

~~~jsx
scheduler.config.touch_drag = 750;
...
scheduler.init('scheduler_here',new Date(2013,3,10),"week");
~~~

**Default value:** 500

### Details

Имейте в виду, что установка этого параметра в *false* отключит возможность drag событий.

### Related API
- [touch](api/config/touch.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md)
