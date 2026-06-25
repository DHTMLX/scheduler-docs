---
sidebar_label: scroll_hour
title: "scroll_hour config"
description: "устанавливает исходное положение вертикальной прокрутки в планировщике (один час в формате 24-часового времени)"
---

# scroll_hour

### Описание

@short: Устанавливает исходное положение вертикальной прокрутки в планировщике (один час в формате 24-часового времени)

@signature: scroll_hour: number

### Пример

~~~jsx
// scheduler изначально покажет текущий день, прокрученный до текущего часа
scheduler.config.scroll_hour = new Date().getHours();
...
scheduler.init('scheduler_here', new Date(), "week");
~~~

**Значение по умолчанию:** 0 (то есть планировщик отображает шкалу часов с полуночи — 00:00)

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)