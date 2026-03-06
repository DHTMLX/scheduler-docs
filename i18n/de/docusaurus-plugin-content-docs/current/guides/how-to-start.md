---
title: "Wie man startet"
sidebar_label: "Wie man startet"
---

# Wie man startet

Dieses Tutorial führt Sie durch die Erstellung eines grundlegenden Schedulers, der Daten aus einer Datenbank lädt und wieder speichert. 
Das abschließende Beispiel kann als solide Grundlage für die Entwicklung von Anwendungen mit dhtmlxScheduler dienen.

![init_scheduler_front.png](/img/init_scheduler_front.png)


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


## Schritt 1. Erstellen Sie eine neue HTML-Datei und fügen Sie die erforderlichen Dateien hinzu

Beginnen Sie mit dem Erstellen einer neuen HTML-Datei und binden Sie die notwendigen Scheduler-Skripte und -Styles ein.

Die benötigten Dateien sind:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler_material.css* (für das Material-Design; Sie können auch [andere verfügbare Skins ansehen](guides/skins.md))

~~~html
<!DOCTYPE html>
<html>
<head>
   <title>How to start</title>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler_material.css" 
           type="text/css">
</head>
<body>
       //Ihr Code wird hier eingefügt
</body>
</html>
~~~

Werfen wir einen kurzen Blick auf die Struktur des dhtmlxScheduler-Pakets, um zu wissen, wo sich diese Dateien befinden:

- <b>sources</b> - Quellcodedateien, unminifiziert und gut lesbar, hauptsächlich für Debugging-Zwecke.
- <b>samples</b> - Beispiel-Code-Snippets.
- <b>docs</b> - Vollständige Dokumentation für die Komponente.
- <b>codebase</b> - Minifizierte Dateien, optimiert für den Produktionseinsatz. <b>Verwenden Sie die Dateien aus diesem Ordner in Ihren Projekten.</b>

## Schritt 2. Definieren Sie die zugehörigen DIV-Elemente

Bevor Sie den Scheduler initialisieren, richten Sie die notwendigen DIV-Container für die UI-Elemente ein.

Ein typisches Set von 'divs', das für den Scheduler benötigt wird, sieht folgendermaßen aus:

~~~js
<div id="scheduler_here" class="dhx_cal_container">
    <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" name="day_tab"></div>
        <div class="dhx_cal_tab" name="week_tab"></div>
        <div class="dhx_cal_tab" name="month_tab"></div>
       </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~

## Schritt 3. Style

Um ein korrektes Vollbildverhalten in verschiedenen Browsern sicherzustellen, fügen Sie folgenden CSS-Style für den Scheduler hinzu:

~~~css
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

Wenn Sie keinen Vollbildmodus verwenden, ist dieser Stil nicht notwendig. Stattdessen können Sie die gewünschten CSS-Eigenschaften direkt auf das Haupt-**div** anwenden:

~~~html
<div id="scheduler_here" class="dhx_cal_container"/>
...
~~~

## Schritt 4. Initialisierung

Sobald alles vorbereitet ist, können Sie den Scheduler initialisieren. Beachten Sie, dass der Scheduler ein statisches Objekt ist und nur einmal pro Seite instanziiert werden sollte. 
Sie können auf die Scheduler-Instanz mit **dhtmlxScheduler** oder einfach **scheduler** zugreifen.

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~

## Schritt 5. Daten laden

An diesem Punkt wird beim Ausführen der App der Scheduler angezeigt, aber es sind noch keine Events vorhanden.

Um ihn mit Daten zu füllen, beginnen Sie mit einem einfachen Inline-Objekt als Datenquelle. 
Verwenden Sie die Methode [parse](api/method/parse.md), um Daten aus einem Inline-Objekt zu laden.

Jedes Event-Objekt enthält:

- **id** - (*string, number*) Event-Identifikator.
- **start_date** - (*string*) Startdatum des Events, Standardformat "%m/%d/%Y %H:%i".
- **end_date** - (*string*) Enddatum des Events, Standardformat "%m/%d/%Y %H:%i".
- **text** - (*string*) Beschreibung des Events.

~~~js
var events = [
   {id:1, text:"Meeting",   start_date:"04/11/2018 14:00",end_date:"04/11/2018 17:00"},
   {id:2, text:"Conference",start_date:"04/15/2018 12:00",end_date:"04/18/2018 19:00"},
   {id:3, text:"Interview", start_date:"04/24/2018 09:00",end_date:"04/24/2018 10:00"}
];

scheduler.parse(events); // Datenquelle und Format angeben
~~~

Sie können auch [Daten vom Server laden](#step7loadingdatafromtheserver).

:::note
Details zur Integration mit der Serverseite finden Sie im Artikel [Serverseitige Integration](guides/server-integration.md).
:::

## Schritt 6. Datenbankstruktur

:::note
Führen Sie diese Schritte aus, wenn Sie Daten aus einer Datenbank statt aus einem Inline-Objekt laden möchten.
:::

Wenn Sie sich entscheiden, Daten vom Server zu laden, benötigen Sie eine Datenbanktabelle mit folgender Struktur:

<img src='/img/db_table.png'/>

Sie können sie mit folgendem SQL-Code erstellen:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

Neben diesen Feldern können Sie weitere Spalten hinzufügen, die dann an den Client gesendet und [im Lightbox-Formular zugeordnet](guides/custom-details-form.md#mapping_db_fields_to_the_form) werden können.

Beachten Sie, dass das Datumsformat in der Datenbank '%Y-%m-%d %H:%i' vom Standardformat des Schedulers '%m/%d/%Y %H:%i' abweicht. 
Um dies korrekt zu verarbeiten, passen Sie das Datumsformat des Schedulers mit der Option [xml_date](api/config/xml_date.md) an.

Stellen Sie sicher, dass Sie die Konfigurationsoptionen vor der Initialisierung des Schedulers setzen, zum Beispiel:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

## Schritt 7. Laden von Daten vom Server

Um Daten aus einer Datenbank zu laden, verwenden Sie die Methode [load](api/method/load.md) und geben Sie die URL eines Server-Skripts an, das die Datenoperationen verarbeitet.

:::note
Die [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) Bibliothek kann Ihnen einen schnellen Einstieg ermöglichen, wie hier gezeigt. Für neue Projekte wird jedoch empfohlen, das Backend-API manuell zu erstellen, um mehr Flexibilität zu haben. Siehe [Serverseitige Integration](guides/server-integration.md) für Details.
:::
  
So rufen Sie die Methode auf:

~~~js
// Geben Sie die URL des Server-Skripts an, das CRUD-Operationen verarbeitet
scheduler.load("data/connector.php");
~~~

## Schritt 8. Serverseitiges Skript

Hier ein Beispiel für ein serverseitiges Skript für dhtmlxScheduler:

~~~php
<?php 
require_once("../codebase/connector/scheduler_connector.php");
 
$res="mysql_connect(""localhost","root","");
mysql_select_db("schedulerDB");

$conn = new SchedulerConnector($res);

$conn->render_table("events","id","start_date,end_date,text");
~~~

### Zuordnung von Datenbankspalten

Beachten Sie, dass die Reihenfolge der Spalten in **$connector->render_table** wichtig ist. Die ersten drei Spalten entsprechen den Eigenschaften *start_date*, *end_date* und *text* des clientseitigen Event-Objekts, unabhängig von deren tatsächlichen Spaltennamen:

~~~js
$conn->render_table("events","EventId","Start,End,Name,details","");
// JS: event.id, event.start_date, event.end_date, event.text, event.text, event.details
~~~

#### Zuordnung zusätzlicher Spalten

Alle weiteren Spalten werden direkt anhand ihres Namens zugeordnet:

~~~js
$conn->render_table("events","id","start_date,end_date,text,custom,details","");
// JS: event.start_date, event.end_date, event.text, event.custom, event.details
~~~

Sie können auch Aliase wie folgt verwenden:

~~~js
$conn->render_table("events","id",
    "start_date,end_date,text,custom_column(customProperty),details","");
// JS: event.start_date, event.end_date, event.text, event.customProperty, event.details
~~~

## Schritt 9. Daten speichern

An diesem Punkt kann der Scheduler Daten aus der Datenbank laden, aber Änderungen werden noch nicht automatisch zurückgespeichert. 
Um das Speichern zu ermöglichen, verwenden Sie <a href="https://docs.dhtmlx.com/dataprocessor__index.html">dataProcessor</a>.

Die Verwendung von dataProcessor ist einfach - initialisieren Sie ihn und verbinden Sie ihn mit dem Scheduler:

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~
  
Das war's! Sie haben nun einen grundlegenden Scheduler, der Daten mit einer Datenbank laden und speichern kann.

Von hier aus können Sie ihn nach Ihren spezifischen Anforderungen anpassen und erweitern.


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)
