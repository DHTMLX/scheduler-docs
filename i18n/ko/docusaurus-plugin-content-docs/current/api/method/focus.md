---
sidebar_label: "focus"
title: "focus method"
description: "스케줄러에 focus를 활성화합니다."
---

# focus

### Description

@short: 스케줄러에 focus를 활성화합니다.

@signature: focus: () =\> void

### Example

~~~jsx
scheduler.focus();
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
 이 메서드는 [key_nav](guides/extensions-list.md#keyboard-navigation) 확장이 활성화된 경우에만 작동합니다. 
:::

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- ["키보드 내비게이션"](guides/keyboard-navigation.md)

### Change log
- 버전 4.4에 추가됨
