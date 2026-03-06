---
sidebar_label: "displayed_event_color"
title: "displayed_event_color config"
description: "definiert die Standard-Hintergrundfarbe für Events, die durch die Methode showEvent() angezeigt werden"
---

# displayed_event_color

### Description

@short: Definiert die Standard-Hintergrundfarbe für Events, die durch die Methode showEvent() angezeigt werden

@signature: displayed_event_color: string

### Example

~~~jsx
scheduler.config.displayed_event_color="#DFEDF7";
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** #ffc5ab

### Details

Diese Einstellung ist seit Version 3.5 verfügbar und wird speziell im Kontext der Methode [showEvent](api/method/showevent.md) verwendet.

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_text_color](api/config/displayed_event_text_color.md)
