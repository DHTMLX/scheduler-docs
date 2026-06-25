---
sidebar_label: event_date
title: "event_date template"
description: "specifies the time part of the start and end dates of the event. Mostly used by other templates for presenting time periods"
---

# event_date

### Description

@short: Specifies the time part of the start and end dates of the event. Mostly used by other templates for presenting time periods

@signature: event_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.event_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
    return formatFunc(date);
}
~~~

### Related Guides
- [Common Templates](guides/common-templates.md#lightbox)
