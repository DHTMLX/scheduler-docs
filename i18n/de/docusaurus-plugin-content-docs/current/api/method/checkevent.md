---
sidebar_label: "checkEvent"
title: "checkEvent method"
description: "überprüft, ob Handler für ein bestimmtes Event zugewiesen sind"
---

# checkEvent

### Description

@short: Überprüft, ob Handler für ein bestimmtes Event zugewiesen sind

@signature: checkEvent: (name: SchedulerEventName) =\> boolean

### Parameters

- `name` - (required) *SchedulerEventName* - der Name des Events

### Returns
- `isExist` - (boolean) - gibt <i>true</i> zurück, wenn mindestens ein Handler für das Event zugewiesen ist

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,data){
    if (data.text.length < 20) {
        alert("Text zu kurz");
        return false;
    }
    return true;
})
...        
scheduler.checkEvent("onEventSave"); //gibt 'true' zurück
~~~

### Related API
- [attachEvent](api/method/attachevent.md)
