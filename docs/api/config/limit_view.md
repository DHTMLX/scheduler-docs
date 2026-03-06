---
sidebar_label: limit_view
title: "limit_view config"
description: "limits the date period during which the user can view the events"
---

# limit_view

### Description

@short: Limits the date period during which the user can view the events

@signature: limit_view: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2022,5,17),"week");
...
scheduler.config.limit_view  = true;
~~~

**Default value:** false

### Details

For example, if we set a limit on the year 2023, we can't move to the year 2022 - only 2023.

If you also specify the **limit_start/limit_end** configs to limit a range available for creating new events, **limit_view** won't allow you to view events outside the allowable date range.

~~~js
scheduler.config.limit_start = new Date(2022,5,15);
scheduler.config.limit_end = new Date(2022,6,15);
scheduler.config.limit_view  = true;
~~~

According to this configuration, you will be able to create events only in the range between June 15 and July 15, and to navigate the calendar only within this range of dates.

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_end](api/config/limit_end.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
