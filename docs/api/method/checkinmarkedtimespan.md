---
sidebar_label: checkInMarkedTimespan
title: "checkInMarkedTimespan method"
description: "checks whether an event resides in a timespan of a specific type"
---

# checkInMarkedTimespan

### Description

@short: Checks whether an event resides in a timespan of a specific type

@signature: checkInMarkedTimespan: (event: any, timespan: string) =\> boolean

### Parameters

- `event` - (required) *object* - the event object    
- `timespan` - (required) *string* - the timespan's type

### Returns
- `isIn` - (boolean) - <i>true</i>, if the event is in the timespan of the specified type

### Example

~~~jsx
scheduler.addMarkedTimespan({
    start_date: new Date(2027,4,1), 
    end_date: new Date(2027,7,1), 
    css: "red_section",
    type:"discount"
});

const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
})
...
scheduler.checkInMarkedTimespan(scheduler.getEvent(eventId), "discount"); //->true
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The method requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::
