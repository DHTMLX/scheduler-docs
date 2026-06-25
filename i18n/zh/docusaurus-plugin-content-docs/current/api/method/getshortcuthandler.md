---
sidebar_label: "getShortcutHandler"
title: "getShortcutHandler method"
description: "获取一个键盘导航快捷键的处理函数"
---

# getShortcutHandler

### Description

@short: 获取一个键盘导航快捷键的处理函数

@signature: getShortcutHandler: (shortcut: string, scope?: string) =\> SchedulerCallback

### Parameters

- `shortcut` - (required) *string* - 定义快捷键的按键或按键组合 ([快捷键语法](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (optional) *string* - （可选）处理函数将附加的上下文元素名称 ([作用域列表](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - 处理该快捷键动作的函数

### Example

~~~jsx
const shortcut_handler = scheduler.getShortcutHandler("ctrl+a", "event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

自版本 5.0 引入

当省略 `scope` 参数时，处理函数将附加在默认的 "scheduler" 作用域上。

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)
