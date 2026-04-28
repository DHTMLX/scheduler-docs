---
sidebar_label: касание
title: "конфигурация касания"
description: "включает/выключает поддержку касания в планировщике"
---

# touch

### Description

@short: Включает/выключает поддержку касания в планировщике

@signature: touch: boolean | string

### Example

~~~jsx
scheduler.config.touch = "force";
...
scheduler.init('scheduler_here',new Date(2027,3,10),"week");
~~~

**Значение по умолчанию:** true

### Related samples
- [Адаптивный планировщик](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

### Details

Если параметр задан как строка, он принимает только одно значение - **'force'**.

<br>

Итак, существует три возможных значения параметра:

- *true* - планировщик пытается определить сенсорное устройство по анализу строки user-agent браузера и, если сенсорное устройство обнаружено, включает поддержку касания.
- *'force'* - включает постоянную поддержку касания, независимо от типа используемого устройства.
- *false* - отключает поддержку касания.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Мобильный адаптивный планировщик](guides/touch-support.md)