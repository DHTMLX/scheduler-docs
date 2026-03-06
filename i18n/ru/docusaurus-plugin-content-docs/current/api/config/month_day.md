---
sidebar_label: "month_day"
title: "month_day config"
description: "определяет формат отображения дня в ячейках видов Month и Year"
---

# month_day

### Description

@short: Определяет формат отображения дня в ячейках видов Month и Year

@signature: month_day: string

### Example

~~~jsx
scheduler.config.month_day="%j";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%d"

**Applicable views:** [Month view](views/month.md), [Year view](views/year.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)
