---
sidebar_label: "rtl"
title: "rtl config"
description: "aktiviert den RTL (right-to-left) Modus für den Scheduler"
---

# rtl

### Description

@short: Aktiviert den RTL (right-to-left) Modus für den Scheduler

@signature: rtl: boolean

### Example

~~~jsx
scheduler.config.rtl = true;
...
scheduler.init('scheduler_here',new Date(2027,0,1),"week");
~~~

**Default value:** false

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/14_rtl/01_basic_init.html)

### Details

![rtl](/img/rtl.png)

### Related Guides
- [RTL (Rechts-nach-links) Modus](guides/rtl-mode.md)
