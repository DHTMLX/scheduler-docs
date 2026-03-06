---
sidebar_label: event_bar_date
title: "event_bar_date template"
description: "specifies the date of an event. Applied to one-day events only"
---

# event_bar_date

### Description

@short: Specifies the date of an event. Applied to one-day events only

@signature: event_bar_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin  
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.event_bar_date = function(start,end,ev){
     return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
