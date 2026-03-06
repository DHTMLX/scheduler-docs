---
sidebar_label: overwrite_marked_timespans
title: "overwrite_marked_timespans config"
description: "enables blocking priority for marked timespans"
---

# overwrite_marked_timespans

### Description

@short: Enables blocking priority for marked timespans

@signature: overwrite_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.overwrite_marked_timespans = false;
~~~

**Default value:** true

### Details

Marked timespans have different priority, depending on their settings.
When several marked timespans of different priority are located inside the same section of the scheduler,
only markers of the highest priority will be displayed by default.

Disable this setting in order to change this behavior and display all the defined markers:

~~~js
scheduler.config.overwrite_marked_timespans = false;
~~~

### Related Guides
- [Blocking and Marking Dates](guides/limits.md#blocking-priority)

### Change log
- added in v6.0
