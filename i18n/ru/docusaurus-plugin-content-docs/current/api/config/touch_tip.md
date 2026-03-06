---
sidebar_label: "touch_tip"
title: "touch_tip config"
description: "управляет отображением всплывающих подсказок в правом верхнем углу экрана"
---

# touch_tip

### Description

@short: Управляет отображением всплывающих подсказок в правом верхнем углу экрана

@signature: touch_tip: boolean

### Example

~~~jsx
scheduler.config.touch_tip = false;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** true

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md)
