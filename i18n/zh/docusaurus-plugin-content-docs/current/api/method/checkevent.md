---
sidebar_label: "checkEvent"
title: "checkEvent method"
description: "验证是否有处理程序分配给特定事件"
---

# checkEvent

### Description

@short: 验证是否有处理程序分配给特定事件

@signature: checkEvent: (name: SchedulerEventName) =\> boolean

### Parameters

- `name` - (required) *SchedulerEventName* - 事件的名称

### Returns
- `isExist` - (boolean) - 如果至少有一个处理程序分配给该事件，则返回 <i>true</i>

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
scheduler.checkEvent("onEventSave"); //返回 'true'
~~~

### Related API
- [attachEvent](api/method/attachevent.md)
