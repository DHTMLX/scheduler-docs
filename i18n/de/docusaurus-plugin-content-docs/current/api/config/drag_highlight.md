---
sidebar_label: "drag_highlight"
title: "drag_highlight config"
description: "Diese Option hebt den Startzeitpunkt und die Dauer eines Events auf der Zeitskala hervor, während es im Scheduler gezogen wird."
---

# drag_highlight

### Description

@short: Diese Option hebt den Startzeitpunkt und die Dauer eines Events auf der Zeitskala hervor, während es im Scheduler gezogen wird.

@signature: drag_highlight: boolean

### Example

~~~jsx
//deaktiviert die Hervorhebung
scheduler.config.drag_highlight = false; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![draghighlight_config](/img/draghighlight_config.png)

### Related API
- [highlightEventPosition](api/method/highlighteventposition.md)
- [drag_marker_class](api/template/drag_marker_class.md)

### Change log
- Die Hervorhebung der ursprünglichen Position eines Events während des Ziehens wurde in Version 7.1 eingeführt.
