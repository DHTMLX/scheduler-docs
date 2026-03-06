---
sidebar_label: default_date
title: "default_date config"
description: "sets the date format used by the templates 'day_date', 'week_date', 'day_scale_date' for setting date in the views' headers"
---

# default_date

### Description

@short: Sets the date format used by the templates 'day_date', 'week_date', 'day_scale_date' for setting date in the views' headers

@signature: default_date: string

### Example

~~~jsx
scheduler.config.default_date = "%j %M %Y";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%j %M %Y"

**Applicable views:** [Day view](views/day.md), [Timeline view](views/timeline.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Units view](views/units.md)

### Related samples
- [Configuring the time scale (X-Axis)](https://docs.dhtmlx.com/scheduler/samples/06_timeline/05_week_lines.html)

### Details

![day_view_properties](/img/day_view_properties.png)

### Related API
- [day_date](api/template/day_date.md)
- [week_date](api/template/week_date.md)
- [day_scale_date](api/template/day_scale_date.md)

### Related Guides
- [Date Format Specification](guides/settings-format.md)
