---
sidebar_label: key_nav
title: "key_nav config"
description: "enables the keyboard navigation in the scheduler"
---

# key_nav

### Description

@short: Enables the keyboard navigation in the scheduler

@signature: key_nav: boolean

### Example

~~~jsx
scheduler.config.key_nav = true;
~~~

**Default value:** true

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
 The property requires the [key_nav](guides/extensions-list.md#keyboard-navigation) extension to be enabled. 
:::

### Related API
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md)
- [Keyboard Navigation](guides/keyboard-navigation.md)
