---
sidebar_label: "removeShortcut"
title: "removeShortcut method"
description: "키보드 단축키를 제거합니다"
---

# removeShortcut

### Description

@short: 키보드 단축키를 제거합니다

@signature: removeShortcut: (shortcut: string, scope?: any) =\> void

### Parameters

- `shortcut` - (required) *string* - 단축키의 키 이름 또는 키 조합 이름 ([shortcut syntax](guides/keyboard-navigation.md#shortcut-syntax))
- `scope` - (optional) *object* - (선택 사항) 단축키가 연결된 요소 ([scope 목록](guides/keyboard-navigation.md#scopes))

### Example

~~~jsx
// 단축키 추가
scheduler.addShortcut("shift+w", function(e){ 
    const eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");

// 단축키 제거
scheduler.removeShortcut("shift+w","event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

버전 4.4에서 추가됨

`scope` 파라미터를 생략하면, 단축키는 기본 "scheduler" scope에서 제거됩니다.

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- ["키보드 내비게이션"](guides/keyboard-navigation.md)
