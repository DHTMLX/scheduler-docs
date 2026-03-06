---
sidebar_label: batchUpdate
title: "batchUpdate method"
description: "updates multiple events at once"
---

# batchUpdate

### Description

@short: Updates multiple events at once

@signature: batchUpdate: (callback: SchedulerCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - the callback function
- `noRedraw` - (optional) *boolean* - optional, specifies if Scheduler should repaint the chart after the callback function; <i>true</i> - not to repaint and <i>false</i> (by default) - to repaint

### Example

~~~jsx
scheduler.batchUpdate(function(){
    const events = scheduler.getEvents();
    for(var i = 0; i < events.length; i++){
        const event = events[i];
        event.start_date = scheduler.date.add(event.start_date, 1, "day");
        event.end_date = scheduler.date.add(event.end_date, 1, "day");
        scheduler.updateEvent(event.id);
    }
});
~~~

### Details

You can use this method to update multiple events at once with a single re-rendering instead of making multiple updates with multiple re-renderings.

### Related API
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)
