---
sidebar_label: multisection_shift_all
title: "multisection_shift_all config"
description: "specifies whether while dragging events that assigned to several sections of the Timeline or Units view, all instances should be dragged at once ('true') or just the selected one ('false')"
---

# multisection_shift_all
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Specifies whether while dragging events that assigned to several sections of the Timeline or Units view, all instances should be dragged at once ('true') or just the selected one ('false')

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
 The property affects only dragging events vertically (between sections) 
:::

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units View](views/units.md#displaying-units-for-multiple-days)
- [Timeline View](views/timeline.md#assignment-of-events-to-several-sections)
