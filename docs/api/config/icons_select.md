---
sidebar_label: icons_select
title: "icons_select config"
description: "stores a collection of icons visible in the side selection menu of the event's box"
---

# icons_select

### Description

@short: Stores a collection of icons visible in the side selection menu of the event's box

@signature: icons_select: any[]

### Example

~~~jsx
scheduler.config.icons_select = ['icon_details', 'icon_delete'];
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "week");
~~~

**Default value:** ['icon_details', 'icon_edit', 'icon_delete']

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

![iconsSelect_property](/img/iconsSelect_property.png)

### Related API
- [icons_edit](api/config/icons_edit.md)

### Related Guides
- [Customizing 'Select' and 'Edit' Bars](guides/customizing-edit-select-bars.md)
