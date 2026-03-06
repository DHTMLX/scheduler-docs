---
title: "Operationen mit Datumsangaben"
sidebar_label: "Operationen mit Datumsangaben"
---

# Operationen mit Datumsangaben

Die Bibliothek enthält das Objekt [date](api/other/date.md), das eine Vielzahl von Methoden zur Datumsformatierung bietet.

Dieser Artikel hebt einige der wichtigsten und am häufigsten verwendeten Methoden hervor. Die vollständige Liste der Methoden finden Sie auf der [Date-Objekt-Seite](api/other/date.md).


## Umwandlung eines Date-Objekts in einen String

Um ein Date-Objekt in einen String umzuwandeln, wird die Methode [date_to_str](api/other/date.md) verwendet: 

 
*Diese Methode gibt eine Funktion zurück, die ein Date-Objekt gemäß dem angegebenen Muster in einen String formatiert:*
~~~js
var formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~


[Displaying several weeks in Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)

## Umwandlung eines Strings in ein Date-Objekt

Um einen String in ein Date-Objekt umzuwandeln, steht die Methode [str_to_date](api/other/date.md) zur Verfügung: 

 
*Diese Methode liefert eine Funktion, die einen entsprechend formatierten String analysiert und ein Date-Objekt zurückgibt:*


Sie können eine Datums-Parsing-Funktion wie folgt erstellen:

~~~js
var formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29 June, 2019 00:00:00
~~~


## Umwandlung in UTC

Um ein lokales Datum und eine lokale Uhrzeit in UTC umzuwandeln, verwenden Sie die Methode [convert_to_utc](api/other/date.md):

~~~js
//29 June, 2019 14:00 (local time) -> 29 June, 2019 12:00 (utc)
var time = scheduler.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

## Hinzufügen (oder Subtrahieren) eines Zeitintervalls zu (von) einem Datum

Um ein Zeitintervall zu einem gegebenen Datum zu addieren oder davon zu subtrahieren, kann die Methode [add](api/other/date.md) verwendet werden:

~~~js
//adds 1 year to the specified date: 29 June, 2019 -> 29 June, 2020
var newDate = scheduler.date.add(new Date(2019, 05, 29), 1, 'year');
~~~


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


:::note
Die vollständige Liste der Methoden zur Datumsformatierung finden Sie [hier](api/other/date.md).
:::
