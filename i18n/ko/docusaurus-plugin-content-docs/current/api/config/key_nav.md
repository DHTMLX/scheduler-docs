---
sidebar_label: "key_nav"
title: "key_nav config"
description: "스케줄러에서 키보드 내비게이션을 활성화합니다."
---

# key_nav

### Description

@short: 스케줄러에서 키보드 내비게이션을 활성화합니다.

@signature: key_nav: boolean

### Example

~~~jsx
scheduler.config.key_nav = true;
~~~

**Default value:** true

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

:::note
 이 기능을 사용하려면 [key_nav](guides/extensions-list.md#keyboard-navigation) 확장이 활성화되어 있어야 합니다. 
:::

### Related API
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- ["전체 확장 기능 목록"](guides/extensions-list.md#keyboard-navigation)
- ["키보드 내비게이션"](guides/keyboard-navigation.md)
