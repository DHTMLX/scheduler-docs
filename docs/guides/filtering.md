---
title: "Filtering Events"
sidebar_label: "Filtering Events"
---

# Filtering Events

For any specified view, you can set a filtering function that will define which events should be displayed in the Scheduler and which shouldn't.

~~~js
scheduler.filter_week = (id, event) => {
    if (event.name === 'New event') {
        return false; // event will be filtered (not rendered)
    }

    return true; // event will be rendered
};
~~~

Here, `"week"` is the name of a view in `scheduler.filter_week`.

The `filter_(viewName)` method takes 2 parameters:

- `id` - the event's id
- `event` - the event object

Remember, you can set different filtering functions for different views:

~~~js
scheduler.filter_day = scheduler.filter_week = (id, event) => {
    // some code
};
...
scheduler.filter_timeline = (id, event) => {
    // some other code
};

~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)
