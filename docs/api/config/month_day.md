---
sidebar_label: month_day
title: "month_day config"
description: "sets the format for the day in the cells of the Month and Year views"
---

# month_day

### Description

@short: Sets the format for the day in the cells of the Month and Year views

@signature: month_day: string

### Example

~~~jsx
scheduler.config.month_day="%j";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%d"

**Applicable views:** [Month view](views/month.md), [Year view](views/year.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Date Format Specification](guides/settings-format.md)
