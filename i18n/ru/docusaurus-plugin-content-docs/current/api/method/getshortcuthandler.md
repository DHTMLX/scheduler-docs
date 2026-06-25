---
sidebar_label: getShortcutHandler
title: "getShortcutHandler метод"
description: "получает обработчик ярлыка навигации по клавиатуре"
---

# getShortcutHandler

### Description

@short: Получает обработчик сочетания клавиш для навигации по клавиатуре

@signature: getShortcutHandler: (shortcut: string, scope?: string) =\> SchedulerCallback

### Parameters

- `shortcut` - (required) *string* - имя клавиши или название сочетания клавиш для ярлыка ([shortcut syntax](guides/keyboard-navigation.md#shortcut-syntax))
- `scope` - (optional) *string* - имя элемента контекста, к которому будет привязана функция-обработчик ([список контекстов](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - обработчик вызова ярлыка

### Example

~~~jsx
const shortcut_handler = scheduler.getShortcutHandler("ctrl+a", "event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

Добавлено в версии 5.0

Если параметр `scope` не указан, будет использоваться область «scheduler» по умолчанию.

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)