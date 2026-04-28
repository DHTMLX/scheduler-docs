---
sidebar_label: multi_day_height_limit
title: "Конфигурация multi_day_height_limit"
description: "устанавливает высоту области, отображающей события на несколько дней"
---

# multi_day_height_limit

### Description

@short: Устанавливает высоту области, отображающей события на несколько дней

@signature: multi_day_height_limit: number | boolean

### Example

~~~jsx
scheduler.config.multi_day_height_limit = 30;
...
scheduler.init('scheduler_here',new Date(2013,7,11),"week");
~~~

**Значение по умолчанию:** 200

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

Как значение типа boolean, свойство может принимать только значение *false*.

### Related API
- [multi_day](api/config/multi_day.md)

### Change log
- изменено с `false` на `200` в v7.0.1