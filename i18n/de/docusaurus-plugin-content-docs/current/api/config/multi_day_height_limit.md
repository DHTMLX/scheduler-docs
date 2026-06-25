---
sidebar_label: "multi_day_height_limit"
title: "multi_day_height_limit config"
description: "Steuert die Höhe des Bereichs, der Multi-Day-Events anzeigt"
---

# multi_day_height_limit

### Description

@short: Steuert die Höhe des Bereichs, der Multi-Day-Events anzeigt

@signature: multi_day_height_limit: number | boolean

### Example

~~~jsx
scheduler.config.multi_day_height_limit = 30;
...
scheduler.init('scheduler_here',new Date(2027,7,11),"week");
~~~

**Default value:** 200

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

Wenn diese Eigenschaft als boolean verwendet wird, akzeptiert sie nur den Wert *false*.

### Related API
- [multi_day](api/config/multi_day.md)

### Change log
- Geändert von `false` auf `200` in Version 7.0.1
