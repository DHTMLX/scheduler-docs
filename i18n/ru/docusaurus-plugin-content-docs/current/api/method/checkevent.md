---
sidebar_label: checkEvent
title: "Метод checkEvent"
description: "проверяет, задан ли обработчик(-и) для события"
---

# checkEvent

### Description

@short: Проверяет, задан ли обработчик(-и) для события

@signature: checkEvent: (name: SchedulerEventName) =\> boolean

### Parameters

- `name` - (required) *SchedulerEventName* - имя события

### Returns
- `isExist` - (boolean) - возвращает <i>true</i>, если для события указан какой-либо обработчик

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