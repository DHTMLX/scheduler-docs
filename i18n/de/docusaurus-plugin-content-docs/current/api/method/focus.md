---
sidebar_label: "focus"
title: "focus method"
description: "aktiviert den focus im Scheduler"
---

# focus

### Description

@short: Aktiviert den focus im Scheduler

@signature: focus: () =\> void

### Example

~~~jsx
scheduler.focus();
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
 Diese Methode funktioniert nur, wenn die [key_nav](guides/extensions-list.md#keyboard-navigation) Extension aktiviert ist. 
:::

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Tastaturnavigation](guides/keyboard-navigation.md)

### Change log
- hinzugefügt in Version 4.4
