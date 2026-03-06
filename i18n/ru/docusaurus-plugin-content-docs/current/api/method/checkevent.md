---
sidebar_label: "checkEvent"
title: "checkEvent method"
description: "проверяет, назначены ли обработчики для конкретного события"
---

# checkEvent

### Description

@short: Проверяет, назначены ли обработчики для конкретного события

@signature: checkEvent: (name: SchedulerEventName) =\> boolean

### Parameters

- `name` - (required) *SchedulerEventName* - имя события

### Returns
- `isExist` - (boolean) - возвращает <i>true</i>, если хотя бы один обработчик назначен на событие

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
scheduler.checkEvent("onEventSave"); //возвращает 'true'
~~~

### Related API
- [attachEvent](api/method/attachevent.md)
