---
sidebar_label: cascade_event_display
title: "конфигурация cascade_event_display"
description: "устанавливает режим отображения 'cascade'"
---

# cascade_event_display

### Description

@short: Устанавливает режим отображения 'cascade'

@signature: cascade_event_display: boolean

### Example

~~~jsx
scheduler.config.cascade_event_display = true;
scheduler.config.cascade_event_count = 4;     
scheduler.config.cascade_event_margin = 30; 
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Значение по умолчанию:** false

**Подходящие представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

По умолчанию события, запланированные на одно и то же время, отображаются по одному. Если вы хотите представить такие события как каскад, установите параметр в значение *true*. 

![cascade_event_display_property](/img/cascade_event_display_property.png)

### Related API
- [cascade_event_count](api/config/cascade_event_count.md)
- [cascade_event_margin](api/config/cascade_event_margin.md)