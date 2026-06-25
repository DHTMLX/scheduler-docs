---
sidebar_label: "drag_move"
title: "drag_move config"
description: "drag-and-drop을 사용하여 이벤트의 위치를 변경할 수 있습니다."
---

# drag_move

### Description

@short: Drag-and-drop을 사용하여 이벤트의 위치를 변경할 수 있습니다.

@signature: drag_move: boolean

### Example

~~~jsx
scheduler.config.drag_move = false;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Default value:** true
@views;day, month, timeline, week, weekagenda,units

### Related API
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_resize](api/config/drag_resize.md)
- [drag_create](api/config/drag_create.md)
