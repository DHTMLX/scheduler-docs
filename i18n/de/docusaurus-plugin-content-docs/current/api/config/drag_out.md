---
sidebar_label: "drag_out"
title: "drag_out config"
description: "Verhindert, dass Events von diesem Scheduler zu anderen gezogen werden können"
---

# drag_out

### Description

@short: Verhindert, dass Events von diesem Scheduler zu anderen gezogen werden können

@signature: drag_out: boolean

### Example

~~~jsx
scheduler.config.drag_out = false; // deaktiviert das Ziehen von Events von diesem Scheduler zu anderen
scheduler.init('scheduler_here', new Date(2027,05,30), "week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2', new Date(2027,05,30), "week");
~~~

**Default value:** true

### Details

:::note

Diese Funktion ist nur in den Lizenzen Scheduler PRO (kommerziell seit dem 6. Oktober 2021), Enterprise und Ultimate verfügbar.
 
:::

:::note
 Die Funktion erfordert, dass das [outerdrag](guides/extensions-list.md#outerdrag) Plugin aktiviert ist. 
:::

### Related API
- [drag_in](api/config/drag_in.md)

### Related Guides
- [Drag-and-Drop-Operationen](guides/drag-between.md)
- [Mehrere Scheduler auf einer Seite erstellen](guides/multiple-per-page.md)
