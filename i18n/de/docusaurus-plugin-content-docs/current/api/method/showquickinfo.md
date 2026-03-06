---
sidebar_label: "showQuickInfo"
title: "showQuickInfo method"
description: "Öffnet das Pop-up-Event-Formular für ein bestimmtes Event"
---

# showQuickInfo

### Description

@short: Öffnet das Pop-up-Event-Formular für ein bestimmtes Event

@signature: showQuickInfo: (id: string) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});

window.setTimeout(function(){
    scheduler.showQuickInfo(eventId);    
},1);
~~~

### Details

:::note
 Diese Methode erfordert, dass das [quick_info](guides/extensions-list.md#quick-info) Plugin aktiviert ist. 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)
