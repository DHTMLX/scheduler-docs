---
sidebar_label: "onMouseMove"
title: "onMouseMove event"
description: "Wird ausgelöst, wenn der Mauszeiger über den Scheduler bewegt wird"
---

# onMouseMove

### Description

@short: Wird ausgelöst, wenn der Mauszeiger über den Scheduler bewegt wird

@signature: onMouseMove: (id: string, e: Event) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events
- `e` - (required) *Event* - ein nativer Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function (id, e){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- 10_integration/02_dhtmlxTree_outer_drag.html

### Details

Wenn der Cursor über ein Event bewegt wird, erhält der Handler die ID dieses Events; andernfalls erhält er null.
