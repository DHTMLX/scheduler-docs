---
sidebar_label: "start_on_monday"
title: "start_on_monday config"
description: "设置一周的起始天"
---

# start_on_monday

### Description

@short: 设置一周的起始天

@signature: start_on_monday: boolean

### Example

~~~jsx
scheduler.config.start_on_monday = false;
...
scheduler.init('scheduler_here', new Date(2027, 05, 11), "week");
~~~

**Default value:** true

**Applicable views:** [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Year view](views/year.md)

### Related samples
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

当该参数设置为 *true* 时，周的起始日为星期一；如果设置为 *false*，则周的起始日为星期天。
