---
sidebar_label: updateView
title: "updateView method"
description: "displays the specified view and date (doesn't invoke any events)"
---

# updateView

### Description

@short: Displays the specified view and date (doesn't invoke any events)

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - the date to set
- `view` - (optional) *string* - the view name

### Example

~~~jsx
// displays the current view and date. Doesn't change anything, just refreshes
scheduler.updateView();
// displays 2027-08-04 in the currently active view
scheduler.updateView(new Date(2027, 7, 4));
// displays 2027-06-03 in the Week view
scheduler.updateView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- Being invoked without parameters, the function will just refresh the current view.
- The names for default views are 'day', 'week', 'month'. To specify any other view, use its `name` parameter.
- The method is similar to [`setCurrentView()`](api/method/setcurrentview.md). The only difference is that unlike `updateView()`, [`setCurrentView()`](api/method/setcurrentview.md) generates the [`onBeforeViewChange`](api/event/onbeforeviewchange.md) and [`onViewChange`](api/event/onviewchange.md) events.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
