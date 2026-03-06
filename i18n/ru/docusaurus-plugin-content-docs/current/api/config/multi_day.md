---
sidebar_label: "multi_day"
title: "multi_day config"
description: "позволяет отображать события, продолжающиеся несколько дней"
---

# multi_day

### Description

@short: Позволяет отображать события, продолжающиеся несколько дней

@signature: multi_day: boolean

### Example

~~~jsx
scheduler.config.multi_day = false;
    
scheduler.init('scheduler_here', new Date(2020,7,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Multi-day events](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/06_multi_day_events.html)

### Related API
- [multi_day_height_limit](api/config/multi_day_height_limit.md)
