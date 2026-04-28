---
sidebar_label: "showQuickInfo"
title: "showQuickInfo method"
description: "주어진 이벤트에 대한 팝업 이벤트 폼을 엽니다."
---

# showQuickInfo

### Description

@short: 주어진 이벤트에 대한 팝업 이벤트 폼을 엽니다.

@signature: showQuickInfo: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 아이디

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "08-06-2027 09:00",
    end_date:   "08-06-2027 11:00",
    text:   "Meeting"
});

window.setTimeout(function(){
    scheduler.showQuickInfo(eventId);    
},1);
~~~

### Details

:::note
 이 메서드를 사용하려면 [quick_info](guides/extensions-list.md#quick-info) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- ["Mobile Responsive Scheduler"](guides/touch-support.md)
- ["전체 확장 기능 목록"](guides/extensions-list.md#quick-info)
