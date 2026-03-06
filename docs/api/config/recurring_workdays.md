---
sidebar_label: recurring_workdays
title: "recurring_workdays config"
description: "specifies working days that will affect the recurring event when the user selects the ''Every workday' option in the lightbox"
---

# recurring_workdays

### Description

@short: Specifies working days that will affect the recurring event when the user selects the ""Every workday" option in the lightbox

@signature: recurring_workdays: any[]

### Example

~~~jsx
//sets working days from Tuesday to Friday
scheduler.config.recurring_workdays = [2, 3, 4, 5];
~~~

**Default value:** [1, 2, 3, 4, 5]

### Details

:::note
 The property requires the [recurring](guides/extensions-list.md#recurring) extension to be enabled. 
:::

![recurringworkdays_config](/img/recurringworkdays_config.png)
