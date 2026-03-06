---
sidebar_label: "checkEvent"
title: "checkEvent method"
description: "특정 이벤트에 핸들러가 할당되어 있는지 확인합니다"
---

# checkEvent

### Description

@short: 특정 이벤트에 핸들러가 할당되어 있는지 확인합니다

@signature: checkEvent: (name: SchedulerEventName) =\> boolean

### Parameters

- `name` - (required) *SchedulerEventName* - 이벤트의 이름

### Returns
- `isExist` - (boolean) - 이벤트에 최소 하나의 핸들러가 할당되어 있으면 <i>true</i>를 반환합니다

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,data){
    if (data.text.length < 20) {
        alert("Text too small");
        return false;
    }
    return true;
})
...        
scheduler.checkEvent("onEventSave"); // 'true'를 반환합니다
~~~

### Related API
- [attachEvent](api/method/attachevent.md)
