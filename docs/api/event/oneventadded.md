---
sidebar_label: onEventAdded
title: "onEventAdded event"
description: "fires when the user adds a new event to the scheduler"
---

# onEventAdded

### Description

@short: Fires when the user adds a new event to the scheduler

@signature: onEventAdded: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `ev` - (required) *object* - the event's object

### Example

~~~jsx
scheduler.attachEvent("onEventAdded", function(id,ev){
    //any custom logic here
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
