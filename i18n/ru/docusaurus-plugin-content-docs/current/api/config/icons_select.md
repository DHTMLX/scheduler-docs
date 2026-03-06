---
sidebar_label: "icons_select"
title: "icons_select config"
description: "содержит набор иконок, которые отображаются в боковом меню выбора в блоке события"
---

# icons_select

### Description

@short: Содержит набор иконок, которые отображаются в боковом меню выбора в блоке события

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
- [Кастомизация панелей 'Select' и 'Edit'](guides/customizing-edit-select-bars.md)
