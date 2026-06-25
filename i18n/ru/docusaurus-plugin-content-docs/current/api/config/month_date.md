---
sidebar_label: month_date
title: "month_date конфигурация"
description: "задает формат заголовка для представления «Месяц»"
---

# month_date

### Description

@short: Задает формат заголовка для представления «Месяц»

@signature: month_date: string

### Example

~~~jsx
scheduler.config.month_date = "%F, %Y";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** "%F %Y"

**Доступные представления:** [представление «Месяц»](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)