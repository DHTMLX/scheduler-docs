---
sidebar_label: start_on_monday
title: "start_on_monday конфигурация"
description: "устанавливает день начала недели"
---

# start_on_monday

### Description

@short: Устанавливает день начала недели

@signature: start_on_monday: boolean

### Example

~~~jsx
scheduler.config.start_on_monday = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true

**Применимые представления:** [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Year view](views/year.md)

### Related samples
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

Если параметр установлен в *true*, неделя будет начинаться с понедельника (иначе — с воскресенья).