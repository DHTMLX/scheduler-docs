--- 
sidebar_label: drag_lightbox
title: "Конфигурация drag_lightbox"
description: "позволяет перетаскивать lightbox за заголовок"
---

# drag_lightbox

### Description

@short: Позволяет перетаскивать lightbox за заголовок

@signature: drag_lightbox: boolean

### Example

~~~jsx
scheduler.config.drag_lightbox = false;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Значение по умолчанию:** true

### Related API
- [drag_create](api/config/drag_create.md)
- [drag_move](api/config/drag_move.md)
- [drag_resize](api/config/drag_resize.md)