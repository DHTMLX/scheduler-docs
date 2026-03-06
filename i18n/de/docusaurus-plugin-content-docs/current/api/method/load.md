---
sidebar_label: "load"
title: "load method"
description: "lädt Daten aus einer externen Quelle in den Scheduler"
---

# load

### Description

@short: Lädt Daten aus einer externen Quelle in den Scheduler

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - die serverseitige URL (dies kann eine statische Datei oder ein serverseitiges Skript sein, das Daten in einem der unterstützten Formate ausgibt)
- `callback` - (optional) *function* - eine Funktion, die aufgerufen wird, sobald das Laden abgeschlossen ist

### Example

~~~jsx
scheduler.load("data"); // das Datenformat wird automatisch erkannt
// oder
scheduler.load("data", function(){
    alert("Daten wurden erfolgreich geladen");
});
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

Beachten Sie, dass bei dynamischem Laden der Daten die als zweites Argument übergebene Callback-Funktion nur beim initialen Laden der Daten ausgelöst wird.
Nachfolgende Datenladevorgänge erfolgen später, aber der Callback wird nicht erneut aufgerufen.

Wenn Sie möchten, dass ein Callback bei jedem Laden von Daten in den Scheduler ausgeführt wird, sollten Sie das Event [onLoadEnd](api/event/onloadend.md) verwenden.

## Migration

Ab Version 5.2 erkennt der Scheduler das Datenformat automatisch.

In Versionen vor 5.2 akzeptierte die Methode drei Parameter:

- **url** - (*string*)  die serverseitige URL (kann eine statische Datei oder ein serverseitiges Skript sein, das XML-Daten ausgibt)
- **type** - (*string*) <i>('json', 'xml', 'ical')</i> zur Angabe des Datentyps. Standard ist <i>'xml'</i>
- **callback** - (*function*) eine Funktion, die nach dem Laden aufgerufen wird

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Beispiele für Datenformate](guides/data-formats.md)
- [Daten laden](guides/loading-data.md)

### Change log
- Der zweite **type** Parameter wurde ab Version 5.2 entfernt.
