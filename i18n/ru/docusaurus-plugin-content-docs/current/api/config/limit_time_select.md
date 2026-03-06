---
sidebar_label: "limit_time_select"
title: "limit_time_select config"
description: "Ограничивает селектор времени в лайтбоксе, устанавливая максимальные и минимальные значения в соответствии с опциями 'last_hour' и 'first_hour'."
---

# limit_time_select

### Description

@short: Ограничивает селектор времени в лайтбоксе, устанавливая максимальные и минимальные значения в соответствии с опциями 'last_hour' и 'first_hour'.

@signature: limit_time_select: boolean

### Example

~~~jsx
scheduler.config.limit_time_select = true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** false

### Related API
- [last_hour](api/config/last_hour.md)
- [first_hour](api/config/first_hour.md)
