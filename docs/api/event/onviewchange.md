---
sidebar_label: onViewChange
title: "onViewChange event"
description: "fires after the current view has been changed to some other one"
---

# onViewChange

### Description

@short: Fires after the current view has been changed to some other one

@signature: onViewChange: (new_mode: string, new_date: Date) =\> void

### Parameters

- `new_mode` - (required) *string* - a new view
- `new_date` - (required) *Date* - a new date

### Example

~~~jsx
scheduler.attachEvent("onViewChange", (new_mode, new_date) => {
    // any custom logic here
});
~~~

### Details

The event is called each time the current view is changed.
