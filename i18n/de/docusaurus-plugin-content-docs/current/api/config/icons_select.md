---
sidebar_label: "icons_select"
title: "icons_select config"
description: "enthält eine Reihe von Icons, die im seitlichen Auswahlmenü der Event-Box angezeigt werden"
---

# icons_select

### Description

@short: Enthält eine Reihe von Icons, die im seitlichen Auswahlmenü der Event-Box angezeigt werden

@signature: icons_select: any[]

### Example

~~~jsx
scheduler.config.icons_select = ['icon_details', 'icon_delete'];
...
scheduler.init('scheduler_here', new Date(2027, 0, 10), "week");
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
- [Anpassen der 'Select'- und 'Edit'-Leisten](guides/customizing-edit-select-bars.md)
