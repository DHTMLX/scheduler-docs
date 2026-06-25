---
sidebar_label: "multisection"
title: "multisection config"
description: "Ermöglicht das Rendern derselben Events über mehrere Sektionen hinweg in der Timeline- oder Units-Ansicht"
---

# multisection
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Ermöglicht das Rendern derselben Events über mehrere Sektionen hinweg in der Timeline- oder Units-Ansicht

@signature: multisection: boolean

### Example

~~~jsx
scheduler.config.multisection = true; 

scheduler.init('scheduler_here', new Date(2027, 5, 30), "timeline");
~~~

**Default value:** false

**Applicable views:** [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Related API
- [multisection_shift_all](api/config/multisection_shift_all.md)

### Related Guides
- [Units-Ansicht](views/units.md#displaying-units-for-multiple-days)
- [Timeline-Ansicht](views/timeline.md#assignment-of-events-to-several-sections)
