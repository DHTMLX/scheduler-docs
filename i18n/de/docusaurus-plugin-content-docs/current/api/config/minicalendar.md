---
sidebar_label: "minicalendar"
title: "minicalendar config"
description: "definiert das Mini-Calendar-Objekt"
---

# minicalendar

### Description

@short: Definiert das Mini-Calendar-Objekt

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
 Diese Eigenschaft erfordert, dass das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
::: 

Das minicalendar-Objekt enthält eine Eigenschaft:

- **mark_events** - (*array*) legt fest, ob Events im Mini-Calendar hervorgehoben werden sollen

<br>

![minicalendar_property](/img/minicalendar_property.png)
