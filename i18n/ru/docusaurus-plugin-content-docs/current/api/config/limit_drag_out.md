---
sidebar_label: "limit_drag_out"
title: "limit_drag_out config"
description: "предотвращает перетаскивание событий за пределы видимой области планировщика"
---

# limit_drag_out

### Description

@short: Предотвращает перетаскивание событий за пределы видимой области планировщика

@signature: limit_drag_out: boolean

### Example

~~~jsx
// предотвращает перетаскивание событий за пределы видимой области timeline
scheduler.config.limit_drag_out = true;
~~~

**Default value:** false

**Applicable views:** [Timeline view](views/timeline.md)
