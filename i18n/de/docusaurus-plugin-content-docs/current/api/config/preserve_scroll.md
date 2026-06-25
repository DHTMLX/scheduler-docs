---
sidebar_label: "preserve_scroll"
title: "preserve_scroll config"
description: "verhindert das Beibehalten der aktuellen Scroll-Position beim Wechseln zwischen Daten in derselben Ansicht"
---

# preserve_scroll

### Description

@short: Verhindert das Beibehalten der aktuellen Scroll-Position beim Wechseln zwischen Daten in derselben Ansicht

@signature: preserve_scroll: boolean

### Example

~~~jsx
scheduler.config.preserve_scroll = false;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

- Diese Option ist seit Version 3.0 verfügbar.
- Sie gilt, wenn der Benutzer innerhalb der Ansicht das Datum ändert <br> über das Navigationspanel -> ![navigation_panel](/img/navigation_panel.png).
