--- 
title: "iCal-Export/Import" 
sidebar_label: "iCal-Export/Import" 
--- 

# iCal-Export/Import

:::note
Dieses Tool ist veraltet und wird nicht mehr unterstützt. Bitte verwenden Sie es daher nicht in Ihren Anwendungen!
:::

Der Legacy-Exporter/Importer basiert auf PHP, daher sind die untenstehenden Snippets PHP-Beispiele. Wenn Sie ein anderes Backend verwenden, nutzen Sie die iCalendar-Bibliothek Ihrer Plattform und weisen Sie Felder den Scheduler-Ereignis-Eigenschaften zu.

Sie haben die Möglichkeit, Daten im iCal-Format zu importieren/exportieren, entweder mit einem fertigen Utility oder mithilfe von API-Methoden.

## iCal-Exporter (Frontend)

![ical_exporter1.png](/img/ical_exporter1.png)

Die Frontend-Komponente des Tools besteht aus zwei Teilen:

- **Ressourcenkonfiguration** 
- **Datenbankkonfiguration**.

Im ersten Teil legen Sie den Pfad zu den Daten fest. Sie können dies entweder tun, indem Sie den Pfad aus dem geöffneten Dialogfenster auswählen (**Ical-Datei**, der Button "Überblick") oder ihn manuell festlegen (**Ical-URL**).

Der zweite Teil enthält die Standard-Einstellungen der Datenbank (Hostname, Datenbank- und Tabellenname, Benutzername und Passwort), in denen Sie die iCal-Daten speichern möchten. Auch hier können Sie festlegen, ob Ihre alten Daten gelöscht werden müssen oder nicht (**Alle Daten löschen**).

## API-Methoden

Hier finden Sie alle API-Methoden, die verwendet werden können, um iCal-Export/Import in einer App zu implementieren.

### Initialisierung

Um den iCal-Exporter/Importer zu initialisieren, verwenden Sie den folgenden Code:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();

~~~

### iCalendar-Import

Sie können iCal-Daten mit den folgenden Methoden importieren:

- **setTitle($title)** - setzt den Titel der iCal-Datei in der toICal()-Methode
- **getTitle()** - erhält den Titel der iCal-Datei
- **toICal($events)** -  wandelt die Informationen aus dem Array oder XML-String in das iCalendar-Format um

### iCalendar-Export

Sie können iCal-Daten mit den folgenden Methoden exportieren:

- **toHash($ical)** - wandelt einen iCal-String in ein Array von Ereignissen um
- **toXML($ical)** - wandelt einen iCal-String in das XML-Format um


#### Beispiele
Eine Reihe von Code-Schnipseln, die zeigen, wie man iCal-Export/Import ausführt, wird hier präsentiert.

+ Festlegen des iCalendar-Titels

Der folgende Code ermöglicht es Ihnen, den Titel der importierten/exportierten iCalendar-Daten festzulegen.

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$export->setTitle("Calendar name");
$ical = $export->toICal($xml);
file_put_contents("ical.ics", $ical);

~~~

+ Array von Ereignissen

Dies ist ein Beispiel für ein Ereignis-Array, das in Import-/Exportdaten von/zu einem Array referenziert wird.

~~~php
$events = array(
    array(
        "id" => 1,
        "start_date" => "2027-04-05 08:00:00",
        "end_date" => "2027-04-09 09:00:00",
        "text" => "text1",
        "rec_type" => "week_2___3,5",
        "event_pid" => null,
        "event_length" => 3600
    ),

    array(
        "id" => 2,
        "start_date" => "2027-04-06 12:00:00",
        "end_date" => "2027-04-06 18:00:00",
        "text" => "text2",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 3,
        "start_date" => "2027-04-07 12:00:00",
        "end_date" => "2027-04-07 18:00:00",
        "text" => "text3",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 4,
        "start_date" => "2027-04-08 12:00:00",
        "end_date" => "2027-04-08 18:00:00",
        "text" => "text4",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    )
);

~~~


+ Von Array zu iCal

Verwenden Sie diesen Code, um Daten von einem Array in einen iCal-String zu exportieren:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($events);
file_put_contents("ical.ics");

~~~


+ Von XML zu iCal

Verwenden Sie diesen Code, um Daten von XML in iCal zu exportieren:

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($xml);
file_put_contents("ical.ics");

~~~


+ Von iCal zu Array

Verwenden Sie diesen Code, um Daten von iCal in ein Array zu exportieren:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$events = $export->toHash($ical);

~~~


+ Von iCal zu XML

Verwenden Sie diesen Code, um Daten von iCal in XML zu exportieren:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$xml = $export->toXML($ical);
file_put_contents("events_rec.xml", $xml);

~~~