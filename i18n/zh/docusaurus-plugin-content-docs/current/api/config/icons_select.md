---
sidebar_label: "icons_select"
title: "icons_select config"
description: "保持一组图标，这些图标会显示在事件框的侧边选择菜单中"
---

# icons_select

### Description

@short: 保持一组图标，这些图标会显示在事件框的侧边选择菜单中

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
- ['Select' 및 'Edit' 바 커스터마이징](guides/customizing-edit-select-bars.md)
