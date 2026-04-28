---
sidebar_label: "time_step"
title: "time_step config"
description: "Legt die minimale Inkrementgröße (in Minuten) für Ereigniszeitwerte fest"
---

# time_step

### Description

@short: Legt die minimale Inkrementgröße (in Minuten) für Ereigniszeitwerte fest

@signature: time_step: number

### Example

~~~jsx
scheduler.config.time_step = 15;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 5

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Month view](views/month.md), [Units view](views/units.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)

### Details

- Start- und Endzeiten von Ereignissen werden auf Vielfache des time_step ausgerichtet. Zum Beispiel können bei *time_step = 20* Ereignisse nur um 0, 20, 40 Minuten usw. beginnen.
- Der Zeit-Selector im Lightbox folgt demselben time_step, was auch für die Timeline-Ansicht gilt.
