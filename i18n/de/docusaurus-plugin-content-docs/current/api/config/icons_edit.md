---
sidebar_label: "icons_edit"
title: "icons_edit config"
description: "Enthält eine Reihe von Icons, die im seitlichen Edit-Menü innerhalb des Event-Containers angezeigt werden."
---

# icons_edit

### Description

@short: Enthält eine Reihe von Icons, die im seitlichen Edit-Menü innerhalb des Event-Containers angezeigt werden.

@signature: icons_edit: any[]

### Example

~~~jsx
scheduler.config.icons_edit = ['icon_custom', 'icon_save', 'icon_cancel'];
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** ['icon_save', 'icon_cancel']

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

![iconsSelect_property](/img/iconsSelect_property.png)

### Related API
- [icons_select](api/config/icons_select.md)

### Related Guides
- [Anpassen der 'Select'- und 'Edit'-Leisten](guides/customizing-edit-select-bars.md)
