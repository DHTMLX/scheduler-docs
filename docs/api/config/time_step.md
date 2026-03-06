---
sidebar_label: time_step
title: "time_step config"
description: "sets the minimum step (in minutes) for event's time values"
---

# time_step

### Description

@short: Sets the minimum step (in minutes) for event's time values

@signature: time_step: number

### Example

~~~jsx
scheduler.config.time_step = 15;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** 5

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Month view](views/month.md), [Units view](views/units.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)

### Details

- Start and end times of an event will have the values multiple of the time step, i.e. if *time_step = 20*, the event can start only at: 0, 20, 40 minutes etc. 
- The lightbox time selector will have the same time step (it's true for the Timeline view as well).
