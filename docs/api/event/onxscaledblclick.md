---
sidebar_label: onXScaleDblClick
title: "onXScaleDblClick event"
description: "fires when the user makes a double click on a cell on the x-axis (the Timeline view only)"
---

# onXScaleDblClick

### Description

@short: Fires when the user makes a double click on a cell on the x-axis (the Timeline view only)

@signature: onXScaleDblClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - the column index of the clicked cell (zero-based numbering)
- `value` - (required) *object* - a Date object of the start time stamp of the clicked cell
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onXScaleDblClick", function (index, value, e){
    //any custom logic here
});
~~~
