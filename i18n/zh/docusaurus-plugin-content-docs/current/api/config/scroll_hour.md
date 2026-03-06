---
sidebar_label: "scroll_hour"
title: "scroll_hour config"
description: "定义调度器中垂直滚动位置的起始点，基于24小时制的小时数。"
---

# scroll_hour

### Description

@short: 定义调度器中垂直滚动位置的起始点，基于24小时制的小时数。

@signature: scroll_hour: number

### Example

~~~jsx
// 调度器初始化时显示当前日期，并滚动到当前小时
scheduler.config.scroll_hour = new Date().getHours();
...
scheduler.init('scheduler_here', new Date(), "week");
~~~

**Default value:** 0（表示调度器从午夜00:00开始显示小时刻度）

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)
