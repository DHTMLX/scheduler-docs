---
sidebar_label: multi_day_height_limit
title: "multi_day_height_limit config"
description: "sets the height of the area that displays multi-day events"
---

# multi_day_height_limit

### Description

@short: Sets the height of the area that displays multi-day events

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

As a boolean value, the property can take only the *false* value.

### Related API
- [multi_day](api/config/multi_day.md)

### Change log
- changed from `false` to `200` in v7.0.1
