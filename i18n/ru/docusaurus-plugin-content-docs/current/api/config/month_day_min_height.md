---
sidebar_label: "month_day_min_height"
title: "month_day_min_height config"
description: "задаёт минимальную высоту ячеек в Month view"
---

# month_day_min_height

### Description

@short: Задаёт минимальную высоту ячеек в Month view

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
 Это свойство работает только если включён плагин [container_autoresize](guides/extensions-list.md#containerautoresize). 
:::

### Related API
- [month_day](api/config/month_day.md)
