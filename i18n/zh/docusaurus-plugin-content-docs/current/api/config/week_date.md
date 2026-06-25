---
sidebar_label: "week_date"
title: "week_date config"
description: "定义月视图子标题中显示的日期格式。"
---

# week_date

### Description

@short: 定义月视图子标题中显示的日期格式。

@signature: week_date: string

### Example

~~~jsx
scheduler.config.week_date="%l, %W";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** "%l"

**Applicable views:** [Month view](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [날짜 형식 지정](guides/settings-format.md)
