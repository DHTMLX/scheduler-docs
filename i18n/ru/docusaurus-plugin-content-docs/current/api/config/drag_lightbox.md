---
sidebar_label: "drag_lightbox"
title: "drag_lightbox config"
description: "позволяет перетаскивать lightbox за его заголовок"
---

# drag_lightbox

### Description

@short: Позволяет перетаскивать lightbox за его заголовок

@signature: drag_lightbox: boolean

### Example

~~~jsx
scheduler.config.drag_lightbox = false;
...
scheduler.init('scheduler_here', new Date(2013,5,30), "week");
~~~

**Default value:** true

### Related API
- [drag_create](api/config/drag_create.md)
- [drag_move](api/config/drag_move.md)
- [drag_resize](api/config/drag_resize.md)
