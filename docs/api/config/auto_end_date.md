---
sidebar_label: auto_end_date
title: "auto_end_date config"
description: "enables automatic changing of the end event date after changing the start date"
---

# auto_end_date

### Description

@short: Enables automatic changing of the end event date after changing the start date

@signature: auto_end_date: boolean

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** false

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- The parameter is available from version 2.3.
- The parameter is used only in pair with the [event_duration](api/config/event_duration.md) option.
- If the parameter is set to *true* then, when you change the start event time or date in the lightbox, the end event time and date will be changed automatically, in order to make the event's duration equal to the value of 
the [event_duration](api/config/event_duration.md) option.

### Related API
- [event_duration](api/config/event_duration.md)
