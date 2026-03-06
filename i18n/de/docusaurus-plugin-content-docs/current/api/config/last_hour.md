---
sidebar_label: "last_hour"
title: "last_hour config"
description: "Definiert die obere Grenze für die Stundenskala auf der Y-Achse."
---

# last_hour

### Description

@short: Definiert die obere Grenze für die Stundenskala auf der Y-Achse.

@signature: last_hour: number

### Example

~~~jsx
scheduler.config.first_hour = 9;
scheduler.config.last_hour = 18;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** 24

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)
- [Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

### Details

![dayView_properties](/img/day_view_properties.png)

### Related API
- [first_hour](api/config/first_hour.md)
- [limit_time_select](api/config/limit_time_select.md)
