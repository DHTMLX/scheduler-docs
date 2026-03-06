---
sidebar_label: "separate_short_events"
title: "separate_short_events config"
description: "帮助避免短事件重叠"
---

# separate_short_events

### Description

@short: 帮助避免短事件重叠

@signature: separate_short_events: boolean

### Example

~~~jsx
scheduler.config.separate_short_events = true;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** false

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

![separateShortEvents_property](/img/separateShortEvents_property.png)
