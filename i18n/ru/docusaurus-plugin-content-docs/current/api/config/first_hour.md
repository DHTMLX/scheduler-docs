---
sidebar_label: first_hour
title: "конфигурация first_hour"
description: "устанавливает минимальное значение для шкалы часов (оси Y)"
---

# first_hour

### Description

@short: Устанавливает минимальное значение для шкалы часов (оси Y)

@signature: first_hour: number

### Example

~~~jsx
scheduler.config.first_hour = 9;
scheduler.config.last_hour = 18;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** 0 (ноль)

**Подходящие представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

![day_view_properties](/img/day_view_properties.png)

### Related API
- [last_hour](api/config/last_hour.md)
- [limit_time_select](api/config/limit_time_select.md)