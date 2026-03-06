---
sidebar_label: full_day
title: "full_day config"
description: "enables setting of the event's duration to the full day"
---

# full_day

### Description

@short: Enables setting of the event's duration to the full day

@signature: full_day: boolean

### Example

~~~jsx
scheduler.config.full_day = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** false

### Related samples
- [Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Details

If the option is set to *true*, entry fields in the '**Time period**' section of the lightbox are blocked and the time period is set to the full day from **00.00** of the current cell date until **00.00** of the next day.

### Change log
- added in version 2.3
