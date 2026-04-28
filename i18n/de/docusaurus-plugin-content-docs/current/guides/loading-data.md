---
title: "Daten laden"
sidebar_label: "Daten laden"
---

# Daten laden

dhtmlxScheduler kann Daten in mehreren Formaten laden. Die meisten Anwendungen verwenden **JSON**. **iCalendar (.ics)** und **XML** werden ebenfalls zur Kompatibilität oder für Import-Szenarien unterstützt.

### Verwandte Anleitungen

- [Überblick über Datenformate](guides/data-formats.md)


## Daten aus einem Inline-Datensatz laden

Um Daten aus einem Inline-Datensatz zu laden, verwenden Sie die [`parse()`](api/method/parse.md) Methode:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
...
scheduler.parse([
    { id: "1", text: "Meeting", start_date: "2027-05-11 14:00", end_date: "2027-05-11 17:00" },
    { id: "2", text: "Conference", start_date: "2027-05-15 12:00", end_date: "2027-05-18 19:00" },
    { id: "3", text: "Interview", start_date: "2027-05-24 09:00", end_date: "2027-05-24 10:00" }
]);
~~~

### Verwandte Beispiele

- [Ereignisse als Kaskade anzeigen](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Verwandte API

- [`parse()`](api/method/parse.md)

### Verwandte Anleitungen

- [Datenformate](guides/data-formats.md)

## Daten aus einer Datei laden

Um Daten aus einer Datei zu laden, verwenden Sie die [`load()`](api/method/load.md) Methode:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
...
scheduler.load("data.json"); // loading data from a file
~~~


### Verwandte Beispiele

- [Grundlegende Initialisierung](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)

### Verwandte API

- [`load()`](api/method/load.md)

### Verwandte Anleitungen

- [Datenformate](guides/data-formats.md)

## Daten aus dem Backend laden

Laden Sie Daten von Ihrem Backend, indem Sie einen REST-Endpunkt bereitstellen, der Scheduler-Ereignisse im JSON-Format zurückgibt.

- Die serverseitige Implementierung hängt von Ihrem Stack ab. Beispielsweise können Sie in Node.js eine Route hinzufügen, die Ereignisdaten zurückgibt:

~~~js
app.get("/data", async (request, response) => {
    const events = await db.event.find().toArray();
    response.json(events);
});
~~~

- Auf der Client-Seite rufen Sie [`load()`](api/method/load.md) mit der Daten-URL auf:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
scheduler.load("/data");
~~~

:::note
Für das Speichern von Änderungen zurück an den Server verwenden Sie [`createDataProcessor()`](api/method/createdataprocessor.md). Siehe [Serverseitige Integration](guides/server-integration.md).
:::

### Verwandte API

- [`createDataProcessor()`](api/method/createdataprocessor.md)

### Verwandte Anleitungen

- [Serverseitige Integration](guides/server-integration.md)

## Daten aus mehreren Quellen laden

Um Daten aus mehreren Quellen zu laden, rufen Sie die benötigten Endpunkte ab und kombinieren Sie die Ergebnisse, bevor Sie [`parse()`](api/method/parse.md) aufrufen:

~~~js
Promise.all([
    fetch("/api/events").then((response) => response.json()),
    fetch("/api/holidays").then((response) => response.json())
]).then(([events, holidays]) => {
    scheduler.parse([...events, ...holidays]);
});
~~~

### Verwandte API

- [`parse()`](api/method/parse.md)

### Verwandte Anleitungen

- [Datenformate](guides/data-formats.md)

## Daten-Eigenschaften

### Obligatorische Eigenschaften

Damit korrekt geparst werden kann, muss jedes Ereignis die folgenden Eigenschaften enthalten:

- **id** - (*string|number*) eine eindeutige Ereignis-ID
- **start_date** - (*date|string*) das Startdatum des Ereignisses
- **end_date** - (*date|string*) das Enddatum des Ereignisses
- **text** - (*string*) der Titel/ die Beschreibung des Ereignisses

Das Standard-Datumsformat für JSON- und XML-Daten ist **'%Y-%m-%d %H:%i'** (siehe die [Datumsformat-Spezifikation](guides/settings-format.md))

Um es zu ändern, verwenden Sie die Konfigurationsoption [`date_format`](api/config/date_format.md).

~~~js
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init("scheduler_here", new Date(2027, 4, 18), "week");
~~~

### Benutzerdefinierte Eigenschaften

Sie sind nicht auf die oben aufgeführten Pflicht-Eigenschaften beschränkt und können beliebige benutzerdefinierte Eigenschaften zu Dateneinträgen hinzufügen.
Zusätzliche Daten-Eigenschaften werden als Strings geparst und auf der Client-Seite geladen, wo Sie sie nach Bedarf verwenden können.

Siehe Beispiele von Daten mit benutzerdefinierten Eigenschaften [hier](guides/data-formats.md)

### Verwandte API

- [`date_format`](api/config/date_format.md)

### Verwandte Anleitungen

- [Ereignis-Objekt](guides/event-object-operations.md)

## Datenbankstruktur

Wenn Sie eine Datenbank einrichten, ergibt sich die erwartete Struktur für Scheduler-Ereignisse wie folgt:

- **events table** - spezifiziert Scheduler-Ereignisse
- **id** - (*string/int/guid*) die Ereignis-ID. Primärschlüssel, automatisch inkrementiert.
- **start_date** - (*DateTime*) das Startdatum des Ereignisses, nicht nullable.
- **end_date** - (*DateTime*) das Enddatum des Ereignisses, nicht nullable.
- **text** - (*string*) die Beschreibung einer Aufgabe.

Wenn Sie wiederkehrende Ereignisse haben, fügen Sie folgende Felder hinzu:

- **rrule** - (*string*) Wiederholungsregel im RFC-5545-Format
- **duration** - (*number*) Dauer jeder Vorkommnis in Sekunden
- **recurring_event_id** - (*string/int/guid*) übergeordnete Serien-ID für geänderte/gelöschte Vorkommnisse
- **original_start** - (*DateTime*) ursprüngliches Startdatum des bearbeiteten/gelöschten Vorkommens
- **deleted** - (*boolean*) markiert gelöschte Vorkommnisse

Sie können beliebige zusätzliche Spalten definieren, sie können auf den Client geladen und der client-seitigen API zur Verfügung gestellt werden.

### Verwandte Guides

- [Wiederkehrende Ereignisse](guides/recurring-events.md)

## Dynamisches Laden

Standardmäßig lädt dhtmlxScheduler alle Daten auf einmal. Das kann problematisch werden, wenn Sie große Ereignis-Sammlungen verwenden.
In solchen Situationen können Sie den dynamischen Ladevorgang verwenden und Daten schrittweise laden, die erforderlich sind, um den aktuell sichtbaren Bereich des Schedulers auszufüllen.

### Technik

Um das dynamische Laden zu aktivieren, rufen Sie die [`setLoadMode()`](api/method/setloadmode.md) Methode auf:

~~~js
scheduler.setLoadMode("month");
scheduler.load("/api/events");
~~~

Als Parameter nimmt die Methode den Lademodus, der die Größe der zu ladenden Daten definiert: *day, week, month oder year.*

Zum Beispiel, wenn Sie den Modus 'week' festlegen, wird der Scheduler Daten nur für die aktuelle Woche anfordern und die verbleibenden bei Bedarf nachladen.

#### Wie Lade-Modi funktionieren

Die vordefinierten Lade-Modi legen das Intervall fest, in dem Daten innerhalb des gesetzten Zeitraums geladen werden. Zum Beispiel öffnen Sie die Wochenansicht des Timers für folgende Daten: von 2027-02-02 bis 2027-02-09.
Je nach gewähltem Modus verläuft das dynamische Laden folgendermaßen:

- für den "day"-Modus

~~~js
scheduler.setLoadMode("day");
~~~

Der Scheduler wird Daten pro Tag anfordern, z. B. von 2027-02-02 bis 2027-02-09.

- für den "month"-Modus

~~~js
scheduler.setLoadMode("month");
~~~

Der Scheduler wird Daten nach ganzen Monaten anfordern, z. B. von 2027-02-01 bis 2027-03-01.

- für den "year"-Modus

~~~js
scheduler.setLoadMode("year");
~~~

Der Scheduler wird Daten nach ganzen Jahren anfordern, z. B. von 2027-01-01 bis 2028-01-01.

In jedem Fall wird das angeforderte Intervall nicht kleiner als das gerenderte Intervall sein.

Das Lade-Intervall definiert:

- die Häufigkeit der dynamischen Ladeaufrufe

Je größer das Lade-Intervall, desto geringer die Frequenz der Aufrufe für das dynamische Laden. Der Scheduler speichert den bereits geladenen Datenanteil im Speicher und wiederholt keinen Aufruf dafür.

- die Dauer der Bearbeitung einer einzelnen Anfrage

Je größer das Lade-Intervall, desto länger wird eine Anfrage bearbeitet, da mehr Daten auf einmal geladen werden.

#### Anfrage

Generierte Anfragen sehen wie folgt aus:

~~~js
/api/events?from=DATEHERE&to=DATEHERE
~~~

-Wobei DATEHERE ein gültiger Datumswert im von der [`load_date`](api/config/load_date.md) Option definierten Format ist.*

### Verwandte API

- [`setLoadMode()`](api/method/setloadmode.md)
- [`load_date`](api/config/load_date.md)

### Lade-Spinner

Wenn Sie mit großen Datenmengen arbeiten, ist es sinnvoll, den Lade-Spinner anzuzeigen. Er zeigt dem Benutzer, dass die Anwendung tatsächlich etwas tut.

Um den Lade-Spinner für den Scheduler zu aktivieren, setzen Sie die Eigenschaft [`show_loading`](api/config/show_loading.md) auf *true*.

~~~js
scheduler.config.show_loading = true;
...
scheduler.init("scheduler_here", new Date(2027, 4, 10), "month");
~~~

:::note
Um das Spinner-Bild zu ändern - ersetzen Sie 'imgs/loading.gif' durch Ihr eigenes Bild.
:::

## Daten laden mit Timeline- und Units-Abschnitten vom Server {#collections}

Beim Laden von Daten in die Ansichten [Timeline](views/timeline.md) und [Units](views/units.md) müssen Sie ein Array von Abschnitten festlegen, die in die Ansichten geladen werden.

Um Daten zu laden, die Timeline- und Units-Abschnitte vom Backend enthalten, müssen Sie eine erweiterte Konfiguration implementieren:

- während der Initialisierung der Timeline-Ansicht sollten Sie anstelle eines sections-Arrays die [`serverList()`](api/method/serverlist.md) Methode verwenden und den Namen einer Sammlung als Argument übergeben:

~~~js
scheduler.createTimelineView({
    ....
    y_unit: scheduler.serverList("sections"),
    ...
});
~~~

- um Daten in den Scheduler zu laden, verwenden Sie die [`load()`](api/method/load.md) Methode:

~~~js
scheduler.load("data.json");
~~~

Wenn Sie Daten manuell abrufen (zum Beispiel, um Kopfzeilen hinzuzufügen), können Sie denselben Payload an [`parse()`](api/method/parse.md) übergeben:

~~~js
fetch("/api/timeline")
    .then((response) => response.json())
    .then((payload) => scheduler.parse(payload, "json"));
~~~

- während der Implementierung der Scheduler-Datenantwort im Backend verwenden Sie folgendes Format:

~~~js title="data.json"
{
    "data":[
        {
            "id":"1",
            "start_date":"2027-03-02 00:00:00",
            "end_date":"2027-03-04 00:00:00",
            "text":"dblclick me!",
            "type":"1"
        },
        {
            "id":"2",
            "start_date":"2027-03-09 00:00:00",
            "end_date":"2027-03-11 00:00:00",
            "text":"and me!",
            "type":"2"
        },
        {
            "id":"3",
            "start_date":"2027-03-16 00:00:00",
            "end_date":"2027-03-18 00:00:00",
            "text":"and me too!",
            "type":"3"
        },
        {
            "id":"4",
            "start_date":"2027-03-02 08:00:00",
            "end_date":"2027-03-02 14:10:00",
            "text":"Type 2 event",
            "type":"2"
        }
    ],
    "collections": {
        "sections":[
            {"value":"1","label":"Simple"},
            {"value":"2","label":"Complex"},
            {"value":"3","label":"Unknown"}
        ]
    }
}
~~~

In dem obigen Beispiel enthält das "data"-Array Kalenderereignisse, und der Hash "collections" enthält Sammlungen, die über die [`serverList()`](api/method/serverlist.md) Methode referenziert werden können.

### Verwandte API

- [`serverList()`](api/method/serverlist.md)

### Verwandte Guides

- Timeline-Ansicht
- Units-Ansicht