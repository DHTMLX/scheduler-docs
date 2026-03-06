---
sidebar_label: "separate_short_events"
title: "separate_short_events config"
description: "짧은 이벤트가 겹치는 것을 방지하는 데 도움을 줍니다."
---

# separate_short_events

### Description

@short: 짧은 이벤트가 겹치는 것을 방지하는 데 도움을 줍니다.

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
