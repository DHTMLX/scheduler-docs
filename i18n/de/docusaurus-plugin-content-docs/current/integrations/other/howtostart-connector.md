---
title: "dhtmlxScheduler mit dhtmlxConnector"
sidebar_label: "dhtmlxScheduler mit dhtmlxConnector"
---

# dhtmlxScheduler mit dhtmlxConnector

Dieses Tutorial führt Sie durch die Erstellung eines einfachen Schedulers, der eine Verbindung zu einer Datenbank herstellt, um Ereignisse zu laden und zu speichern. 
Der hier gezeigte Beispielcode kann als solide Grundlage für Anwendungen mit dhtmlxScheduler dienen.

Das Tutorial beschreibt die Implementierung des Schedulers mit PHP. Wenn Sie eine andere Backend-Sprache bevorzugen, finden Sie entsprechende Anleitungen hier:

- [dhtmlxScheduler mit Node.js](/integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)

Folgen Sie den Schritt-für-Schritt-Anweisungen, um die Anwendung zu erstellen.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/scheduler-howto-php-connector).
:::

![init_scheduler_front.png](/img/init_scheduler_front.png)


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


## Schritt 1. Erstellen einer HTML-Datei und Einbinden der benötigten Dateien

Beginnen Sie mit dem Anlegen einer neuen HTML-Datei und fügen Sie die benötigten Scheduler-Skripte und Stylesheets hinzu.

Die wichtigsten Dateien, die eingebunden werden müssen, sind:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css*

~~~js
<!DOCTYPE html>
<html>
<head>
   <title>How to start</title>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
</head>
<body>
       //Ihr Code kommt hier hin
</body>
</html>
~~~

Hier ein kurzer Überblick über die Struktur des dhtmlxScheduler-Pakets, um zu sehen, wo sich diese Dateien befinden:

- <b>backend</b> - enthält eine node.js-App, die für das Ausführen von Beispielanwendungen nützlich ist.
- <b>samples</b> - enthält Beispiel-Code-Snippets.
- <b>codebase</b> - beinhaltet die Bibliotheksdateien. Im Ordner *codebase/source* befinden sich die unminifizierten Versionen.

## Schritt 2. Definieren der zugehörigen DIV-Elemente

Bevor Sie den Scheduler initialisieren, richten Sie die benötigten DIV-Container ein, die vom Scheduler verwendet werden.

Ein typisches Set an DIVs für den Scheduler sieht folgendermaßen aus:

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

## Schritt 3. Styling

Um sicherzustellen, dass der Scheduler im Vollbildmodus in verschiedenen Browsern korrekt funktioniert, wenden Sie diesen Stil an:

~~~js
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

Falls Sie keinen Vollbildmodus nutzen, ist dieser Stil nicht erforderlich. Sie können stattdessen das gewünschte CSS direkt auf das Haupt-**div** anwenden:

~~~js
<div id="scheduler_here" class="dhx_cal_container">
...
~~~

## Schritt 4. Initialisierung

Nachdem das Setup abgeschlossen ist, initialisieren Sie den Scheduler. Beachten Sie, dass der Scheduler ein Singleton auf der Seite ist - es kann nur eine Instanz existieren.

Sie können auf die Instanz als **dhtmlxScheduler** oder einfach als **scheduler** zugreifen.

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~

## Schritt 5. Laden von Daten

Wenn Sie die App jetzt ausführen, erscheint der Scheduler, jedoch ohne Ereignisse.

Um Ereignisse hinzuzufügen, beginnen Sie mit einer einfachen Inline-Datenquelle. Der Scheduler kann Daten aus Inline-Objekten mit der [parse](api/method/parse.md)-Methode laden.

Jedes Ereignisobjekt sollte folgende Eigenschaften besitzen:

- **id** - (*string, number*) eindeutige Ereignis-ID.
- **start_date** - (*string*) Startzeit des Ereignisses, Standardformat "%m/%d/%Y %H:%i".
- **end_date** - (*string*) Endzeit des Ereignisses, Standardformat "%m/%d/%Y %H:%i".
- **text** - (*string*) Beschreibung des Ereignisses.

~~~js
var events = [
{id:1, text:"Meeting",   start_date:"2019-11-14 14:00",end_date:"2019-11-14 17:00"},
{id:2, text:"Conference",start_date:"2019-11-13 12:00",end_date:"2019-11-13 19:00"},
{id:3, text:"Interview", start_date:"2019-11-14 09:00",end_date:"2019-11-14 10:00"}
];

scheduler.parse(events);//Datenquelle und Format angeben
~~~

## Schritt 6. Datenbankstruktur 
:::note
Beachten Sie diesen und die folgenden Schritte, wenn Sie Daten aus einer Datenbank laden möchten, anstatt Inline-Objekte zu verwenden.
:::

Wenn Sie Daten vom Server laden möchten, beginnen Sie mit dem Erstellen einer Datenbanktabelle wie folgt:

<img src='/img/db_table.png'/>

Sie können sie mit folgendem SQL anlegen:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

Zusätzlich zu diesen Feldern können Sie beliebige weitere Spalten hinzufügen, die dann an den Client gesendet und 
[dem Lightbox-Formular des Schedulers zugeordnet werden können](/guides/lightbox-editors-manipulations.md#mapping-properties-of-an-event-object-to-the-lightbox-sections).

Beachten Sie, dass das DateTime-Format der Datenbank '%Y-%m-%d %H:%i' vom Standardformat des Schedulers '%m/%d/%Y %H:%i' abweicht. 
Um dies korrekt zu handhaben, passen Sie das Datumsformat des Schedulers mit der Option [date_format](api/config/date_format.md) an.

Stellen Sie sicher, dass Sie alle Konfigurationsoptionen vor dem Aufruf der Initialisierungsmethode setzen, z.B.:

~~~js
scheduler.init('scheduler_here',new Date(),"month");
~~~

## Schritt 7. Laden von Daten vom Server {#step7loadingdatafromtheserver}

Um Daten aus Ihrer Datenbank zu laden, verwenden Sie die [load](api/method/load.md)-Methode und geben die URL Ihres Backend-Skripts an.

Sie können Ihr eigenes Backend mit unseren [Anleitungen](/integrations/howtostart-guides.md) erstellen, dieses Tutorial konzentriert sich jedoch auf die [PHP-Connector-Bibliothek](https://docs.dhtmlx.com/connector__php__index.html) als schnelle Lösung.

Verwenden Sie die Methode wie folgt:

~~~js
// URL des serverseitigen Skripts, das CRUD-Operationen verarbeitet, übergeben
scheduler.load("data/connector.php");
~~~

## Schritt 8. Serverseitiges Skript

Laden Sie die Connector-Bibliothek von https://github.com/DHTMLX/connector-php herunter.

Hier ein einfaches PHP-Server-Skript für dhtmlxScheduler:

~~~php
<?php 
require_once("./connector/scheduler_connector.php");

$res = new PDO("mysql:host=localhost;dbname=scheduler", "username", "password");

$connector = new SchedulerConnector($res);
$connector->render_table("events","id","start_date,end_date,text");
~~~


Sie können Ihre Datenbankfelder beliebig benennen. Der Scheduler erwartet, dass die ersten drei Datenfelder folgende sind:

- Startdatum
- Enddatum
- Textbeschreibung

Wenn Ihre Felder beispielsweise anders benannt sind:

~~~php
$connector->render_table("events","id","event_start,event_end,event_text");
~~~

Der Scheduler interpretiert sie wie folgt:

- *event_start* → *start_date*
- *event_end* → *end_date*
- *event_text* → *text*

:::note
Weitere Informationen zu wiederkehrenden Ereignissen finden Sie in der Anleitung zu [Wiederkehrende Ereignisse](/guides/recurring-events.md#server-side-logic).
:::

:::note
Wiederkehrende Ereignisse werden als einzelner Datensatz in der Datenbank gespeichert und vom Scheduler auf der Client-Seite expandiert.
Um einzelne Vorkommen serverseitig abzurufen, verwenden Sie die PHP-Hilfsbibliothek zum Parsen von wiederkehrenden Ereignissen.

Die Bibliothek ist auf GitHub verfügbar: [scheduler-helper-php](https://github.com/DHTMLX/scheduler-helper-php).
:::

## Schritt 9. Speichern von Daten 
An diesem Punkt kann der Scheduler Ereignisse aus der Datenbank laden, speichert Änderungen jedoch nicht automatisch zurück.

Um das Speichern zu ermöglichen, verwenden Sie [dataProcessor](/guides/server-integration.md#technique).

Die Nutzung von dataProcessor ist einfach: Initialisieren Sie ihn und verbinden Sie ihn mit dem Scheduler.

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~

Das war's. Sie haben nun einen einfachen Scheduler, der Ereignisse aus einer Datenbank lädt und Änderungen zurückspeichert.

Passen Sie ihn gerne an Ihre Bedürfnisse an und erweitern Sie ihn.


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


Das vollständige, funktionsfähige Beispiel finden Sie auf [GitHub](https://github.com/DHTMLX/scheduler-howto-php-connector), wo Sie es für Ihre Projekte klonen oder herunterladen können.
