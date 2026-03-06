---
sidebar_label: onQuickInfo
title: "onQuickInfo event"
description: "fires when the pop-up edit form appears"
---

# onQuickInfo

### Description

@short: Fires when the pop-up edit form appears

@signature: onQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - the event id

### Example

~~~jsx
scheduler.attachEvent("onQuickInfo",function(eventId){
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
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md)
- [Mobile Responsive Scheduler](guides/touch-support.md)

### Change log
- added in version 4.4
