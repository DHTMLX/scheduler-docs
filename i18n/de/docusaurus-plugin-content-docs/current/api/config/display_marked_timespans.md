---
sidebar_label: "display_marked_timespans"
title: "display_marked_timespans config"
description: "Steuert, ob die markierten (blockierten) Zeitspannen im Scheduler hervorgehoben werden"
---

# display_marked_timespans

### Description

@short: Steuert, ob die markierten (blockierten) Zeitspannen im Scheduler hervorgehoben werden

@signature: display_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.display_marked_timespans = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

### Details

Diese Eigenschaft ist seit Version 3.5 verfügbar.

:::note
 Die Eigenschaft erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

Wenn auf *false* gesetzt, werden die Zeitspannen weiterhin blockiert, erscheinen jedoch als normale Scheduler-Zellen ohne spezielle Hervorhebung.

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
