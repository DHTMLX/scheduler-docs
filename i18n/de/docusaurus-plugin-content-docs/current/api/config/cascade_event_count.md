---
sidebar_label: "cascade_event_count"
title: "cascade_event_count config"
description: "definiert die maximale Anzahl von Events, die in einer Cascade angezeigt werden"
---

# cascade_event_count

### Description

@short: Definiert die maximale Anzahl von Events, die in einer Cascade angezeigt werden

@signature: cascade_event_count: number

### Example

~~~jsx
// maximale Anzahl von Events, die in einer Cascade sichtbar sind
scheduler.config.cascade_event_count = 4;
~~~

**Default value:** 4

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

Wenn mehr Events vorhanden sind als dieses Limit, werden die zusätzlichen oben auf der Cascade angezeigt.

### Related API
- [cascade_event_display](api/config/cascade_event_display.md)
- [cascade_event_margin](api/config/cascade_event_margin.md)
