---
sidebar_label: "week_date"
title: "week_date config"
description: "Определяет формат даты, отображаемый в подзаголовке вида Month."
---

# week_date

### Description

@short: Определяет формат даты, отображаемый в подзаголовке вида Month.

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
- [Спецификация формата даты](guides/settings-format.md)
