---
sidebar_label: limit_time_select
title: "limit_time_select config"
description: "sets max and min values of time selector in the lightbox to the values of the 'last_hour' and 'first_hour' options"
---

# limit_time_select

### Description

@short: Sets max and min values of time selector in the lightbox to the values of the 'last_hour' and 'first_hour' options

@signature: limit_time_select: boolean

### Example

~~~jsx
scheduler.config.limit_time_select = true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** false

### Related API
- [last_hour](api/config/last_hour.md)
- [first_hour](api/config/first_hour.md)
