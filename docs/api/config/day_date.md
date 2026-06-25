---
sidebar_label: day_date
title: "day_date config"
description: "sets the date format for the X-Axis of the Week and Units views"
---

# day_date

### Description

@short: Sets the date format for the X-Axis of the Week and Units views

@signature: day_date: string

### Example

~~~jsx
scheduler.config.day_date = "%F %j";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** "%D, %F %j"

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Details

![weekView_properties](/img/weekView_properties.png)

The config will take effect only if it is applied before the first initialization of the scheduler:

~~~js
scheduler.config.day_date = "%F %j";
scheduler.init('scheduler_here', new Date(2027, 7, 5), "day");
~~~

If you want to change the date format after the initialization, you need to redefine the [day_date](api/template/day_date.md) template:

~~~js
const formatDayDate = scheduler.date.date_to_str("%F %j");
scheduler.templates.day_date = function(date) {
    return formatDayDate(date);
};
~~~

### Related Guides
- [Date Format Specification](guides/settings-format.md)
- [Formatting Labels, Dates, Styles](guides/templates.md)
