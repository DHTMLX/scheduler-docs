---
sidebar_label: showQuickInfo
title: "showQuickInfo method"
description: "displays the pop-up event form for the specified event"
---

# showQuickInfo

### Description

@short: Displays the pop-up event form for the specified event

@signature: showQuickInfo: (id: string) =\> void

### Parameters

- `id` - (required) *string* - the event's id

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
 The method requires the [quick_info](guides/extensions-list.md#quick-info) plugin to be activated. 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [Full List of Extensions](guides/extensions-list.md#quick-info)
