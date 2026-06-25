---
sidebar_label: repeat_date
title: "repeat_date config"
description: "sets the date format of the 'End by' field in the 'recurring' lightbox"
---

# repeat_date

### Description

@short: Sets the date format of the 'End by' field in the 'recurring' lightbox

@signature: repeat_date: string

### Example

~~~jsx
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"month");
~~~

**Default value:** "%m.%d.%Y"

### Details

:::note
 The property requires the [recurring](guides/extensions-list.md#recurring) extension to be enabled. 
:::

By default, the date in the 'End by' field is exclusive.

### Related API
- [include_end_by](api/config/include_end_by.md)

### Related Guides
- [Recurring Events](guides/recurring-events.md)
