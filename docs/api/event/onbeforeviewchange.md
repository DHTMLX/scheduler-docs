---
sidebar_label: onBeforeViewChange
title: "onBeforeViewChange event"
description: "fires before the user changes the current view to some other one"
---

# onBeforeViewChange

### Description

@short: Fires before the user changes the current view to some other one

@signature: onBeforeViewChange: (old_mode: string, old_date: Date, mode: string, date: Date) =\> boolean

### Parameters

- `old_mode` - (required) *string* - the currently active view
- `old_date` - (required) *Date* - the currently active date
- `mode` - (required) *string* - the new view
- `date` - (required) *Date* - the new date

### Returns
- `result` - (boolean) - defines whether the default action of the event will be triggered (`true`) or canceled (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", (old_mode, old_date, mode, date) => {
    // any custom logic here
    return true;
});
~~~

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- The event is blockable. Return `false`, and the Scheduler will leave the current view open.
- The event also fires when the Scheduler is initially rendered on the page. In this case, the `old_mode` and `old_date` parameters are undefined.
