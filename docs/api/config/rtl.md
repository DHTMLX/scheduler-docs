---
sidebar_label: rtl
title: "rtl config"
description: "enables RTL (right-to-left) mode for the scheduler"
---

# rtl

### Description

@short: Enables RTL (right-to-left) mode for the scheduler

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
- [RTL (Right-to-left) Mode](guides/rtl-mode.md)
