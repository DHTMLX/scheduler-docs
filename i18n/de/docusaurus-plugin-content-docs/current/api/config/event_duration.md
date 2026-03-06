---
sidebar_label: "event_duration"
title: "event_duration config"
description: "Legt die anfängliche Dauer von Events in Minuten fest"
---

# event_duration

### Description

@short: Legt die anfängliche Dauer von Events in Minuten fest

@signature: event_duration: number

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here', new Date(2013, 05, 11), "week");
~~~

**Default value:** 5

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- Dieser Parameter ist seit Version 2.3 verfügbar.
- Er funktioniert nur in Kombination mit der Option [auto_end_date](api/config/auto_end_date.md).
- Wenn die Option [auto_end_date](api/config/auto_end_date.md) aktiviert ist (auf *true* gesetzt), wird beim Anpassen der Startzeit oder des Startdatums eines Events im Lightbox automatisch die Endzeit und das Enddatum aktualisiert, um die durch die Einstellung 'event_duration' vorgegebene Dauer beizubehalten.

### Related API
- [auto_end_date](api/config/auto_end_date.md)
