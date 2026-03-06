---
sidebar_label: "drag_in"
title: "drag_in config"
description: "Beschränkt Dragging-Events so, dass sie nur innerhalb des Schedulers verschoben werden können, der den Drag gestartet hat, und verhindert somit Transfers zwischen verschiedenen Schedulern."
---

# drag_in

### Description

@short: Beschränkt Dragging-Events so, dass sie nur innerhalb des Schedulers verschoben werden können, der den Drag gestartet hat, und verhindert somit Transfers zwischen verschiedenen Schedulern.

@signature: drag_in: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2009,05,30),"week");
scheduler.load("./data/units.xml");
 
scheduler2.config.drag_in = false; // deaktiviert das Draggen von Events in diesen Scheduler
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2009,05,30),"week");
~~~

**Default value:** true

### Details

:::note

Diese Funktion ist ausschließlich für Scheduler PRO (kommerziell seit dem 6. Oktober 2021), Enterprise und Ultimate Lizenzen verfügbar.
 
:::

:::note
 Das [outerdrag](guides/extensions-list.md#outerdrag) Plugin muss aktiviert sein, damit diese Eigenschaft funktioniert. 
:::

### Related API
- [drag_out](api/config/drag_out.md)

### Related Guides
- [Drag-and-Drop-Operationen](guides/drag-between.md)
- [Mehrere Scheduler auf einer Seite erstellen](guides/multiple-per-page.md)
