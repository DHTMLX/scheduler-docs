---
sidebar_label: "scroll_hour"
title: "scroll_hour config"
description: "Definiert die anfängliche vertikale Scroll-Position im Scheduler basierend auf der Stunde im 24-Stunden-Format."
---

# scroll_hour

### Description

@short: Definiert die anfängliche vertikale Scroll-Position im Scheduler basierend auf der Stunde im 24-Stunden-Format.

@signature: scroll_hour: number

### Example

~~~jsx
//der Scheduler zeigt anfangs den aktuellen Tag, gescrollt zur aktuellen Stunde
scheduler.config.scroll_hour = new Date().getHours();
...
scheduler.init('scheduler_here', new Date(), "week");
~~~

**Default value:** 0 (bedeutet, dass der Scheduler die Stunden-Skala ab Mitternacht - 00:00 - anzeigt)

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)
