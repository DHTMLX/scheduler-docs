---
sidebar_label: event_header
title: "event_header template"
description: "specifies the event's header"
---

# event_header

### Description

@short: Specifies the event's header

@signature: event_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event's object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Day View Templates](views/day-view-templates.md)
- [Week View Templates](views/week-view-templates.md)
