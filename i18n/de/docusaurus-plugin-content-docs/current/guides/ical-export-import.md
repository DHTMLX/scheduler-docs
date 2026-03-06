---
title: "iCal Export/Import"
sidebar_label: "iCal Export/Import"
---

# iCal Export/Import 

:::warning
Dieses Tool ist veraltet und wird nicht mehr unterstützt. Bitte verwenden Sie es daher nicht in Ihren Anwendungen!
:::

Es ist möglich, Daten im iCal-Format entweder mit einem fertigen Dienstprogramm oder über API-Methoden zu importieren oder zu exportieren.

## iCal Exporter (Front-End) 

![ical_exporter1.png](/img/ical_exporter1.png)

Das Front-End des Dienstprogramms besteht aus zwei Abschnitten:

- **Ressourcenkonfiguration** 
- **Datenbankkonfiguration**

Im ersten Abschnitt geben Sie den Datenpfad an. Dies kann entweder durch Auswahl des Pfads über ein geöffnetes Dialogfenster (**Ical file**, die Schaltfläche "Overview") oder durch manuelle Eingabe (**Ical URL**) erfolgen.
  
  
Der zweite Abschnitt enthält die üblichen Datenbankeinstellungen (Host, Name der Datenbank und Tabelle, Benutzername und Passwort), in denen die iCal-Daten gespeichert werden. Hier können Sie auch festlegen, ob alte Daten gelöscht werden sollen (**Delete all data**).

## API-Methoden 

Nachfolgend finden Sie die verfügbaren API-Methoden zur Implementierung von iCal-Export/Import in einer Anwendung.
 
### Initialisierung

Um den iCal Exporter/Importer einzurichten, verwenden Sie folgenden Code:


~~~php
require_once("codebase/class.php");
$export = new ICalExporter();

~~~


### iCalendar Import

Die folgenden Methoden werden zum Importieren von iCal-Daten verwendet:

- **setTitle($title)** - weist der iCal-Datei im toICal()-Verfahren einen Titel zu
- **getTitle()** - ruft den Titel der iCal-Datei ab
- **toICal($events)** - konvertiert Daten aus einem Array oder XML-String in das iCalendar-Format

### iCalendar Export

Die folgenden Methoden werden zum Exportieren von iCal-Daten verwendet:

- **toHash($ical)** - konvertiert einen iCal-String in ein Array von Ereignissen
- **toXML($ical)** - konvertiert einen iCal-String in das XML-Format


#### Beispiele
Hier sind einige Codebeispiele, die zeigen, wie man iCal-Export/Import durchführt.


+ iCalendar-Titel setzen

Dieses Beispiel zeigt, wie der Titel für importierte oder exportierte iCalendar-Daten gesetzt wird.

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$export->setTitle("Calendar name");
$ical = $export->toICal($xml);
file_put_contents("ical.ics", $ical);

~~~


+ Array von Ereignissen

Dieses Beispiel zeigt ein Array von Ereignissen, das zum Importieren/Exportieren von Daten aus/in ein Array verwendet wird.


~~~php
$events = array(
    array(
        "id" => 1,
        "start_date" => "2010-04-05 08:00:00",
        "end_date" => "2012-04-09 09:00:00",
        "text" => "text1",
        "rec_type" => "week_2___3,5",
        "event_pid" => null,
        "event_length" => 3600
    ),

    array(
        "id" => 2,
        "start_date" => "2010-04-06 12:00:00",
        "end_date" => "2010-04-06 18:00:00",
        "text" => "text2",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 3,
        "start_date" => "2010-04-07 12:00:00",
        "end_date" => "2010-04-07 18:00:00",
        "text" => "text3",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 4,
        "start_date" => "2010-04-08 12:00:00",
        "end_date" => "2010-04-08 18:00:00",
        "text" => "text4",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    )
);

~~~


+ Vom Array zu iCal

Dieser Code exportiert Daten aus einem Array in einen iCal-String:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($events);
file_put_contents("ical.ics");

~~~


+ Von XML zu iCal

Dieses Beispiel exportiert Daten aus XML in das iCal-Format:

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($xml);
file_put_contents("ical.ics");

~~~


+ Von iCal zu Array

Dieses Beispiel exportiert Daten aus einer iCal-Datei in ein Array:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$events = $export->toHash($ical);

~~~


+ Von iCal zu XML

Dieses Beispiel exportiert Daten aus einer iCal-Datei in das XML-Format:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$xml = $export->toXML($ical);
file_put_contents("events_rec.xml", $xml);

~~~
