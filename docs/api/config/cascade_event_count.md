---
sidebar_label: cascade_event_count
title: "cascade_event_count config"
description: "sets the maximum number of events in a cascade"
---

# cascade_event_count

### Description

@short: Sets the maximum number of events in a cascade

@signature: cascade_event_count: number

### Example

~~~jsx
// how many events will be displayed in a cascade (max)
scheduler.config.cascade_event_count = 4;
~~~

**Default value:** 4

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

Events 'exceeding' the set value will be drawn over the cascade.

### Related API
- [cascade_event_display](api/config/cascade_event_display.md)
- [cascade_event_margin](api/config/cascade_event_margin.md)
