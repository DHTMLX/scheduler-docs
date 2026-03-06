---
sidebar_label: collision_limit
title: "collision_limit config"
description: "sets the maximum allowable number of events per time slot"
---

# collision_limit

### Description

@short: Sets the maximum allowable number of events per time slot

@signature: collision_limit: number

### Example

~~~jsx
scheduler.config.collision_limit = 2;
...
scheduler.init('scheduler_here',new Date(2010,05,11),"week");
~~~

**Default value:** 1

### Details

:::note
 The property requires the [collision](guides/extensions-list.md#collision) plugin to be activated. 
:::

### Related Guides
- [Preventing Double Events in a Time Slot](guides/collisions.md)
