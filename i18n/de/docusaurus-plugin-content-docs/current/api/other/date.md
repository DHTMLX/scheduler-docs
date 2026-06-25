--- 
sidebar_label: date
title: "Datum-Konfiguration"
description: "eine Reihe von Datums-Formatierungs-Methoden"
---

# date

### Description

@short: A set of date formatting methods

@signature: date: SchedulerDateHelpers

### Details

The `date` object provides the following methods:

- `add()` - fügt das angegebene Zeitintervall zum Datum hinzu bzw. subtrahiert es
    - `date` - (<i>Date</i>) das Date-Objekt, dem Sie Zeit hinzufügen/abziehen müssen
    - `number` - (<i>number</i>) die Anzahl der Einheiten, die hinzuzufügen ist. Ist diese Zahl positiv, wird die Zeit zum Datum hinzugefügt; ist negativ, wird sie abgezogen
    - `unit` - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>) die Zeiteinheit

~~~js
// adds 1 year to the specified date: 29 June, 2027 -> 29 June, 2028
const newDate = scheduler.date.add(new Date(2027, 5, 29), 1, 'year');
~~~

- `convert_to_utc()` - wandelt lokale Zeit in UTC um
    - `date` - (<i>Date</i>) das zu konvertierende Date-Objekt
  
~~~js
// 29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (UTC)
const time = scheduler.date.convert_to_utc(new Date(2027, 5, 29, 14, 0));
~~~  

- `copy()` - erstellt eine Kopie eines Date-Objekts
    - `date` - (<i>Date</i>) das zu kopierende Date-Objekt
  
~~~js
const copy = scheduler.date.copy(new Date(2027, 5, 29)); // -> 29 June, 2027
~~~  
  
- `date_part()` - setzt den Zeitanteil des übergebenen Datums auf 00:00:00
    - `date` - (<i>Date</i>) das zu formatierende Datum
  
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 00:00:00
const date = scheduler.date.date_part(new Date(2027, 5, 29, 14, 30, 10));
~~~  

- `date_to_str()` - gibt eine Funktion zurück, die ein Date-Objekt in einen String des angegebenen Formats konvertiert
Parameter: `format` - (<i>string</i>) das Datum-Format (siehe [Date Format Specification](guides/settings-format.md))
`utc` - (<i>boolean</i>) gibt an, ob lokale Zeit in UTC umgewandelt werden soll
  
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 5, 29)); // -> "29/06/2027"
~~~  

- `day_start()` - setzt den Zeitanteil des übergebenen Datums auf 00:00:00. Alias der `date_part()`-Methode. Wird von der Day-Ansicht verwendet, um das Anzeigedatum festzulegen und kann neu definiert werden, um das Standardverhalten bereitzustellen
Parameter: `date` - (<i>Date</i>) das zu formatierende Datum

~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 00:00:00
const date = scheduler.date.day_start(new Date(2027, 5, 29, 14, 30, 10));
~~~  

> **Hinweis**: Das an die Methode übergebene Datum wird tatsächlich geändert. Sie können verhindern, dass das ursprüngliche Datum verändert wird, indem Sie das Eingabedatum mit `new Date()` umschließen. Zum Beispiel:

~~~js
const originalDate = new Date(2027, 5, 29, 14, 30, 10);
const dayStartDate = scheduler.date.day_start(new Date(originalDate));
~~~

- `getISOWeek()` - gibt die Wochennummer des Datums zurück
    - `date` - (<i>Date</i>) das zu formatierende Date-Objekt
  
~~~js
const week = scheduler.date.getISOWeek(new Date(2027, 5, 29)); // -> 26
~~~  

- `getUTCISOWeek()` - gibt die Wochennummer des Datums zurück, wandelt dabei zuvor die lokale Zeit in UTC um
    - `date` - (<i>Date</i>) das zu formatierende Date-Objekt

~~~js
const week = scheduler.date.getUTCISOWeek(new Date(2027, 5, 29)); // -> 26
~~~  

- `month_start()` - gibt ein Date-Objekt des ersten Tages des Monats für das angegebene Datum zurück und setzt den Zeitanteil auf Null
    - `date` - (<i>Date</i>) das zu formatierende Datum
  
~~~js
// 29 June, 2027 14:30 -> 01 June, 2027 00:00
const firstDay = scheduler.date.month_start(new Date(2027, 5, 29, 14, 30));
~~~  

<span id="strtodate"></span>
- `str_to_date()` - gibt eine Funktion zurück, die eine Zeichenkette des angegebenen Formats in ein Date-Objekt konvertiert
Parameter: `format` - (<i>string</i>) das Datum-Format (siehe [Date Format Specification](guides/settings-format.md))
`utc` - (<i>boolean</i>) gibt an, ob lokale Zeit in UTC umgewandelt werden soll
`parseExact` - (<i>boolean</i>) legt fest, ob Scheduler das Datumsformat automatisch erkennt (*false*, Standard) oder das vom Benutzer übergebene Format verwendet (*true*)
~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~  

- `time_part()` - gibt die Zeit eines Date-Objekts als eine Anzahl Sekunden seit Mitternacht (00:00:00) zurück
    - `date` - (<i>Date</i>) das zu formatierende Datum
~~~js
const time = scheduler.date.time_part(new Date(2027, 5, 29, 14, 30, 10));
 // time -> 52210
~~~

- `to_fixed()` - fügt führende Null bei Zahlen unter 10 hinzu und gibt das Ergebnis als String zurück. Betrifft Zahlen größer/gleich 10 nicht
    - `num` - (<i>number</i>) die zu formatierende Zahl

~~~js
const num1 = scheduler.date.to_fixed(2); // -> "02"
const num2 = scheduler.date.to_fixed(10); // -> 10
~~~  

- `week_start()` - gibt ein Date-Objekt des ersten Wochentages für das angegebene Datum zurück und setzt den Zeitanteil auf Null
    - `date` - (<i>Date</i>) das zu formatierende Datum

~~~js
// 29 June, 2027 14:30 -> 28 June, 2027 00:00
const weekStart = scheduler.date.week_start(new Date(2027, 5, 29, 14, 30));
~~~  

- `year_start()` - gibt ein Date-Objekt des ersten Tages des Jahres für das angegebene Datum zurück und setzt den Zeitanteil auf Null
    - `date` - (<i>Date</i>) das zu formatierende Datum
  
~~~js
// 29 June, 2027 14:30 -> 01 January, 2027 00:00
const yearStart = scheduler.date.year_start(new Date(2027, 5, 29, 14, 30));
~~~