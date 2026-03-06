---
sidebar_label: "key_nav_step"
title: "key_nav_step config"
description: "이벤트를 탐색할 때 사용하는 최소 단계 크기(분 단위)를 설정합니다"
---

# key_nav_step

### Description

@short: 이벤트를 탐색할 때 사용하는 최소 단계 크기(분 단위)를 설정합니다

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
 이 설정은 [key_nav](guides/extensions-list.md#keyboard-navigation) 익스텐션이 활성화된 경우에만 작동합니다. 
:::

### Related API
- [key_nav](api/config/key_nav.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- ["전체 확장 기능 목록"](guides/extensions-list.md#keyboard-navigation)
- ["키보드 내비게이션"](guides/keyboard-navigation.md)
