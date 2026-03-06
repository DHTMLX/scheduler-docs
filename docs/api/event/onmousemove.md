---
sidebar_label: onMouseMove
title: "onMouseMove event"
description: "fires when the mouse cursor is moved over the scheduler"
---

# onMouseMove

### Description

@short: Fires when the mouse cursor is moved over the scheduler

@signature: onMouseMove: (id: string, e: Event) =\> void

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function (id, e){
    //any custom logic here
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- 10_integration/02_dhtmlxTree_outer_drag.html

### Details

If the user moves the cursor over an event, the handler function takes the event's id, otherwise - null.
