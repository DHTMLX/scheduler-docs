---
sidebar_label: drag_out
title: "drag_out config"
description: "restrict dragging events from the calling scheduler to any other scheduler(s)"
---

# drag_out

### Description

@short: Restrict dragging events from the calling scheduler to any other scheduler(s)

@signature: drag_out: boolean

### Example

~~~jsx
scheduler.config.drag_out = false;//restrict dragging events from this scheduler 
scheduler.init('scheduler_here',new Date(2027,05,30),"week");
scheduler.load("./data/units.xml");
 
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027,05,30),"week");
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
- [drag_in](api/config/drag_in.md)

### Related Guides
- [Drag-and-Drop Operations](guides/drag-between.md)
- [Creating Multiple Schedulers on a Page](guides/multiple-per-page.md)
