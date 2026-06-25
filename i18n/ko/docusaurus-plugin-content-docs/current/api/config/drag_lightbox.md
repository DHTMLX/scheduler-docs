---
sidebar_label: "drag_lightbox"
title: "drag_lightbox config"
description: "라이트박스를 헤더를 통해 드래그할 수 있도록 허용합니다."
---

# drag_lightbox

### Description

@short: 라이트박스를 헤더를 통해 드래그할 수 있도록 허용합니다.

@signature: drag_lightbox: boolean

### Example

~~~jsx
scheduler.config.drag_lightbox = false;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Default value:** true

### Related API
- [drag_create](api/config/drag_create.md)
- [drag_move](api/config/drag_move.md)
- [drag_resize](api/config/drag_resize.md)
