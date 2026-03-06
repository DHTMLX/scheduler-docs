---
sidebar_label: onBeforeQuickInfo
title: "onBeforeQuickInfo event"
description: "fires immediately before the Quick Info popup is displayed for an event"
---

# onBeforeQuickInfo

### Description

@short: Fires immediately before the Quick Info popup is displayed for an event

@signature: onBeforeParse: (id: string | number) =\> void

### Parameters
- `id` - (required) *number | string* - the event's id

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

The event is blockable. Return false to cancel the default processing.

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md#quick-info-extension)
