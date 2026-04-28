---
sidebar_label: touch_tip
title: "touch_tip конфигурация"
description: "Включает/выключает всплывающие сообщения в правом верхнем углу экрана"
---

# touch_tip

### Description

@short: Включает/выключает всплывающие сообщения в правом верхнем углу экрана

@signature: touch_tip: boolean

### Example

~~~jsx
scheduler.config.touch_tip = false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** true

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Мобильный адаптивный Scheduler](guides/touch-support.md)