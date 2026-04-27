---
sidebar_label: key_nav
title: "key_nav config"
description: "обеспечивает навигацию клавиатурой в планировщике"
---

# key_nav

### Description

@short: Включает навигацию клавиатурой в планировщике

@signature: key_nav: boolean

### Example

~~~jsx
scheduler.config.key_nav = true;
~~~

**Значение по умолчанию:** true

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
Свойство требует включения расширения [key_nav](guides/extensions-list.md#keyboard-navigation).
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