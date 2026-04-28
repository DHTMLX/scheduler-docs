---
sidebar_label: "addShortcut"
title: "addShortcut method"
description: "새로운 키보드 단축키를 생성합니다"
---

# addShortcut

### Description

@short: 새로운 키보드 단축키를 생성합니다

@signature: addShortcut: (shortcut: string, handler: SchedulerCallback, scope?: string) =\> void

### Parameters

- `shortcut	` - (required) *string* - 단축키를 정의하는 키 또는 키 조합 (shortcut syntax)
- `handler` - (required) *function* - 단축키가 실행될 때 호출되는 함수
- `scope` - (optional) *string* - (선택 사항) 핸들러가 연결될 컨텍스트 요소를 지정합니다 (list of scopes)

### Example

~~~jsx
scheduler.addShortcut("shift+w", function(e){ 
    const eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

버전 4.4에 추가됨

세 번째 매개변수를 생략하면 핸들러는 기본적으로 scheduler scope에 연결됩니다.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- ["키보드 내비게이션"](guides/keyboard-navigation.md)
