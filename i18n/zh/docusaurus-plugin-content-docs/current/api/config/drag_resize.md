---
sidebar_label: "drag_resize"
title: "drag_resize config"
description: "允许通过拖放操作调整事件的大小"
---

# drag_resize

### Description

@short: 允许通过拖放操作调整事件的大小

@signature: drag_resize: boolean

### Example

~~~jsx
scheduler.config.drag_resize = false;  
scheduler.init('scheduler_here', new Date(2020,5,30), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related API
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_move](api/config/drag_move.md)
- [drag_create](api/config/drag_create.md)
