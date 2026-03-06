---
sidebar_label: "onBeforeQuickInfo"
title: "onBeforeQuickInfo event"
description: "이벤트에 대한 Quick Info 팝업이 표시되기 직전에 트리거됩니다."
---

# onBeforeQuickInfo

### Description

@short: 이벤트에 대한 Quick Info 팝업이 표시되기 직전에 트리거됩니다.

@signature: onBeforeParse: (id: string | number) =\> void

### Parameters
- `id` - (required) *string | number* - 이벤트의 id

### Example

~~~jsx
scheduler.attachEvent("onBeforeQuickInfo", function(id) {
   if(scheduler.getEvent(id).readonly){
       return false;
   }
   
   return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 기본 동작이 실행되지 않습니다.

### Related Guides
- ["Mobile Responsive Scheduler"](guides/touch-support.md#quick-info-extension)
