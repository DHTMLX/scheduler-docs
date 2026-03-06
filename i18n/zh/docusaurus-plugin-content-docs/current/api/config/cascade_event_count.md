---
sidebar_label: "cascade_event_count"
title: "cascade_event_count config"
description: "定义级联中显示的最大事件数量"
---

# cascade_event_count

### Description

@short: 定义级联中显示的最大事件数量

@signature: cascade_event_count: number

### Example

~~~jsx
// 级联中可见的最大事件数量
scheduler.config.cascade_event_count = 4;
~~~

**Default value:** 4

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

如果事件数量超过此限制，超出的事件将显示在级联的顶部。

### Related API
- [cascade_event_display](api/config/cascade_event_display.md)
- [cascade_event_margin](api/config/cascade_event_margin.md)
