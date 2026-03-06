---
sidebar_label: "date"
title: "date config"
description: "eine Sammlung von Methoden zur Formatierung und Manipulation von dates"
---

# date

### Description

@short: Eine Sammlung von Methoden zur Formatierung und Manipulation von dates

@signature: date: SchedulerDateHelpers


### Details

Das **date**-Objekt enthält mehrere nützliche Methoden:

- **add**(date, number, unit) - passt das date an, indem ein bestimmtes Zeitintervall hinzugefügt oder subtrahiert wird
    - **date** - (<i>Date</i>) das zu ändernde date-Objekt
    - **number** - (<i>number</i>) die Anzahl der hinzuzufügenden Einheiten; positive Werte fügen Zeit hinzu, negative subtrahieren sie
    - **unit** - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>) die Zeiteinheit

~~~js
//fügt 1 Jahr zum angegebenen date hinzu: 29. Juni 2019 -> 29. Juni 2020
var newDate = scheduler.date.add(new Date(2019, 05, 29), 1, 'year');
~~~

- **convert_to_utc**(date) - konvertiert ein lokales date in das entsprechende UTC-date
    - **date** - (<i>Date</i>) das zu konvertierende date-Objekt
  
~~~js
//29. Juni 2019 14:00 (Ortszeit) -> 29. Juni 2019 12:00 (UTC)
var time = scheduler.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

- **copy**(date) - erstellt eine Kopie eines Date-Objekts
    - **date** - (<i>Date</i>) das zu kopierende date-Objekt
  
~~~js
var copy = scheduler.date.copy(new Date(2019, 05, 29)); // -> 29. Juni 2019
~~~
  
- **date_part**(date) - setzt den Zeitanteil des dates auf 00:00:00 zurück
    - **date** - (<i>Date</i>) das zu ändernde date-Objekt
  
~~~js
//29. Juni 2019 14:30:10 -> 29. Juni 2019 00:00:00
var date = scheduler.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  
- **date_to_str**(format, utc) - gibt eine Funktion zurück, die ein Date-Objekt in einen String im angegebenen Format umwandelt
       - **format** - (<i>string</i>) das gewünschte Datumsformat (siehe [Datumsformat-Spezifikation](guides/settings-format.md))  
       - **utc** - (<i>boolean</i>) ob die Ortszeit in UTC umgewandelt werden soll  
  
~~~js
var formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~
  
- **day_start**(date) - setzt den Zeitanteil des dates auf 00:00:00 zurück; dies ist ein Alias für die Methode <b>date_part</b>. Wird in der Day-Ansicht verwendet, um das Anzeigedatum festzulegen, und kann bei Bedarf angepasst werden
      - **date** - (<i>Date</i>) das zu ändernde date-Objekt

~~~js
//29. Juni 2019 14:30:10 -> 29. Juni 2019 00:00:00
var date = scheduler.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

>**Hinweis:** Diese Methode verändert das übergebene date. Um das Originaldate nicht zu verändern, sollte es vor dem Übergeben in *new Date* eingewickelt werden. Zum Beispiel:

~~~js
var date1 = new Date(2019, 05, 29, 14, 30, 10);
var date2 = scheduler.date.day_start(new Date(date1));
~~~

- **getISOWeek**(date) - gibt die ISO-Wochennummer für das angegebene date zurück
    - **date** - (<i>Date</i>) das zu evaluierende date-Objekt

~~~js
var week = scheduler.date.getISOWeek(new Date(2019, 05, 29)); // -> 26
~~~

- **getUTCISOWeek**(date) - gibt die ISO-Wochennummer für das date zurück, nachdem es in UTC konvertiert wurde
    - **date** - (<i>Date</i>) das zu evaluierende date-Objekt

~~~js
var week = scheduler.date.getUTCISOWeek(new Date(2019, 05, 29)); // -> 26
~~~

- **month_start**(date) - gibt ein neues Date-Objekt zurück, das den ersten Tag des Monats mit der Zeit 00:00:00 repräsentiert
    - **date** - (<i>Date</i>) das zu verarbeitende date-Objekt
  
~~~js
//29. Juni 2019 14:30 -> 01. Juni 2019 00:00
var firstDay = scheduler.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~

- <span id="strtodate">**str_to_date**(format, utc, parseExact)</span> - gibt eine Funktion zurück, die einen Datumsstring im angegebenen Format in ein Date-Objekt umwandelt
      - **format** - (<i>string</i>) das Datumsformat (siehe [Datumsformat-Spezifikation](guides/settings-format.md))  
      - **utc** - (<i>boolean</i>) ob die Ortszeit in UTC umgewandelt werden soll  
      - **parseExact** - (<i>boolean</i>) bestimmt, ob Scheduler das Datumsformat automatisch erkennen soll (*false* standardmäßig) oder strikt das angegebene Format verwendet (*true*)
~~~js
var formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29. Juni 2019 00:00:00
~~~

- **time_part**(date) - gibt den Zeitanteil eines Date-Objekts als Anzahl der Sekunden seit Mitternacht (00:00:00) zurück
    - **date** - (<i>Date</i>) das zu evaluierende date-Objekt
~~~js
var time = scheduler.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
//time -> 52210
~~~

- **to_fixed**(num) - formatiert Zahlen kleiner als 10 mit einer führenden Null und gibt einen String zurück; Zahlen ab 10 werden unverändert zurückgegeben
    - **num** - (<i>number</i>) die zu formatierende Zahl

~~~js
var num1 = scheduler.date.to_fixed(2);  // -> "02"
var num2 = scheduler.date.to_fixed(10); // -> 10
~~~
  
- **week_start**(date) - gibt ein Date-Objekt für den ersten Tag der Woche des angegebenen dates zurück, mit der Zeit 00:00:00
    - **date** - (<i>Date</i>) das zu verarbeitende date-Objekt

~~~js
//29. Juni 2019 14:30 -> 24. Juni 2019 00:00
var weekStart = scheduler.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~
  
- **year_start**(date) - gibt ein Date-Objekt für den ersten Tag des Jahres des angegebenen dates zurück, mit der Zeit 00:00:00
    - **date** - (<i>Date</i>) das zu verarbeitende date-Objekt
  
~~~js
//29. Juni 2019 14:30 -> 01. Januar 2019 00:00
var yearStart = scheduler.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
