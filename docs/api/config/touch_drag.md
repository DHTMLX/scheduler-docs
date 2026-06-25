---
sidebar_label: touch_drag
title: "touch_drag config"
description: "defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture"
---

# touch_drag

### Description

@short: Defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture

@signature: touch_drag: number | boolean

### Example

~~~jsx
scheduler.config.touch_drag = 750;
...
scheduler.init('scheduler_here',new Date(2027,3,10),"week");
~~~

**Default value:** 500

### Details

Note, if you set the parameter to *false*, the user won't be able to drag events.

### Related API
- [touch](api/config/touch.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
