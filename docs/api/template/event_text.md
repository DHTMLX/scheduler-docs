---
sidebar_label: event_text
title: "event_text template"
description: "specifies the event's text"
---

# event_text

### Description

@short: Specifies the event's text

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.event_text=function(start, end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Note that for Month and Timeline Views you need to use the [event_bar_text](api/template/event_bar_text.md) template to specify the event's text.

### Related Guides
- [Day View Templates](views/day-view-templates.md)
