---
sidebar_label: onEventChanged
title: "onEventChanged event"
description: "occurs after the user has edited an event and saved the changes (after clicking on the edit and save buttons in the event's bar or in the details window)"
---

# onEventChanged

### Description

@short: Occurs after the user has edited an event and saved the changes (after clicking on the edit and save buttons in the event's bar or in the details window)

@signature: onEventChanged: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `ev` - (required) *object* - the event's object

### Example

~~~jsx
scheduler.attachEvent("onEventChanged", function(id,ev){
    //any custom logic here
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
