---
sidebar_label: "parse"
title: "parse method"
description: "lädt Daten aus einer clientseitigen Ressource"
---

# parse

### Description

@short: Lädt Daten aus einer clientseitigen Ressource

@signature: parse: (data: any) =\> void

### Parameters

- `data` - (required) *object* - eine Zeichenkette oder ein Objekt, das die Daten enthält

### Example

~~~jsx
scheduler.parse([
     { start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
     { start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
~~~

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

## Migration

Ab Version 5.2 erkennt der Scheduler das Datenformat automatisch. 

In früheren Versionen (vor 5.2) akzeptierte die Methode zwei Parameter:

- **data** - (*object*)    eine Zeichenkette oder ein Objekt mit den Daten;
- **type** - (*string*)    optionale Angabe des Datentyps (<i>'json', 'xml', 'ical'</i>). Standard war <i>'xml'</i>

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- [Beispiele für Datenformate](guides/data-formats.md)

### Change log
- Der zweite Parameter **type** wurde in Version 5.2 entfernt.
