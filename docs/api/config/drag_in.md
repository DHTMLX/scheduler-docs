---
sidebar_label: drag_in
title: "drag_in config"
description: "restrict dragging events to the calling scheduler from any other scheduler(s)"
---

# drag_in

### Description

@short: Restrict dragging events to the calling scheduler from any other scheduler(s)

@signature: drag_in: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2009,05,30),"week");
scheduler.load("./data/units.xml");
 
 
scheduler2.config.drag_in = false;//restrict dragging events to this scheduler 
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2009,05,30),"week");
~~~

**Default value:** true

### Details

:::note

This property is available for Scheduler PRO (Commercial (since October 6, 2021), Enterprise and Ultimate licenses ) only
 
:::

:::note
 The property requires the [outerdrag](guides/extensions-list.md#outerdrag) plugin to be activated. 
:::

### Related API
- [drag_out](api/config/drag_out.md)

### Related Guides
- [Drag-and-Drop Operations](guides/drag-between.md)
- [Creating Multiple Schedulers on a Page](guides/multiple-per-page.md)
