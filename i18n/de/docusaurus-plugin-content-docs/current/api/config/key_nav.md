---
sidebar_label: "key_nav"
title: "key_nav config"
description: "aktiviert die Tastaturnavigation im Scheduler"
---

# key_nav

### Description

@short: Aktiviert die Tastaturnavigation im Scheduler

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
 Diese Funktion erfordert, dass die [key_nav](guides/extensions-list.md#keyboard-navigation) Extension aktiviert ist. 
:::

### Related API
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md)
- [Tastaturnavigation](guides/keyboard-navigation.md)
