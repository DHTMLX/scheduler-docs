---
sidebar_label: "getShortcutHandler"
title: "getShortcutHandler method"
description: "키 내비게이션 shortcut에 대한 핸들러를 가져옵니다"
---

# getShortcutHandler

### Description

@short: 키 내비게이션 shortcut에 대한 핸들러를 가져옵니다

@signature: getShortcutHandler: (shortcut: string, scope?: string) =\> SchedulerCallback

### Parameters

- `shortcut` - (required) *string* - shortcut을 정의하는 키 또는 키 조합 ([shortcut syntax](guides/keyboard-navigation.md#shortcut-syntax))
- `scope` - (optional) *string* - (선택 사항) 핸들러가 부착될 컨텍스트 요소의 이름 ([scope 목록](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - shortcut 동작을 처리하는 함수

### Example

~~~jsx
const shortcut_handler = scheduler.getShortcutHandler("ctrl+a", "event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

버전 5.0에서 도입됨

`scope` 파라미터가 생략되면, 핸들러는 기본 "scheduler" scope에 부착됩니다.

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)

### Related Guides
- ["키보드 내비게이션"](guides/keyboard-navigation.md)
