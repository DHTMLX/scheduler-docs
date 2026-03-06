---
sidebar_label: week_date
title: "week_date config"
description: "sets the format of the date in the sub-header of the Month view"
---

# week_date

### Description

@short: Sets the format of the date in the sub-header of the Month view

@signature: week_date: string

### Example

~~~jsx
scheduler.config.week_date="%l, %W";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%l"

**Applicable views:** [Month view](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Date Format Specification](guides/settings-format.md)
