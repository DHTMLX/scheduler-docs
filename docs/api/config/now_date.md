---
sidebar_label: now_date
title: "now_date config"
description: "sets the date for the current-time marker in the Limit extension (enabled by the configuration - mark_now)"
---

# now_date

### Description

@short: Sets the date for the current-time marker in the Limit extension (enabled by the configuration - mark_now)

@signature: now_date: Date

### Example

~~~jsx
scheduler.config.now_date = new Date(2027, 7, 5);
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

### Details

:::note
 The property requires the [limit](guides/extensions-list.md#limit) plugin to be enabled. 
:::

The option is applicable to the [Limit extension](guides/limits.md) only.

### Related API
- [mark_now](api/config/mark_now.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
