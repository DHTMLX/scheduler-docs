---
sidebar_label: resize_month_timed
title: "resize_month_timed config"
description: "enables the possibility to resize single-day events in the Month view by drag-n-drop"
---

# resize_month_timed

### Description

@short: Enables the possibility to resize single-day events in the Month view by drag-n-drop

@signature: resize_month_timed: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true; /*!*/
scheduler.config.resize_month_timed = true; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"month");
~~~

**Default value:** false

**Applicable views:** [Month view](views/month.md)

### Details

**Please, note:**

- The property makes sense only with the [resize_month_events](api/config/resize_month_events.md) property enabled.
- When the property is enabled, single-day events change their look as in:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)

### Related API
- [resize_month_events](api/config/resize_month_events.md)

### Related Guides
- [Month View](views/month.md#resizing-events-by-drag-n-drop-ver-41)
