---
sidebar_label: "resize_month_events"
title: "resize_month_events config"
description: "позволяет изменять размер событий, продолжающихся несколько дней, в представлении Месяц с помощью drag-and-drop"
---

# resize_month_events

### Description

@short: Позволяет изменять размер событий, продолжающихся несколько дней, в представлении Месяц с помощью drag-and-drop

@signature: resize_month_events: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true;

scheduler.init('scheduler_here', new Date(2010,0,10), "month");
~~~

**Default value:** false

**Applicable views:** [Month view](views/month.md)

### Related samples
- [Resizable events in Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/32_resizable_month_events.html)

### Details

![resize_month_events](/img/resize_month_events.png)

### Related API
- [resize_month_timed](api/config/resize_month_timed.md)

### Related Guides
- [Месячный вид](views/month.md)
