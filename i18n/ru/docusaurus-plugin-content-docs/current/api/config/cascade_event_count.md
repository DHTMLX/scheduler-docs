---
sidebar_label: "cascade_event_count"
title: "cascade_event_count config"
description: "определяет максимальное количество событий, отображаемых в каскаде"
---

# cascade_event_count

### Description

@short: Определяет максимальное количество событий, отображаемых в каскаде

@signature: cascade_event_count: number

### Example

~~~jsx
// максимальное количество видимых событий в каскаде
scheduler.config.cascade_event_count = 4;
~~~

**Default value:** 4

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

Если количество событий превышает этот лимит, дополнительные события будут отображены поверх каскада.

### Related API
- [cascade_event_display](api/config/cascade_event_display.md)
- [cascade_event_margin](api/config/cascade_event_margin.md)
