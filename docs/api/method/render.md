---
sidebar_label: render
title: "render method"
description: "repaints the scheduler"
---

# render

### Description

@short: Repaints the scheduler

@signature: render: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - the date to display
- `view` - (optional) *string* - the name of a view to display

### Example

~~~jsx
// render to apply the config
scheduler.config.hour_size_px = 88;
scheduler.render();


// switch to another date
scheduler.render(new Date(2027,7,4));

// switch to another view
scheduler.render(null, "week");
~~~

### Details

This method is an alias of [scheduler.setCurrentView](api/method/setcurrentview.md) and works identically to it.

- The names for default views are 'day', 'week', 'month'. To specify any other view - use its  <b>name</b> parameter.
- The method invokes  the [onBeforeViewChange](api/event/onbeforeviewchange.md), [onViewChange](api/event/onviewchange.md).
- The method is similar to [updateView](api/method/updateview.md). The only difference between methods is that [updateView](api/method/updateview.md)  **doesn't generate any events**.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
