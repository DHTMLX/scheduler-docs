---
sidebar_label: "week_agenda_date"
title: "week_agenda_date template"
description: "definiert das Datum, das im Header der Week Agenda Ansicht angezeigt wird"
---

# week_agenda_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert das Datum, das im Header der Week Agenda Ansicht angezeigt wird

@signature: week_agenda_date: (start: Date, end: Date) =\> void

### Parameters

- `start` - (required) *Date* - das Startdatum der Ansicht
- `end` - (required) *Date* - das Enddatum der Ansicht

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
 Diese Vorlage funktioniert nur, wenn das [week_agenda](guides/extensions-list.md#week-agenda) Plugin aktiviert ist. 
:::

### Related Guides
- [WeekAgenda-Ansichtsvorlagen](views/weekagenda-view-templates.md)

### Change log
- hinzugefügt in v6.0
