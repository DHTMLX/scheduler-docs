---
sidebar_label: key_nav_step
title: "key_nav_step config"
description: "определяет минимальный шаг (в минутах) для навигации по событиям"
---

# key_nav_step

### Description

@short: Определяет минимальный шаг (в минутах) для навигации по событиям

@signature: key_nav_step: number

### Example

~~~jsx
scheduler.config.key_nav_step = 40;
~~~

**Значение по умолчанию:** 30

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
Свойство требует включённого расширения [key_nav](guides/extensions-list.md#keyboard-navigation) для использования.
:::

### Related API
- [key_nav](api/config/key_nav.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#keyboard-navigation)
- [Keyboard Navigation](guides/keyboard-navigation.md)