---
sidebar_label: "auto_end_date"
title: "auto_end_date config"
description: "aktualisiert automatisch das Enddatum eines Events, wenn das Startdatum angepasst wird"
---

# auto_end_date

### Description

@short: Aktualisiert automatisch das Enddatum eines Events, wenn das Startdatum angepasst wird

@signature: auto_end_date: boolean

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** false

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- Diese Einstellung ist seit Version 2.3 verfügbar.
- Sie ist dafür vorgesehen, zusammen mit der Option [event_duration](api/config/event_duration.md) verwendet zu werden.
- Wenn auf *true* gesetzt, wird beim Anpassen der Startzeit oder des Startdatums eines Events im Lightbox automatisch die Endzeit und das Enddatum aktualisiert, um die durch die Option [event_duration](api/config/event_duration.md) vorgegebene Eventdauer beizubehalten.

### Related API
- [event_duration](api/config/event_duration.md)
