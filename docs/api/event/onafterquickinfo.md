---
sidebar_label: onAfterQuickInfo
title: "onAfterQuickInfo event"
description: "fires after the pop-up event form is closed"
---

# onAfterQuickInfo

### Description

@short: Fires after the pop-up event form is closed

@signature: onAfterQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - the event id

### Example

~~~jsx
scheduler.attachEvent("onAfterQuickInfo", function(eventId){
    // your code here
});
~~~

### Details

:::note
 The event requires the [quick_info](guides/extensions-list.md#quick-info) plugin to be activated. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)
- [Mobile Responsive Scheduler](guides/touch-support.md)

### Change log
- added in version 4.4
