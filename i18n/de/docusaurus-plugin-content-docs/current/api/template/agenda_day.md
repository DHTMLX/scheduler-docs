---
sidebar_label: "agenda_day"
title: "agenda_day template"
description: "definiert, was innerhalb der Tageszelle der Agenda-Ansicht angezeigt wird"
---

# agenda_day

### Description

@short: Definiert, was innerhalb der Tageszelle der Agenda-Ansicht angezeigt wird

@signature: agenda_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - html-Inhalt, der im Scheduler angezeigt wird

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
- [Agenda-Ansicht](views/agenda.md)

### Change log
- hinzugefügt in v7.0
