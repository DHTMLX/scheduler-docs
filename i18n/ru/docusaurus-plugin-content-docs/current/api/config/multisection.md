---
sidebar_label: "multisection"
title: "multisection config"
description: "позволяет отображать одни и те же события в нескольких секциях в представлениях Timeline или Units"
---

# multisection
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Позволяет отображать одни и те же события в нескольких секциях в представлениях Timeline или Units

@signature: multisection: boolean

### Example

~~~jsx
scheduler.config.multisection = true; 

scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");
~~~

**Default value:** false

**Applicable views:** [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Related API
- [multisection_shift_all](api/config/multisection_shift_all.md)

### Related Guides
- [Units View](views/units.md)
- [Вид 'Timeline'](views/timeline.md)
