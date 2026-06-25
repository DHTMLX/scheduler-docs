--- 
title: "Operationen mit Datumsangaben"
sidebar_label: "Operationen mit Datumsangaben"
---

# Operationen mit Datumsangaben

Die Bibliothek enthält das [date](api/other/date.md) Objekt, das eine Reihe von Datumsformatierungsfunktionen bereitstellt.

In diesem Artikel betrachten wir besonders wichtige und häufig verwendete Methoden. Eine vollständige Liste der Methoden finden Sie auf der [Date-Objekt-Seite](api/other/date.md).

## Umwandeln eines Date-Objekts in einen String

Um ein Date-Objekt in einen String zu konvertieren, verwenden Sie die [date_to_str](api/other/date.md) Methode: 

*Die Methode gibt eine Funktion zurück, die ein Date-Objekt in einen String des angegebenen Formats konvertiert:*
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 05, 29)); // -> "29/06/2027"
~~~

[Anzeige mehrerer Wochen in der Wochenansicht](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)

## Umwandeln eines Strings in ein Date-Objekt

Um einen String in ein Date-Objekt umzuwandeln, verwenden Sie die [str_to_date](api/other/date.md) Methode: 

*Die Methode gibt eine Funktion zurück, die einen String des angegebenen Formats in ein Date-Objekt konvertiert:*

Sie können wie folgt eine Datum-Konvertierungsfunktion erzeugen:

~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 29. Juni 2027 00:00:00
~~~

## Umrechnung in UTC

Um lokale Zeit in UTC umzuwandeln, verwenden Sie die [convert_to_utc](api/other/date.md) Methode:

~~~js
//29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (utc)
const time = scheduler.date.convert_to_utc(new Date(2027, 05, 29, 14, 00));
~~~

## Hinzufügen (Subtrahieren) eines Zeitintervalls zu (von) einem Datum

Um ein Zeitintervall zu dem angegebenen Datum hinzuzufügen (oder davon zu subtrahieren), verwenden Sie die [add](api/other/date.md) Methode:

~~~js
//adds 1 year to the specified date: 29 June, 2027 -> 29 June, 2020
const newDate = scheduler.date.add(new Date(2027, 05, 29), 1, 'year');
~~~

[Ändern des Y-Achsen-Schritts](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)

:::note
Eine vollständige Liste der Datumsformatierungsfunktionen finden Sie [hier](api/other/date.md).
:::