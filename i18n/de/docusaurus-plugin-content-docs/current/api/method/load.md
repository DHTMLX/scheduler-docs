---
sidebar_label: load
title: "load method"
description: "loads data to the scheduler from an external data source"
---

# load

### Description

@short: Lädt Daten in den Scheduler aus einer externen Datenquelle

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - die server-seitige URL (kann eine statische Datei oder ein serverseitiges Skript sein, das Daten in einem der unterstützten Formate ausgibt)
- `callback` - (optional) *function* - die Callback-Funktion

### Example

~~~jsx
scheduler.load("data"); // das Format der geladenen Daten wird automatisch erkannt
// oder
scheduler.load("data", () => {
    alert("Daten wurden erfolgreich geladen");
});
~~~

### Related samples
- [Grundlegende Initialisierung](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Daten aus einer Datenbank laden](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

Achte darauf, dass im Fall des dynamischen Ladens die als zweiter Parameter übergebene Callback-Funktion nur während des anfänglichen Ladens der Daten aufgerufen wird.
Während die nächsten Datenabschnitte später geladen werden, wird die Callback-Funktion nicht mehr aufgerufen.

Falls Sie die Callback-Funktion bei jedem Ladevorgang von Daten in Scheduler aufrufen müssen, können Sie das [`onLoadEnd`](api/event/onloadend.md) Ereignis verwenden.

## Migration

In Version 5.2 und später erkennt Scheduler automatisch das Datenformat.

Vor Version 5.2 enthielt die Methode jedoch drei Parameter:

- `url` - (*string*) die server-seitige URL (kann eine statische Datei oder ein serverseitiges Skript sein, das Daten als XML ausgibt)
- `type` - (*string*) (*'json', 'xml', 'ical'*) der Datentyp. Der Standardwert ist *'xml'*
- `callback` - (*function*) die Callback-Funktion

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Beispiele für Datenformate](guides/data-formats.md)
- [Daten laden](guides/loading-data.md)

### Change log
- Der zweite `type` Parameter der Methode wurde in v5.2 entfernt.