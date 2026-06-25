---
sidebar_label: "touch_tip"
title: "touch_tip config"
description: "Steuert, ob Hinweisnachrichten in der oberen rechten Ecke des Bildschirms angezeigt werden"
---

# touch_tip

### Description

@short: Steuert, ob Hinweisnachrichten in der oberen rechten Ecke des Bildschirms angezeigt werden

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
