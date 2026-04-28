---
sidebar_label: focus
title: "Метод focus"
description: "Устанавливает фокус на scheduler"
---

# focus

### Description

@short: Устанавливает фокус на scheduler

@signature: focus: () =\> void

### Example

~~~jsx
scheduler.focus();
~~~

### Related samples
- [Клавиатурная навигация и WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
 Этот метод работает только если расширение [key_nav](guides/extensions-list.md#keyboard-navigation) включено. 
:::

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Навигация клавиатурой](guides/keyboard-navigation.md)

### Change log
- добавлено в версии 4.4