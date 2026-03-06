---
sidebar_label: multisection
title: "multisection config"
description: "enables the possibility to render the same events in several sections of the Timeline or Units view"
---

# multisection
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Enables the possibility to render the same events in several sections of the Timeline or Units view

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
- [Units View](views/units.md#displaying-units-for-multiple-days)
- [Timeline View](views/timeline.md#assignment-of-events-to-several-sections)
