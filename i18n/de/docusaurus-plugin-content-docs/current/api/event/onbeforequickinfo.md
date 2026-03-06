---
sidebar_label: "onBeforeQuickInfo"
title: "onBeforeQuickInfo event"
description: "wird unmittelbar ausgelöst, bevor das Quick Info Popup für ein Event angezeigt wird"
---

# onBeforeQuickInfo

### Description

@short: Wird unmittelbar ausgelöst, bevor das Quick Info Popup für ein Event angezeigt wird

@signature: onBeforeParse: (id: string | number) =\> void

### Parameters
- `id` - (required) *string | number* -  die ID des Events

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

Dieses Event kann blockiert werden. Wenn false zurückgegeben wird, wird das Standardverhalten verhindert.

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md#quick-info-extension)
