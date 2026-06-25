---
sidebar_label: rtl
title: "Конфигурация RTL"
description: "включает режим RTL (справа налево) для планировщика"
---

# rtl

### Description

@short: Включает режим RTL (справа налево) для планировщика

@signature: rtl: boolean

### Example

~~~jsx
scheduler.config.rtl = true;
...
scheduler.init('scheduler_here',new Date(2027,0,1),"week");
~~~

**Значение по умолчанию:** false

### Related samples
- [Базовая инициализация](https://docs.dhtmlx.com/scheduler/samples/14_rtl/01_basic_init.html)

### Details

![rtl](/img/rtl.png)

### Related Guides
- [RTL (Right-to-left) режим](guides/rtl-mode.md)