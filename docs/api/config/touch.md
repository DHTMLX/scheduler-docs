---
sidebar_label: touch
title: "touch config"
description: "enables/disables the touch support in the scheduler"
---

# touch

### Description

@short: Enables/disables the touch support in the scheduler

@signature: touch: boolean | string

### Example

~~~jsx
scheduler.config.touch = "force";
...
scheduler.init('scheduler_here',new Date(2013,3,10),"week");
~~~

**Default value:** true

### Related samples
- [Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

### Details

As a string, the parameter can take the only value - **'force'**.

<br>

So, there are 3 possible values that the parameter can take:

- *true* - the scheduler tries to detect the touch device by analyzing the user-agent string of the browser and, if a  touch device is detected, enables the touch support.
- *'force'* - enables the persistent touch support, no matter what kind of device is used.
- *false* - disables the touch support.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
