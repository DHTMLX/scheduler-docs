---
sidebar_label: week_agenda_date
title: "week_agenda_date template"
description: "specifies the date in the header of the Week Agenda view"
---

# week_agenda_date
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the date in the header of the Week Agenda view

@signature: week_agenda_date: (start: Date, end: Date) =\> void

### Parameters

- `start` - (required) *Date* - the start date of the view
- `end` - (required) *Date* - the end date of the view

### Example

~~~jsx
scheduler.templates.week_agenda_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 The template requires the [week_agenda](guides/extensions-list.md#week-agenda) plugin to be activated. 
:::

### Related Guides
- [WeekAgenda View Templates](views/weekagenda-view-templates.md)

### Change log
- added in v6.0
