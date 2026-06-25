---
sidebar_label: drag_resize
title: "drag_resize config"
description: "Позволяет изменять размер событий перетаскиванием"
---

# drag_resize

### Description

@short: Позволяет изменять размер событий перетаскиванием

@signature: drag_resize: boolean

### Example

~~~jsx
scheduler.config.drag_resize = false;
scheduler.init('scheduler_here', new Date(2020,5,30), "week");
~~~

**Значение по умолчанию:** true

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related API
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_move](api/config/drag_move.md)
- [drag_create](api/config/drag_create.md)