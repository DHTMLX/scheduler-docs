---
sidebar_label: "rtl"
title: "rtl config"
description: "为调度器开启 RTL（从右到左）模式"
---

# rtl

### Description

@short: 为调度器开启 RTL（从右到左）模式

@signature: rtl: boolean

### Example

~~~jsx
scheduler.config.rtl = true;
...
scheduler.init('scheduler_here', new Date(2027,0,1), "week");
~~~

**Default value:** false

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/14_rtl/01_basic_init.html)

### Details

![rtl](/img/rtl.png)

### Related Guides
- [RTL (오른쪽-왼쪽) 모드](guides/rtl-mode.md)
