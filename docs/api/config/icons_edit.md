---
sidebar_label: icons_edit
title: "icons_edit config"
description: "stores a collection of icons visible in the side edit menu of the event's box"
---

# icons_edit

### Description

@short: Stores a collection of icons visible in the side edit menu of the event's box

@signature: icons_edit: any[]

### Example

~~~jsx
scheduler.config.icons_edit = ['icon_custom', 'icon_save', 'icon_cancel'];
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** ['icon_save', 'icon_cancel']

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

![iconsSelect_property](/img/iconsSelect_property.png)

### Related API
- [icons_select](api/config/icons_select.md)

### Related Guides
- [Customizing 'Select' and 'Edit' Bars](guides/customizing-edit-select-bars.md)
