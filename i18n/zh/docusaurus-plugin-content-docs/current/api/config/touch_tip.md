---
sidebar_label: "touch_tip"
title: "touch_tip config"
description: "控制提示消息是否显示在屏幕右上角"
---

# touch_tip

### Description

@short: 控制提示消息是否显示在屏幕右上角

@signature: touch_tip: boolean

### Example

~~~jsx
scheduler.config.touch_tip = false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** true

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
