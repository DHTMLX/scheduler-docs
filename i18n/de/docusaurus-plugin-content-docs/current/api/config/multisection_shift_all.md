---
sidebar_label: "multisection_shift_all"
title: "multisection_shift_all config"
description: "Steuert, ob beim Ziehen von Events, die mehreren Sektionen in der Timeline- oder Units-Ansicht zugewiesen sind, alle Instanzen gemeinsam verschoben werden ('true') oder nur die ausgewählte ('false')."
---

# multisection_shift_all
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Steuert, ob beim Ziehen von Events, die mehreren Sektionen in der Timeline- oder Units-Ansicht zugewiesen sind, alle Instanzen gemeinsam verschoben werden ('true') oder nur die ausgewählte ('false').

@signature: multisection_shift_all: boolean

### Example

~~~jsx
scheduler.config.multisection_shift_all = false;

scheduler.init('scheduler_here', new Date(2027, 5, 30), "timeline");
~~~

**Default value:** true

**Applicable views:** [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Details

:::note
 Diese Einstellung gilt nur beim vertikalen Ziehen von Events (zwischen Sektionen) 
:::

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units-Ansicht](views/units.md#displaying-units-for-multiple-days)
- [Timeline-Ansicht](views/timeline.md#assignment-of-events-to-several-sections)
