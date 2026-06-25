---
sidebar_label: event_duration
title: "event_duration config"
description: "sets the initial duration of events in minutes"
---

# event_duration

### Description

@short: Sets the initial duration of events in minutes

@signature: event_duration: number

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 5

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- The parameter is available from version 2.3.
- The parameter is used only in pair with the [auto_end_date](api/config/auto_end_date.md) option.
- If the [auto_end_date](api/config/auto_end_date.md) option is set to *true* then, when you change the start event time or date in the lightbox, the end event time and date will be changed automatically in order to make the event's duration equal to the value of 
the 'event_duration' option.

### Related API
- [auto_end_date](api/config/auto_end_date.md)
