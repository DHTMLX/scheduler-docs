---
sidebar_label: "touch_drag"
title: "touch_drag config"
description: "Legt die Dauer in Millisekunden fest, die eine lange Touch-Geste von einer Scroll-Geste unterscheidet"
---

# touch_drag

### Description

@short: Legt die Dauer in Millisekunden fest, die eine lange Touch-Geste von einer Scroll-Geste unterscheidet

@signature: touch_drag: number | boolean

### Example

~~~jsx
scheduler.config.touch_drag = 750;
...
scheduler.init('scheduler_here',new Date(2027,3,10),"week");
~~~

**Default value:** 500

### Details

Beachten Sie, dass das Setzen dieses Parameters auf *false* die Möglichkeit deaktiviert, Events zu draggen.

### Related API
- [touch](api/config/touch.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
