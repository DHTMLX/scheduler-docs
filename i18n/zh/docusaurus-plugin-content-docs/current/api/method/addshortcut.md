---
sidebar_label: "addShortcut"
title: "addShortcut method"
description: "创建一个新的键盘快捷键"
---

# addShortcut

### Description

@short: 创建一个新的键盘快捷键

@signature: addShortcut: (shortcut: string, handler: SchedulerCallback, scope?: string) =\> void

### Parameters

- `shortcut	` - (required) *string* - 定义快捷键的键或组合键 (快捷键语法)
- `handler` - (required) *function* - 快捷键触发时调用的函数
- `scope` - (optional) *string* - （可选）指定处理函数绑定的上下文元素 (作用域列表)

### Example

~~~jsx
scheduler.addShortcut("shift+w", function(e){ 
    var eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

版本 4.4 中新增

如果省略第三个参数，处理函数默认绑定到 scheduler 作用域。

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)
