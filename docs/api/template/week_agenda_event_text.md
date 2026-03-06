---
sidebar_label: week_agenda_event_text
title: "week_agenda_event_text template"
description: "specifies the event's text"
---

# week_agenda_event_text
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the event's text

@signature: week_agenda_event_text: (start: Date, end: Date, event: any, cellDate: Date, pos: string) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object
- `cellDate` - (required) *Date* - the date of a day cell that a one-day event or a single occurrence of <br> the recurring event displays in
- `pos` - (required) *string* - the position of a single occurrence in the recurring event: 'start' - the first occurrence, 'end' - the last occurrence, 'middle' - for remaining occurrences

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.week_agenda_event_text = function(start,end,event,cellDate,pos){
    return scheduler.templates.event_date(start_date) + " " + event.text;
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 The template requires the [week_agenda](guides/extensions-list.md#week-agenda) plugin to be activated. 
:::

### Related Guides
- [WeekAgenda View Templates](views/weekagenda-view-templates.md)
