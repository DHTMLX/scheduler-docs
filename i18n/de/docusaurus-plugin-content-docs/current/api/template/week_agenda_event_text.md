---
sidebar_label: "week_agenda_event_text"
title: "week_agenda_event_text template"
description: "definiert den Text, der für ein Event angezeigt wird"
---

# week_agenda_event_text
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert den Text, der für ein Event angezeigt wird

@signature: week_agenda_event_text: (start: Date, end: Date, event: any, cellDate: Date, pos: string) =\> string

### Parameters

- `start` - (required) *Date* - das Datum, an dem das Event beginnt
- `end` - (required) *Date* - das Datum, an dem das Event endet
- `event` - (required) *object* - das Event-Datenobjekt
- `cellDate` - (required) *Date* - das Datum der Tageszelle, in der ein eintägiges Event oder eine einzelne Instanz eines wiederkehrenden Events erscheint
- `pos` - (required) *string* - die Position dieses Vorkommens in einem wiederkehrenden Event: 'start' für das erste, 'end' für das letzte, 'middle' für alle anderen

### Returns
- ` text` - (string) - HTML-Inhalt, der verwendet wird, um das Event im Scheduler darzustellen

### Example

~~~jsx
scheduler.templates.week_agenda_event_text = function(start,end,event,cellDate,pos){
    return scheduler.templates.event_date(start_date) + " " + event.text;
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 Dieses Template funktioniert nur, wenn das [week_agenda](guides/extensions-list.md#week-agenda) Plugin aktiviert ist. 
:::

### Related Guides
- [WeekAgenda-Ansichtsvorlagen](views/weekagenda-view-templates.md)
