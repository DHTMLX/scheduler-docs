---
sidebar_label: first_hour
title: "first_hour config"
description: "sets the minimum value for the hour scale (Y-Axis)"
---

# first_hour

### Description

@short: Sets the minimum value for the hour scale (Y-Axis)

@signature: first_hour: number

### Example

~~~jsx
scheduler.config.first_hour = 9;
scheduler.config.last_hour = 18;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 0 (zero)

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

![day_view_properties](/img/day_view_properties.png)

### Related API
- [last_hour](api/config/last_hour.md)
- [limit_time_select](api/config/limit_time_select.md)
