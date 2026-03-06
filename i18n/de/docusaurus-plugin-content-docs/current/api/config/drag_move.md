---
sidebar_label: "drag_move"
title: "drag_move config"
description: "Ermöglicht das Verschieben von Events per Drag-and-Drop"
---

# drag_move

### Description

@short: Ermöglicht das Verschieben von Events per Drag-and-Drop

@signature: drag_move: boolean

### Example

~~~jsx
scheduler.config.drag_move = false;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"week");
~~~

**Default value:** true
@views;day, month, timeline, week, weekagenda,units

### Related API
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_resize](api/config/drag_resize.md)
- [drag_create](api/config/drag_create.md)
