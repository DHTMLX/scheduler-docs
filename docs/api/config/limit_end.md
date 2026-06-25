---
sidebar_label: limit_end
title: "limit_end config"
description: "sets the end limit of the allowable date range"
---

# limit_end

### Description

@short: Sets the end limit of the allowable date range

@signature: limit_end: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 The property requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

The **limit_start/limit_end** configs allow limiting a range available for creating new events.
You can also limit the possibility to view events outside the allowable date range, by using the [limit_view](api/config/limit_view.md) property:

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
