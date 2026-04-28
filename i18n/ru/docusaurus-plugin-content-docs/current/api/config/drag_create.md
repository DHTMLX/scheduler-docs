---
sidebar_label: drag_create
title: "drag_create конфигурация"
description: "позволяет создавать новые события методом перетаскивания (drag-and-drop)"
---

# drag_create

### Description

@short: Позволяет создавать новые события методом перетаскивания (drag-and-drop)

@signature: drag_create: boolean

### Example

~~~jsx
scheduler.config.drag_create = false;
...
scheduler.init('scheduler_here',new Date(2027,7,1),"week");
~~~

**Значение по умолчанию:** true

**Доступные представления:** [Day view](views/day.md), [Month view](views/month.md), [Timeline view](views/timeline.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Обработка подсветки указателя](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Related API
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_move](api/config/drag_move.md)
- [drag_resize](api/config/drag_resize.md)