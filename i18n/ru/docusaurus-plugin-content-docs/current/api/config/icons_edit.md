---
sidebar_label: "icons_edit"
title: "icons_edit config"
description: "содержит набор иконок, которые отображаются в боковом меню редактирования внутри блока события"
---

# icons_edit

### Description

@short: Содержит набор иконок, которые отображаются в боковом меню редактирования внутри блока события

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
- [Кастомизация панелей 'Select' и 'Edit'](guides/customizing-edit-select-bars.md)
