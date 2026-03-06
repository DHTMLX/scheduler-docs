---
sidebar_label: mark_now
title: "mark_now config"
description: "enables/disables the marker displaying the current time"
---

# mark_now

### Description

@short: Enables/disables the marker displaying the current time

@signature: mark_now: boolean

### Example

~~~jsx
scheduler.config.mark_now = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Timeline view](views/timeline.md)

### Related samples
- [Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)

### Details

:::note
 The property requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

:::note
  Note that in case of the Timeline view the [limit](guides/extensions-list.md#limit) extension should be included on a page before the [Timeline](guides/extensions-list.md#timeline) extension. 
:::

![weekView_properties](/img/weekView_properties.png)

### Related API
- [now_date](api/config/now_date.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
