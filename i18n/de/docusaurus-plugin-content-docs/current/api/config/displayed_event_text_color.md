---
sidebar_label: "displayed_event_text_color"
title: "displayed_event_text_color config"
description: "definiert die Standard-Schriftfarbe für Events, die durch die Methode showEvent() angezeigt werden"
---

# displayed_event_text_color

### Description

@short: Definiert die Standard-Schriftfarbe für Events, die durch die Methode showEvent() angezeigt werden

@signature: displayed_event_text_color: string

### Example

~~~jsx
scheduler.config.displayed_event_text_color="#195D8A";
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** #7e2727

### Details

Dieser Parameter ist seit Version 3.5 verfügbar und wird speziell mit der Methode [showEvent](api/method/showevent.md) verwendet.

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_color](api/config/displayed_event_color.md)
