---
sidebar_label: "cascade_event_margin"
title: "cascade_event_margin config"
description: "определяет левый отступ для серии каскадных событий"
---

# cascade_event_margin

### Description

@short: Определяет левый отступ для серии каскадных событий

@signature: cascade_event_margin: number

### Example

~~~jsx
scheduler.config.cascade_event_display = true;
scheduler.config.cascade_event_count = 4;     
scheduler.config.cascade_event_margin = 30; 
...
scheduler.init('scheduler_here',new Date(2009,5,30),"week");
~~~

**Default value:** 30

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

![cascade_event_margin_property](/img/cascade_event_margin_property.png)

### Related API
- [cascade_event_display](api/config/cascade_event_display.md)
- [cascade_event_count](api/config/cascade_event_count.md)
