---
sidebar_label: onContextMenu
title: "onContextMenu event"
description: "fires when the user calls the context menu by clicking the right mouse button inside the scheduler"
---

# onContextMenu

### Description

@short: Fires when the user calls the context menu by clicking the right mouse button inside the scheduler

@signature: onContextMenu: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onContextMenu", function (id, e){
    //any custom logic here
});
~~~

### Related samples
- [Integration with dhtmlxMenu](https://docs.dhtmlx.com/scheduler/samples/10_integration/01_dhtmlxmenu.html)

### Details

if the user clicks on an event, the handler will take the event's id, otherwise - null.
