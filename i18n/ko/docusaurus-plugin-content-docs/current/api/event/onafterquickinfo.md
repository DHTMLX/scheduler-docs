---
sidebar_label: "onAfterQuickInfo"
title: "onAfterQuickInfo event"
description: "팝업 이벤트 폼이 닫힌 직후에 트리거됩니다."
---

# onAfterQuickInfo

### Description

@short: 팝업 이벤트 폼이 닫힌 직후에 트리거됩니다.

@signature: onAfterQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - 이벤트 ID

### Example

~~~jsx
scheduler.attachEvent("onAfterQuickInfo", function(eventId){  
    // 여기에 코드 작성  
});
~~~

### Details

:::note
 이 이벤트는 [quick_info](guides/extensions-list.md#quick-info) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)

### Related Guides
- ["전체 확장 기능 목록"](guides/extensions-list.md#quick-info)
- ["Mobile Responsive Scheduler"](guides/touch-support.md)

### Change log
- 버전 4.4에 추가됨
