---
sidebar_label: "removeShortcut"
title: "removeShortcut method"
description: "移除键盘快捷键"
---

# removeShortcut

### Description

@short: 移除键盘快捷键

@signature: removeShortcut: (shortcut: string, scope?: any) =\> void

### Parameters

- `shortcut` - (required) *string* - 快捷键的按键名称或组合键名称（[快捷键语法](guides/keyboard-navigation.md#shortcutsyntax)）
- `scope` - (optional) *object* - （可选）快捷键绑定的元素范围（[范围列表](guides/keyboard-navigation.md#scopes)）

### Example

~~~jsx
// 添加快捷键
scheduler.addShortcut("shift+w", function(e){ 
    var eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");

// 移除快捷键
scheduler.removeShortcut("shift+w","event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

自版本 4.4 起新增

当省略 `scope` 参数时，快捷键将从默认的 "scheduler" 范围中移除。

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)
