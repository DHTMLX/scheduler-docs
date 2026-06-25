---
sidebar_label: "month_day"
title: "month_day config"
description: "定义用于在月视图和年视图的单元格中显示日期的格式"
---

# month_day

### Description

@short: 定义用于在月视图和年视图的单元格中显示日期的格式

@signature: month_day: string

### Example

~~~jsx
scheduler.config.month_day="%j";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** "%d"

**Applicable views:** [Month view](views/month.md), [Year view](views/year.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [날짜 형식 지정](guides/settings-format.md)
