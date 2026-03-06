---
sidebar_label: agenda_day
title: "agenda_day template"
description: "specifies the content of the day cell of the Agenda view"
---

# agenda_day

### Description

@short: Specifies the content of the day cell of the Agenda view

@signature: agenda_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
const dayDateToStr = scheduler.date.date_to_str("%F %j");
const dayDowToStr = scheduler.date.date_to_str("%l");

scheduler.templates.agenda_day = function(date){ 
    return `<div class="dhx_agenda_day_date">${dayDateToStr(date)}</div>
    <div class="dhx_agenda_day_dow">${dayDowToStr(date)}</div>`;
};
~~~

### Related Guides
- [Agenda View](views/agenda.md)

### Change log
- added in v7.0
