---
sidebar_label: event_bar_text
title: "event_bar_text template"
description: "specifies the event's text. Applied to multi-day events only"
---

# event_bar_text

### Description

@short: Specifies the event's text. Applied to multi-day events only

@signature: event_bar_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event's object

### Returns
- `text` - (string) - HTML text for rendering in the Scheduler

### Example

~~~jsx
scheduler.templates.event_bar_text = (start, end, event) => {
    return event.text;
};
~~~

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
- [Timeline View Templates](views/timeline-view-templates.md)
