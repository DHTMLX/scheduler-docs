---
sidebar_label: agenda_time
title: "agenda_time template"
description: "specifies the date in the first column of the Agenda view"
---

# agenda_time

### Description

@short: Specifies the date in the first column of the Agenda view

@signature: agenda_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
const templates = scheduler.templates;
scheduler.templates.agenda_time = function(start, end, event){
  if (scheduler.isOneDayEvent(event)) {
    return templates.day_date(event) + " " + templates.event_date(start);
  } else {
    return templates.day_date(start) + " &ndash; " + 
        templates.day_date(end);
  }
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 The template requires the [agenda_view](guides/extensions-list.md#agenda-view) plugin to be activated. 
:::

### Related Guides
- [Agenda View Templates](views/agenda-view-templates.md)
