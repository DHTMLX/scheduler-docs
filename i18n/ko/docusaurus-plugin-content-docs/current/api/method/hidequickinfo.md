---
sidebar_label: "hideQuickInfo"
title: "hideQuickInfo method"
description: "현재 열려 있는 경우 팝업 이벤트 폼을 숨깁니다."
---

# hideQuickInfo

### Description

@short: 현재 열려 있는 경우 팝업 이벤트 폼을 숨깁니다.

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
scheduler.showQuickInfo(5);
...
scheduler.hideQuickInfo();
~~~

### Details

:::note
 이 메서드를 사용하려면 [quick_info](guides/extensions-list.md#quick-info) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- ["Mobile Responsive Scheduler"](guides/touch-support.md)
- ["전체 확장 기능 목록"](guides/extensions-list.md#quick-info)
