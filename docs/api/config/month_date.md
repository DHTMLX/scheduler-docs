---
sidebar_label: month_date
title: "month_date config"
description: "sets the format for the header of the Month view"
---

# month_date

### Description

@short: Sets the format for the header of the Month view

@signature: month_date: string

### Example

~~~jsx
scheduler.config.month_date = "%F, %Y";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** "%F %Y"

**Applicable views:** [Month view](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Date Format Specification](guides/settings-format.md)
