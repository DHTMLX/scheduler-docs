---
sidebar_label: week_date
title: "week_date конфигурация"
description: "устанавливает формат даты во подзаголовке представления месяца"
---

# week_date

### Description

@short: Устанавливает формат даты во подзаголовке представления месяца

@signature: week_date: string

### Example

~~~jsx
scheduler.config.week_date="%l, %W";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** "%l"

**Поддерживаемые представления:** [Month view](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)