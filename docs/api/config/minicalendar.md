---
sidebar_label: minicalendar
title: "minicalendar config"
description: "specifies the mini calendar object"
---

# minicalendar

### Description

@short: Specifies the mini calendar object

@signature: minicalendar: any

### Example

~~~jsx
scheduler.config.minicalendar.mark_events = false; 
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** \{ mark_events: true \}

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

:::note
 The property requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
::: 

The minicalendar object has 1 property:

- **mark_events** - (*array*) defines whether events will be highlighted in the mini calendar

<br>

![minicalendar_property](/img/minicalendar_property.png)
