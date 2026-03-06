---
sidebar_label: drag_lightbox
title: "drag_lightbox config"
description: "enables the possibility to drag the lightbox by the header"
---

# drag_lightbox

### Description

@short: Enables the possibility to drag the lightbox by the header

@signature: drag_lightbox: boolean

### Example

~~~jsx
scheduler.config.drag_lightbox = false;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"week");
~~~

**Default value:** true

### Related API
- [drag_create](api/config/drag_create.md)
- [drag_move](api/config/drag_move.md)
- [drag_resize](api/config/drag_resize.md)
