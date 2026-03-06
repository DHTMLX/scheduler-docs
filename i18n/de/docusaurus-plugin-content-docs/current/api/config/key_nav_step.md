---
sidebar_label: "key_nav_step"
title: "key_nav_step config"
description: "Legt die minimale Schrittgröße (in Minuten) fest, die beim Navigieren durch Events verwendet wird"
---

# key_nav_step

### Description

@short: Legt die minimale Schrittgröße (in Minuten) fest, die beim Navigieren durch Events verwendet wird

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
 Diese Einstellung funktioniert nur, wenn die [key_nav](guides/extensions-list.md#keyboard-navigation) Erweiterung aktiviert ist. 
:::

### Related API
- [key_nav](api/config/key_nav.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#keyboard-navigation)
- [Tastaturnavigation](guides/keyboard-navigation.md)
