---
sidebar_label: parse
title: "Parse-Methode"
description: "Lädt Daten aus einer clientseitigen Ressource"
---

# parse

### Description

@short: Lädt Daten aus einer clientseitigen Ressource

@signature: parse: (data: any) =\> void

### Parameters

- `data` - (erforderlich) *object* - ein String oder Objekt, das Daten darstellt

### Example

~~~jsx
scheduler.parse([
    { start_date: "2027-05-13 6:00", end_date: "2027-05-13 8:00", text: "Event 1" },
    { start_date: "2027-06-09 6:00", end_date: "2027-06-09 8:00", text: "Event 2" }
]);
~~~

### Related samples
- [Ereignisse einfärben](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Ereignisse als Kaskade anzeigen](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

## Migration

Ab Version 5.2 und später erkennt der Scheduler automatisch das Datenformat.

Vor Version 5.2 hatte die Methode zwei Parameter:

- `data` - (*object*) ein String oder Objekt, das Daten darstellt
- `type` - (*string*) optional, (*'json', 'xml', 'ical'*) der Datentyp. Der Standardwert ist *'xml'*

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- [Beispiele für Datenformate](guides/data-formats.md)

### Change log
- Der zweite `type`-Parameter der Methode wurde in v5.2 entfernt.