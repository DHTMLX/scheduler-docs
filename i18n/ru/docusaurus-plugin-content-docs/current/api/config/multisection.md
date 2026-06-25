---
sidebar_label: multisection
title: "конфигурация multisection"
description: "позволяет отображать те же события в нескольких секциях Timeline или Units view"
---

# multisection
:::info
 Эта функциональность доступна только в PRO-версии.
:::
### Description

@short: Позволяет отображать одни и те же события в нескольких секциях Timeline или Units view

@signature: multisection: boolean

### Example

~~~jsx
scheduler.config.multisection = true; 

scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");
~~~

**Значение по умолчанию:** false

**Доступные представления:**  [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [События с несколькими секциями в Timeline и Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Related API
- [multisection_shift_all](api/config/multisection_shift_all.md)

### Related Guides
- [Units View](views/units.md#displaying-units-for-multiple-days)
- [Timeline View](views/timeline.md#assignment-of-events-to-several-sections)