---
sidebar_label: getView
title: "getView method"
description: "returns a view object by its name. If no name is specified, returns the current view"
---

# getView

### Description

@short: Returns a view object by its name. If no name is specified, returns the current view

@signature: getView: (name?: string) =\> any

### Parameters

- `name` - (optional) *string* - optional, the name of the view

### Returns
- ` view` - (object) - a view object

### Example

~~~jsx
var timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();
~~~

### Related samples
- [Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)

### Details

Returns only views that have their own object representation. Currently, these are [timeline](views/timeline.md#timeline-object-api) and [units](views/units.md) views, so the method will return *null* for any other view.

### Related Guides
- [Timeline View](views/timeline.md)
- [Units View](views/units.md)
