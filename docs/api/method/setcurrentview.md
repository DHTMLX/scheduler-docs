---
sidebar_label: setCurrentView
title: "setCurrentView method"
description: "displays the specified view and date"
---

# setCurrentView

### Description

@short: Displays the specified view and date

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - the date to display
- `view` - (optional) *string* -  the name of a view to display

### Example

~~~jsx
//displays the current view and date. Doesn't change anything, just refreshes 
scheduler.setCurrentView();
// displays the 4th July,2012 in the currently active view
scheduler.setCurrentView(new Date(2012,7,4));
// displays the 3rd May,2012 in the Week view
scheduler.setCurrentView(new Date(2012,5,3), "week");
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- The names for default views are 'day', 'week', 'month'. To specify any other view - use its  <b>name</b> parameter.
- The method invokes  the [onBeforeViewChange](api/event/onbeforeviewchange.md), [onViewChange](api/event/onviewchange.md).
- The method is similar to [updateView](api/method/updateview.md). The only difference between methods is that [updateView](api/method/updateview.md)  **doesn't generate any events**.

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
