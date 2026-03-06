---
sidebar_label: "multi_day_height_limit"
title: "multi_day_height_limit config"
description: "управляет высотой секции, показывающей события, длящихся несколько дней"
---

# multi_day_height_limit

### Description

@short: Управляет высотой секции, показывающей события, длящихся несколько дней

@signature: multi_day_height_limit: number | boolean

### Example

~~~jsx
scheduler.config.multi_day_height_limit = 30;
...
scheduler.init('scheduler_here',new Date(2013,7,11),"week");
~~~

**Default value:** 200

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

Если используется как boolean, это свойство принимает только значение *false*.

### Related API
- [multi_day](api/config/multi_day.md)

### Change log
- изменено с `false` на `200` в версии v7.0.1
