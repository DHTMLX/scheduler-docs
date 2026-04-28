---
sidebar_label: check_limits
title: "check_limits config"
description: "activates/disables checking of limits"
---

# check_limits

### Description

@short: Activates/disables checking of limits

@signature: check_limits: boolean

### Example

~~~jsx
scheduler.config.check_limits = false;
...
scheduler.init('scheduler_here',new Date(2027,7,6),"week");
~~~

**Default value:** true

### Details

:::note
 The property requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

The parameter is available from version 3.5.

It makes sense to disable this option when you don't set any limits and just make some highlighting or mark the current time - this will increase the performance speed. But if you have some limitation set, disabling this option will disable all the 'blocking' methods

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
