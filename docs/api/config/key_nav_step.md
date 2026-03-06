---
sidebar_label: key_nav_step
title: "key_nav_step config"
description: "defines the minimal step (in minutes) for navigating events"
---

# key_nav_step

### Description

@short: Defines the minimal step (in minutes) for navigating events

@signature: key_nav_step: number

### Example

~~~jsx
scheduler.config.key_nav_step = 40;
~~~

**Default value:** 30

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
 The property requires the [key_nav](guides/extensions-list.md#keyboard-navigation) extension to be enabled. 
:::

### Related API
- [key_nav](api/config/key_nav.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#keyboard-navigation)
- [Keyboard Navigation](guides/keyboard-navigation.md)
