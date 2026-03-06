---
sidebar_label: "month_day_min_height"
title: "month_day_min_height config"
description: "设置月视图中单元格的最小高度"
---

# month_day_min_height

### Description

@short: 设置月视图中单元格的最小高度

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
 该属性仅在启用 [container_autoresize](guides/extensions-list.md#containerautoresize) 插件时生效。 
:::

### Related API
- [month_day](api/config/month_day.md)
