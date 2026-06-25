---
sidebar_label: cascade_event_margin
title: "конфигурация cascade_event_margin"
description: "устанавливает левый отступ для каскада событий"
---

# cascade_event_margin

### Description

@short: Устанавливает левый отступ для каскада событий

@signature: cascade_event_margin: number

### Example

~~~jsx
scheduler.config.cascade_event_display = true;
scheduler.config.cascade_event_count = 4;     
scheduler.config.cascade_event_margin = 30; 
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Значение по умолчанию:** 30

**Подходящие представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Отображение событий как каскада](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

![cascade_event_margin_property](/img/cascade_event_margin_property.png)

### Related API
- [cascade_event_display](api/config/cascade_event_display.md)
- [cascade_event_count](api/config/cascade_event_count.md)