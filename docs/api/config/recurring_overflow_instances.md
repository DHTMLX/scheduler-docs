---
sidebar_label: recurring_overflow_instances
title: "recurring_overflow_instances config"
description: "defines the behavior of the recurrences that transfer to the next month"
---

# recurring_overflow_instances
:::warning 
The property works only in the legacy extension for recurring events
:::
### Description

@short: Defines the behavior of the recurrences that transfer to the next month

@signature: recurring_overflow_instances: string

### Example

~~~jsx
scheduler.config.recurring_overflow_instances = "lastDay";
~~~

**Default value:** undefined

### Details

:::note
 The property requires the [recurring](guides/extensions-list.md#recurring) extension to be enabled. 
:::

Let's take an event that occurs every month on the 30th and consider its behavior in February for each option:

- **"skip"** - skips the event that happens on the date that does not exist. *The event will be skipped in February.* 
- **"lastDay"** - moves the event that happens on the date that does not exist to the last day of the month. *The event will occur on February 28th.*
- **"none"** - moves the event that happens on the date that does not exist to the first day of the next month. *The event will occur on March 1th.*

If the option is undefined, the "skip" behavior will be applied.

### Change log
- added in v5.3.11
