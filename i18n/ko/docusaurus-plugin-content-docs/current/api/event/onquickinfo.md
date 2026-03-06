---
sidebar_label: "onQuickInfo"
title: "onQuickInfo event"
description: "팝업 편집 폼이 나타날 때 트리거됩니다."
---

# onQuickInfo

### Description

@short: 팝업 편집 폼이 나타날 때 트리거됩니다.

@signature: onQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - 이벤트 ID

### Example

~~~jsx
scheduler.attachEvent("onQuickInfo",function(eventId){
    // 여기에 코드 작성
});
~~~

### Details

:::note
 이 이벤트를 사용하려면 [quick_info](guides/extensions-list.md#quick-info) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- ["전체 확장 기능 목록"](guides/extensions-list.md#quick-info)
- ["Mobile Responsive Scheduler"](guides/touch-support.md)

### Change log
- 버전 4.4에 추가됨
