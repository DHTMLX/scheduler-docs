---
sidebar_label: "focus"
title: "focus method"
description: "激活 scheduler 的 focus"
---

# focus

### Description

@short: 激活 scheduler 的 focus

@signature: focus: () =\> void

### Example

~~~jsx
scheduler.focus();
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
 此方法仅在启用 [key_nav](guides/extensions-list.md#keyboard-navigation) 扩展时有效。 
:::

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)

### Change log
- 版本 4.4 中新增
