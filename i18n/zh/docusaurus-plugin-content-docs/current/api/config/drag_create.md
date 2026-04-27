---
sidebar_label: "drag_create"
title: "drag_create config"
description: "允许通过拖拽操作创建新事件"
---

# drag_create

### Description

@short: 允许通过拖拽操作创建新事件

@signature: drag_create: boolean

### Example

~~~jsx
scheduler.config.drag_create = false;
...
scheduler.init('scheduler_here',new Date(2027,7,1),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Timeline view](views/timeline.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Related API
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_move](api/config/drag_move.md)
- [drag_resize](api/config/drag_resize.md)
