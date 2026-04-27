---
sidebar_label: "touch_drag"
title: "touch_drag config"
description: "设置区分长按手势和滚动手势的持续时间，单位为毫秒"
---

# touch_drag

### Description

@short: 设置区分长按手势和滚动手势的持续时间，单位为毫秒

@signature: touch_drag: number | boolean

### Example

~~~jsx
scheduler.config.touch_drag = 750;
...
scheduler.init('scheduler_here',new Date(2027,3,10),"week");
~~~

**Default value:** 500

### Details

请注意，将此参数设置为*false*将禁用事件的拖拽功能。

### Related API
- [touch](api/config/touch.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
