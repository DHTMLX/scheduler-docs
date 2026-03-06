---
sidebar_label: "touch"
title: "touch config"
description: "включает или отключает поддержку touch в планировщике"
---

# touch

### Description

@short: Включает или отключает поддержку touch в планировщике

@signature: touch: boolean | string

### Example

~~~jsx
scheduler.config.touch = "force";
...
scheduler.init('scheduler_here',new Date(2013,3,10),"week");
~~~

**Default value:** true

### Related samples
- [Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

### Details

Если параметр задан как строка, он принимает только одно значение - **'force'**.

<br>

Это означает, что параметр может принимать три разных значения:

- *true* - планировщик пытается определить устройство с поддержкой touch, проверяя строку user-agent браузера, и активирует поддержку touch, если такое устройство обнаружено.
- *'force'* - поддержка touch включена всегда, независимо от используемого устройства.
- *false* - отключает поддержку touch.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md)
