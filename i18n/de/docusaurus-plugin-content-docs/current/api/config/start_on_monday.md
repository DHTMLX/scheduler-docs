---
sidebar_label: "start_on_monday"
title: "start_on_monday config"
description: "Legt den Starttag der Woche fest"
---

# start_on_monday

### Description

@short: Legt den Starttag der Woche fest

@signature: start_on_monday: boolean

### Example

~~~jsx
scheduler.config.start_on_monday = false;  
...  
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Year view](views/year.md)

### Related samples
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

Wenn dieser Parameter auf *true* gesetzt ist, beginnt die Woche am Montag; ist er auf *false* gesetzt, startet sie am Sonntag.
