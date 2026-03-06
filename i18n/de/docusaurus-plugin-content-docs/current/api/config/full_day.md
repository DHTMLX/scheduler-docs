---
sidebar_label: "full_day"
title: "full_day config"
description: "ermöglicht das Festlegen eines Events, das den gesamten Tag dauert"
---

# full_day

### Description

@short: Ermöglicht das Festlegen eines Events, das den gesamten Tag dauert

@signature: full_day: boolean

### Example

~~~jsx
scheduler.config.full_day = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** false

### Related samples
- [Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Details

Wenn diese Option aktiviert ist (*true*), werden die Felder zur Auswahl des Zeitraums im Lightbox deaktiviert, und die Event-Dauer wird automatisch so gesetzt, dass sie den gesamten Tag abdeckt - von **00:00** am ausgewählten Datum bis **00:00** am folgenden Tag.

### Change log
- added in version 2.3
