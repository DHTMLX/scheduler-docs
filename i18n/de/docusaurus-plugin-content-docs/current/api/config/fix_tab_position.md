---
sidebar_label: "fix_tab_position"
title: "fix_tab_position config"
description: "Verschiebt die View-Tabs von der linken Seite auf die rechte Seite"
---

# fix_tab_position

### Description

@short: Verschiebt die View-Tabs von der linken Seite auf die rechte Seite

@signature: fix_tab_position: boolean

### Example

~~~jsx
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

Diese Option ist seit Version 3.5 verfügbar.

Standardmäßig zeigt der ['dhx_terrace'-gebrandete Scheduler](guides/skins.md#terrace-skin) die View-Tabs auf der linken Seite an. Um die Tabs auf die rechte Seite zu verschieben, setzen Sie diese Option einfach auf *false*.

### Related Guides
- [Scheduler-Markup](guides/scheduler-markup.md#tabs-positioning)
