---
sidebar_label: hour_size_px
title: "hour_size_px конфигурация"
description: "устанавливает высоту единицы часа в пикселях"
---

# hour_size_px

### Description

@short: Устанавливает высоту единицы часа в пикселях

@signature: hour_size_px: number

### Example

~~~jsx
scheduler.config.hour_size_px = 40;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Значение по умолчанию:** 42

**Доступные представления:** [Вид по дням](views/day.md), [Вид на неделю](views/week.md), [Вид по единицам](views/units.md)

### Related samples
- [Настройка формата оси Y](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)
- [Изменение шага оси Y](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)

### Details

![weekView_properties](/img/weekView_properties.png)

### Related API
- [hour_date](api/config/hour_date.md)