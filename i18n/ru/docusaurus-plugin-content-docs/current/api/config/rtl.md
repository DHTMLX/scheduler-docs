---
sidebar_label: "rtl"
title: "rtl config"
description: "включает режим RTL (right-to-left) для scheduler"
---

# rtl

### Description

@short: Включает режим RTL (right-to-left) для scheduler

@signature: rtl: boolean

### Example

~~~jsx
scheduler.config.rtl = true;
...
scheduler.init('scheduler_here',new Date(2018,0,1),"week");
~~~

**Default value:** false

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/14_rtl/01_basic_init.html)

### Details

![rtl](/img/rtl.png)

### Related Guides
- [RTL (Справа налево) режим](guides/rtl-mode.md)
