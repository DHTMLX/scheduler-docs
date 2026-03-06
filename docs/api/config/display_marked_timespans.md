---
sidebar_label: display_marked_timespans
title: "display_marked_timespans config"
description: "defines whether the marked(blocked) time spans should be highlighted in the scheduler"
---

# display_marked_timespans

### Description

@short: Defines whether the marked(blocked) time spans should be highlighted in the scheduler

@signature: display_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.display_marked_timespans = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

### Details

The property is available from version 3.5.

:::note
 The property requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

If you set the option to *false*, time spans will continue to be blocked, but will be displayed as usual scheduler cells.

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
