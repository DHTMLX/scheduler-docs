---
sidebar_label: "hour_date"
title: "hour_date config"
description: "Definiert das Zeitformat, das auf der Y-Achse angezeigt wird. Es wird auch in den Standard-Event- und Lightbox-Templates verwendet, um den Zeitanteil zu formatieren."
---

# hour_date

### Description

@short: Definiert das Zeitformat, das auf der Y-Achse angezeigt wird. Es wird auch in den Standard-Event- und Lightbox-Templates verwendet, um den Zeitanteil zu formatieren.

@signature: hour_date: string

### Example

~~~jsx
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** "%H:%i"

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)
- [Removing needless hours from the time scale](https://docs.dhtmlx.com/scheduler/samples/06_timeline/09_drag_duration.html)

### Details

![weekView_properties](/img/weekView_properties.png)

### Related API
- [hour_size_px](api/config/hour_size_px.md)
- [event_header](api/template/event_header.md)
- [event_date](api/template/event_date.md)
- [event_bar_date](api/template/event_bar_date.md)

### Related Guides
- [Datumsformat-Spezifikation](guides/settings-format.md)
