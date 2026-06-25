---
sidebar_label: time_step
title: "Настройки time_step"
description: "устанавливает минимальный шаг (в минутах) для значений времени события"
---

# time_step

### Description

@short: Устанавливает минимальный шаг (в минутах) для значений времени события

@signature: time_step: number

### Example

~~~jsx
scheduler.config.time_step = 15;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** 5

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Month view](views/month.md), [Units view](views/units.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)

### Details

- Начальные и конечные времена события будут кратны величине шага времени, т.е. если *time_step = 20*, событие может начинаться только на: 0, 20, 40 минут и т.д.
- Селектор времени в лайтбоксе будет иметь такой же шаг времени (то же касается и Timeline view).