---
sidebar_label: cascade_event_display
title: "cascade_event_display config"
description: "sets the 'cascade' display mode"
---

# cascade_event_display

### Description

@short: Sets the 'cascade' display mode

@signature: cascade_event_display: boolean

### Example

~~~jsx
scheduler.config.cascade_event_display = true;
scheduler.config.cascade_event_count = 4;     
scheduler.config.cascade_event_margin = 30; 
...
scheduler.init('scheduler_here',new Date(2009,5,30),"week");
~~~

**Default value:** false

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

By default, events scheduled to the same time are displayed one by one. If you want to present such events as a cascade, set the option to *true*. 

<br>
![cascade_event_display_property](/img/cascade_event_display_property.png)

### Related API
- [cascade_event_count](api/config/cascade_event_count.md)
- [cascade_event_margin](api/config/cascade_event_margin.md)
