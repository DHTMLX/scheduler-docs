---
sidebar_label: "week_date"
title: "week_date template"
description: "legt das im Header der Ansicht angezeigte Datum fest"
---

# week_date

### Description

@short: Legt das im Header der Ansicht angezeigte Datum fest

@signature: week_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - das Startdatum der Ansicht
- `end` - (required) *Date* - das Enddatum der Ansicht

### Returns
- ` text` - (string) - HTML-Text, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.week_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Applicable views:** [Week view](views/week.md), [Week Agenda view](views/weekagenda.md)

### Related Guides
- [Week-View-Vorlagen](views/week-view-templates.md)
- [WeekAgenda-Ansichtsvorlagen](views/weekagenda-view-templates.md)
