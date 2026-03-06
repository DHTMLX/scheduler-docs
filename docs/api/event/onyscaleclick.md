---
sidebar_label: onYScaleClick
title: "onYScaleClick event"
description: "fires when the user makes a single click on a cell on the y-axis (the Timeline view only)"
---

# onYScaleClick

### Description

@short: Fires when the user makes a single click on a cell on the y-axis (the Timeline view only)

@signature: onYScaleClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - the row index of the clicked cell (zero-based numbering)
- `section` - (required) *object* - a data object of the clicked cell
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onYScaleClick", function (index, section, e){
    //any custom logic here
});
~~~
