---
sidebar_label: "time_step"
title: "time_step config"
description: "задает минимальный шаг (в минутах) для значений времени событий"
---

# time_step

### Description

@short: Задает минимальный шаг (в минутах) для значений времени событий

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

- Время начала и окончания событий будет выравниваться по кратным значениям time_step. Например, при *time_step = 20* события могут начинаться только в 0, 20, 40 минут и так далее.
- Таймселектор в lightbox будет следовать тому же шагу времени, что также применяется к Timeline view.
