---
sidebar_label: "limit_time_select"
title: "limit_time_select config"
description: "Beschränkt den Time Selector im Lightbox, indem die maximalen und minimalen Werte entsprechend den Optionen 'last_hour' und 'first_hour' festgelegt werden."
---

# limit_time_select

### Description

@short: Beschränkt den Time Selector im Lightbox, indem die maximalen und minimalen Werte entsprechend den Optionen 'last_hour' und 'first_hour' festgelegt werden.

@signature: limit_time_select: boolean

### Example

~~~jsx
scheduler.config.limit_time_select = true;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** false

### Related API
- [last_hour](api/config/last_hour.md)
- [first_hour](api/config/first_hour.md)
