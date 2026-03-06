---
sidebar_label: onEmptyClick
title: "onEmptyClick event"
description: "fires when the user clicks on an empty space in the scheduler (not on events)"
---

# onEmptyClick

### Description

@short: Fires when the user clicks on an empty space in the scheduler (not on events)

@signature: onEmptyClick: (date: object, e: Event) =\> void;

### Parameters

- `date` - (required) *object* - a date which corresponds to the point that the user clicks on
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onEmptyClick", function (date, e){
       //any custom logic here
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
