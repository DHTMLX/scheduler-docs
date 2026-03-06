---
sidebar_label: "quick_info_detached"
title: "quick_info_detached config"
description: "Steuert, ob das Event-Formular von der linken/rechten Seite des Bildschirms oder direkt neben dem ausgewählten Event angezeigt wird"
---

# quick_info_detached

### Description

@short: Steuert, ob das Event-Formular von der linken/rechten Seite des Bildschirms oder direkt neben dem ausgewählten Event angezeigt wird

@signature: quick_info_detached: boolean

### Example

~~~jsx
scheduler.config.quick_info_detached = false;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"day");
~~~

**Default value:** true (<i>das Event-Formular wird in der Nähe des ausgewählten Events angezeigt</i>)

### Related samples
- [Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)
- [Touch-oriented scheduler. Managing the event form position](https://docs.dhtmlx.com/scheduler/samples/03_extensions/30_quick_info_detached.html)

### Details

:::note
 Diese Eigenschaft erfordert, dass das [quick_info](guides/extensions-list.md#quick-info) Plugin aktiviert ist. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)
