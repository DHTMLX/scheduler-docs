---
sidebar_label: "checkInMarkedTimespan"
title: "checkInMarkedTimespan method"
description: "bestimmt, ob ein Ereignis innerhalb eines Zeitraums eines bestimmten Typs liegt"
---

# checkInMarkedTimespan

### Description

@short: Bestimmt, ob ein Ereignis innerhalb eines Zeitraums eines bestimmten Typs liegt

@signature: checkInMarkedTimespan: (event: any, timespan: string) =\> boolean

### Parameters

- `event` - (required) *object* - das Ereignis-Objekt    
- `timespan` - (required) *string* - der Typ des Zeitraums

### Returns
- `isIn` - (boolean) - <i>true</i>, wenn das Ereignis innerhalb des angegebenen Zeitraums-Typs auftritt

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
 Die Methode erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::
