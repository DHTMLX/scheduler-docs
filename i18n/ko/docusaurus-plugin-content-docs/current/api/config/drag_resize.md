---
sidebar_label: "drag_resize"
title: "drag_resize config"
description: "드래그 앤 드롭을 사용하여 이벤트 크기를 조절할 수 있습니다."
---

# drag_resize

### Description

@short: 드래그 앤 드롭을 사용하여 이벤트 크기를 조절할 수 있습니다.

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
