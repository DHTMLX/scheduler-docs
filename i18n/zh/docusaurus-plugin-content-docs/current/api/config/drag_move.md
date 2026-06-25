---
sidebar_label: "drag_move"
title: "drag_move config"
description: "允许通过拖放操作重新定位事件"
---

# drag_move

### Description

@short: 允许通过拖放操作重新定位事件

@signature: drag_move: boolean

### Example

~~~jsx
scheduler.config.drag_move = false;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Timeline view](views/timeline.md), [Week view](views/week.md), [Units view](views/units.md)

### Related API
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_resize](api/config/drag_resize.md)
- [drag_create](api/config/drag_create.md)
