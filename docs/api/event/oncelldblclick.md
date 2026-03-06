---
sidebar_label: onCellDblClick
title: "onCellDblClick event"
description: "fires when the user makes a double click on a cell (the Timeline view only)"
---

# onCellDblClick

### Description

@short: Fires when the user makes a double click on a cell (the Timeline view only)

@signature: onCellDblClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - the column index of the clicked cell (zero-based numbering)
- `y_ind` - (required) *number* - the row index of the clicked cell (zero-based numbering)
- `x_val` - (required) *object* - a Date object of the start time stamp of the clicked cell
- `y_val` - (required) *array* - an array of data items' objects resided in the clicked cell
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onCellDblClick", function (x_ind, y_ind, x_val, y_val, e){
    //any custom logic here
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note

The event fires in the Timeline view only
 
:::
