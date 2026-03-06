---
sidebar_label: "month_day_min_height"
title: "month_day_min_height config"
description: "Legt die Mindesthöhe für Zellen in der Month-Ansicht fest"
---

# month_day_min_height

### Description

@short: Legt die Mindesthöhe für Zellen in der Month-Ansicht fest

@signature: month_day_min_height: number

### Example

~~~jsx
scheduler.config.month_day_min_height = 150;
...
scheduler.init('scheduler_here', new Date(2013,5,30), "month");
~~~

**Default value:** 90

**Applicable views:** [Month view](views/month.md)

### Details

:::note
 Diese Eigenschaft funktioniert nur, wenn das [container_autoresize](guides/extensions-list.md#container-autoresize) Plugin aktiviert ist. 
:::

### Related API
- [month_day](api/config/month_day.md)
