---
sidebar_label: lightbox_header
title: "lightbox_header template"
description: "specifies the lightbox's header"
---

# lightbox_header

### Description

@short: Specifies the lightbox's header

@signature: lightbox_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.lightbox_header = function(start,end,ev){
    return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
    + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
};
~~~

### Details

Note, if the [lightbox_header](api/template/lightbox_header.md) template isn't specified, the date part of the header will be set according to the [event_header](api/template/event_header.md) template.

### Related Guides
- [Common Templates](guides/common-templates.md#lightbox)
