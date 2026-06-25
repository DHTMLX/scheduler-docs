---
sidebar_label: cascade_event_count
title: "cascade_event_count config"
description: "устанавливает максимальное количество событий в каскаде"
---

# cascade_event_count

### Description

@short: Устанавливает максимальное количество событий в каскаде

@signature: cascade_event_count: number

### Example

~~~jsx
// максимальное количество видимых событий в каскаде
scheduler.config.cascade_event_count = 4;
~~~

**Значение по умолчанию:** 4

**Подходящие представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Отображение событий как каскада](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

События, превышающие установленное значение, будут отображаться поверх каскада.

### Related API
- [cascade_event_display](api/config/cascade_event_display.md)
- [cascade_event_margin](api/config/cascade_event_margin.md)