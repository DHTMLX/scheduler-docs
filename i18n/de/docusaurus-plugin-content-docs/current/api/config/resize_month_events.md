---
sidebar_label: "resize_month_events"
title: "resize_month_events config"
description: "Ermöglicht das Ändern der Größe von mehrtägigen Events in der Month-Ansicht mittels Drag-and-Drop"
---

# resize_month_events

### Description

@short: Ermöglicht das Ändern der Größe von mehrtägigen Events in der Month-Ansicht mittels Drag-and-Drop

@signature: resize_month_events: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true;

scheduler.init('scheduler_here', new Date(2027,0,10), "month");
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
- [Monatsansicht](views/month.md#resizing-events-by-drag-n-drop-ver-41)
