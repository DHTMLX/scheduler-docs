---
sidebar_label: week_date
title: "week_date template"
description: "specifies the date in the header of the view"
---

# week_date

### Description

@short: Specifies the date in the header of the view

@signature: week_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - the start date of the view
- `end` - (required) *Date* - the end date of the view

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.week_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Applicable views:** [Week view](views/week.md), [Week Agenda view](views/weekagenda.md)

### Related Guides
- [Week View Templates](views/week-view-templates.md)
- [WeekAgenda View Templates](views/weekagenda-view-templates.md)
