---
sidebar_label: "scroll_hour"
title: "scroll_hour config"
description: "определяет начальную вертикальную позицию прокрутки в scheduler, основанную на часе в 24-часовом формате."
---

# scroll_hour

### Description

@short: Определяет начальную вертикальную позицию прокрутки в scheduler, основанную на часе в 24-часовом формате.

@signature: scroll_hour: number

### Example

~~~jsx
// scheduler изначально покажет текущий день, прокрученный до текущего часа
scheduler.config.scroll_hour = new Date().getHours();
...
scheduler.init('scheduler_here', new Date(), "week");
~~~

**Default value:** 0 (означает, что scheduler отображает шкалу часов, начиная с полуночи - 00:00)

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)
