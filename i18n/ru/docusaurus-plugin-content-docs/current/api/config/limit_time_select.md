---
sidebar_label: limit_time_select
title: "limit_time_select конфигурация"
description: "устанавливает максимальные и минимальные значения тайм-селектора в lightbox на значения опций 'last_hour' и 'first_hour'"
---

# limit_time_select

### Description

@short: Устанавливает максимальные и минимальные значения тайм-селектора в lightbox на значения опций 'last_hour' и 'first_hour'

@signature: limit_time_select: boolean

### Example

~~~jsx
scheduler.config.limit_time_select = true;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** false

### Related API
- [last_hour](api/config/last_hour.md)
- [first_hour](api/config/first_hour.md)