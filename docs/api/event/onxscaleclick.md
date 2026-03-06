---
sidebar_label: onXScaleClick
title: "onXScaleClick event"
description: "fires when the user makes a single click on a cell on the x-axis (the Timeline view only)"
---

# onXScaleClick

### Description

@short: Fires when the user makes a single click on a cell on the x-axis (the Timeline view only)

@signature: onXScaleClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - the column index of the clicked cell (zero-based numbering)
- `value` - (required) *object* - a Date object of the start time stamp of the clicked cell
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onXScaleClick", function (index, value,e){
    //any custom logic here
});
~~~
