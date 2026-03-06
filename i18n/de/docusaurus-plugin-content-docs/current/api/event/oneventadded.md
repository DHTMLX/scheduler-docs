---
sidebar_label: "onEventAdded"
title: "onEventAdded event"
description: "Wird ausgelöst, wenn ein neues Event zum Scheduler hinzugefügt wird"
---

# onEventAdded

### Description

@short: Wird ausgelöst, wenn ein neues Event zum Scheduler hinzugefügt wird

@signature: onEventAdded: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - die eindeutige Kennung des Events
- `ev` - (required) *object* - das Event-Objekt selbst

### Example

~~~jsx
scheduler.attachEvent("onEventAdded", function(id,ev){
    //custom logic can be placed here
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
