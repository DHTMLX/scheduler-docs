---
sidebar_label: "agenda_time"
title: "agenda_time template"
description: "definiert das Datum, das in der ersten Spalte der Agenda-Ansicht angezeigt wird"
---

# agenda_time

### Description

@short: Definiert das Datum, das in der ersten Spalte der Agenda-Ansicht angezeigt wird

@signature: agenda_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - der Startzeitpunkt des Events
- `end` - (required) *Date* - der Endzeitpunkt des Events
- `event` - (required) *object* - die Event-Daten

### Returns
- ` text` - (string) - HTML-Inhalt, der zur Anzeige im Scheduler verwendet wird

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
 Diese Vorlage funktioniert nur, wenn das [agenda_view](guides/extensions-list.md#agenda-view) Plugin aktiviert ist. 
:::

### Related Guides
- [Agenda-Ansicht-Vorlagen](views/agenda-view-templates.md)
