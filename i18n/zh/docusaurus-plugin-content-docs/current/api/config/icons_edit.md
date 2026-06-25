---
sidebar_label: "icons_edit"
title: "icons_edit config"
description: "包含一组图标，这些图标会显示在事件框内的侧边编辑菜单中"
---

# icons_edit

### Description

@short: 包含一组图标，这些图标会显示在事件框内的侧边编辑菜单中

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
- ['Select' 및 'Edit' 바 커스터마이징](guides/customizing-edit-select-bars.md)
