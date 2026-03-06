---
sidebar_label: "key_nav_step"
title: "key_nav_step config"
description: "устанавливает минимальный размер шага (в минутах), используемый при навигации по событиям"
---

# key_nav_step

### Description

@short: Устанавливает минимальный размер шага (в минутах), используемый при навигации по событиям

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
 Эта настройка работает только если активировано расширение [key_nav](guides/extensions-list.md#keyboard-navigation). 
:::

### Related API
- [key_nav](api/config/key_nav.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#keyboard-navigation)
- [Навигация с помощью клавиатуры](guides/keyboard-navigation.md)
