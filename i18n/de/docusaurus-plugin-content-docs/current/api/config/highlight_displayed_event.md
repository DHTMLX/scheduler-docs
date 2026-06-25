---
sidebar_label: "highlight_displayed_event"
title: "highlight_displayed_event config"
description: "Bestimmt, ob Events, die durch die Methode showEvent abgerufen werden, beim Anzeigen hervorgehoben werden"
---

# highlight_displayed_event

### Description

@short: Bestimmt, ob Events, die durch die Methode showEvent abgerufen werden, beim Anzeigen hervorgehoben werden

@signature: highlight_displayed_event: boolean

### Example

~~~jsx
scheduler.config.highlight_displayed_event=false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** true

### Details

Diese Option ist seit Version 3.5 verfügbar und gilt ausschließlich für die Methode [showEvent](api/method/showevent.md).

### Related API
- [showEvent](api/method/showevent.md)
