---
sidebar_label: "time_step"
title: "time_step config"
description: "设置事件时间值的最小增量（以分钟为单位）"
---

# time_step

### Description

@short: 设置事件时间值的最小增量（以分钟为单位）

@signature: time_step: number

### Example

~~~jsx
scheduler.config.time_step = 15;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 5

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Month view](views/month.md), [Units view](views/units.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)

### Details

- 事件的开始和结束时间将对齐到 time_step 的倍数。例如，当 *time_step = 20* 时，事件只能在 0、20、40 分钟等时间点开始。
- lightbox 中的时间选择器也将遵循相同的 time_step，这同样适用于 Timeline 视图。
