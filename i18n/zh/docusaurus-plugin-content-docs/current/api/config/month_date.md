---
sidebar_label: "month_date"
title: "month_date config"
description: "定义月视图头部的日期格式"
---

# month_date

### Description

@short: 定义月视图头部的日期格式

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
- [날짜 형식 지정](guides/settings-format.md)
