---
sidebar_label: "getShortcutHandler"
title: "getShortcutHandler method"
description: "получает обработчик для сочетания клавиш навигации"
---

# getShortcutHandler

### Description

@short: Получает обработчик для сочетания клавиш навигации

@signature: getShortcutHandler: (shortcut: string, scope?: string) =\> SchedulerCallback

### Parameters

- `shortcut` - (required) *string* - клавиша или комбинация клавиш, определяющая shortcut ([синтаксис shortcut](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (optional) *string* - (необязательно) имя контекстного элемента, к которому будет прикреплен обработчик ([список scope](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - функция, которая обрабатывает действие shortcut

### Example

~~~jsx
var shortcut_handler = scheduler.getShortcutHandler("ctrl+a", "event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

Введено в версии 5.0

Если параметр `scope` опущен, обработчик прикрепляется к scope по умолчанию - "scheduler".

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)

### Related Guides
- [Навигация с помощью клавиатуры](guides/keyboard-navigation.md)
