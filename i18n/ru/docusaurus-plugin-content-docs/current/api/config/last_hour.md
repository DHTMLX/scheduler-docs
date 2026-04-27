---
sidebar_label: last_hour
title: "конфигурация last_hour"
description: "устанавливает максимальное значение шкалы часов (ось Y)"
---

# last_hour

### Description

@short: Устанавливает максимальное значение шкалы часов (ось Y)

@signature: last_hour: number

### Example

~~~jsx
scheduler.config.first_hour = 9;
scheduler.config.last_hour = 18;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** 24

**Доступные представления:** [Дневной вид](views/day.md), [Недельный вид](views/week.md), [Вид по единицам](views/units.md)

### Related samples
- [Блокирование дат](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)
- [Отображение многодневных событий обычным способом](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

### Details

![dayView_properties](/img/day_view_properties.png)

### Related API
- [first_hour](api/config/first_hour.md)
- [limit_time_select](api/config/limit_time_select.md)