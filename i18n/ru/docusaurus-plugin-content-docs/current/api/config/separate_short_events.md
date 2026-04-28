---
sidebar_label: separate_short_events
title: "конфигурация separate_short_events"
description: "позволяет предотвращать перекрытие коротких событий"
---

# separate_short_events

### Description

@short: Позволяет предотвращать перекрытие коротких событий

@signature: separate_short_events: boolean

### Example

~~~jsx
scheduler.config.separate_short_events = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** false

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

![separateShortEvents_property](/img/separateShortEvents_property.png)