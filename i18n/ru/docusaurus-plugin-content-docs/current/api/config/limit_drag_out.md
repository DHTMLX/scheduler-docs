---
sidebar_label: limit_drag_out
title: "limit_drag_out конфигурация"
description: "Запрещает перетаскивать события за пределы видимой области планировщика"
---

# limit_drag_out

### Description

@short: Запрещает перетаскивать события за пределы видимой области планировщика

@signature: limit_drag_out: boolean

### Example

~~~jsx
// предотвращает перетаскивание событий за пределы видимой области timeline
scheduler.config.limit_drag_out = true;
~~~

**Значение по умолчанию:** false

**Доступные представления:** [Timeline view](views/timeline.md)