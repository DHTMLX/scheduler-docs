---
sidebar_label: quick_info_detached
title: "quick_info_detached config"
description: "defines whether the event form will appear from the left/right side of the screen or near the selected event"
---

# quick_info_detached

### Description

@short: Defines whether the event form will appear from the left/right side of the screen or near the selected event

@signature: quick_info_detached: boolean

### Example

~~~jsx
scheduler.config.quick_info_detached = false;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"day");
~~~

**Default value:** true (<i>the event form will appear  near the selected event</i>)

### Related samples
- [Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)
- [Touch-oriented scheduler. Managing the event form position](https://docs.dhtmlx.com/scheduler/samples/03_extensions/30_quick_info_detached.html)

### Details

:::note
 The property requires the [quick_info](guides/extensions-list.md#quick-info) plugin to be activated. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [Full List of Extensions](guides/extensions-list.md#quick-info)
