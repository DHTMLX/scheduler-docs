---
sidebar_label: "separate_short_events"
title: "separate_short_events config"
description: "Hilft, das Überlappen kurzer Events zu vermeiden"
---

# separate_short_events

### Description

@short: Hilft, das Überlappen kurzer Events zu vermeiden

@signature: separate_short_events: boolean

### Example

~~~jsx
scheduler.config.separate_short_events = true;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** false

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

![separateShortEvents_property](/img/separateShortEvents_property.png)
