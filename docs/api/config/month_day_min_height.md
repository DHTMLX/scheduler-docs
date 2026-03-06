---
sidebar_label: month_day_min_height
title: "month_day_min_height config"
description: "sets the minimum height of cells in the Month view"
---

# month_day_min_height

### Description

@short: Sets the minimum height of cells in the Month view

@signature: month_day_min_height: number

### Example

~~~jsx
scheduler.config.month_day_min_height = 150;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"month");
~~~

**Default value:** 90

**Applicable views:** [Month view](views/month.md)

### Details

:::note
 The property requires the [container_autoresize](guides/extensions-list.md#container-autoresize) plugin to be enabled. 
:::

### Related API
- [month_day](api/config/month_day.md)
