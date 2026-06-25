---
sidebar_label: touch_drag
title: "touch_drag конфигурация"
description: "определяет временной интервал в миллисекундах, который используется для различения жеста долгого нажатия от жеста прокрутки"
---

# touch_drag

### Description

@short: Определяет временной интервал в миллисекундах, который используется для различения жеста долгого нажатия от жеста прокрутки

@signature: touch_drag: number | boolean

### Example

~~~jsx
scheduler.config.touch_drag = 750;
...
scheduler.init('scheduler_here',new Date(2027,3,10),"week");
~~~

**Значение по умолчанию:** 500

### Details

Примечание: если параметр установить в *false*, пользователь не сможет перетаскивать события.

### Related API
- [touch](api/config/touch.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Мобильный адаптивный Scheduler](guides/touch-support.md)