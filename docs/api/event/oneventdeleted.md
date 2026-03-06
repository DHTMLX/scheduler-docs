---
sidebar_label: onEventDeleted
title: "onEventDeleted event"
description: "fires after the specified event was deleted (version 3.0+)"
---

# onEventDeleted

### Description

@short: Fires after the specified event was deleted (version 3.0+)

@signature: onEventDeleted: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `ev` - (required) *object* - the event's object

### Example

~~~jsx
scheduler.attachEvent("onEventDeleted", function(id,ev){
    // custom code
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

The event will fire regardless of whether the DataProcessor library is used or not.
