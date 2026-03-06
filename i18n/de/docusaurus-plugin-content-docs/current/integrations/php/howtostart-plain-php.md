---
title: "dhtmlxScheduler mit PHP"
sidebar_label: "dhtmlxScheduler mit PHP"
---

# dhtmlxScheduler mit PHP 

Dieses Tutorial enthält alle wichtigen Details, die Sie benötigen, um einen Scheduler mit PHP zu erstellen, ohne auf Frameworks zurückzugreifen.

Das Setup verwendet MySQL zur Datenspeicherung und das [PDO-Interface](https://www.php.net/manual/en/ref.pdo-mysql.php) für den Datenbankzugriff. Um mitzumachen, benötigen Sie PHP 5.4 oder höher mit aktivierter [PDO_MYSQL](https://www.php.net/manual/en/ref.pdo-mysql.php)-Erweiterung sowie MySQL oder MariaDB.

Falls Sie an einer serverseitigen Integration mit anderen Plattformen oder Frameworks interessiert sind, stehen Ihnen folgende Tutorials zur Verfügung:

- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit Node.js](/integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Sie können auch die [komplette Demo auf GitHub](https://github.com/DHTMLX/scheduler-howto-php-plain) ansehen und den Schritt-für-Schritt-Anweisungen folgen, um die Anwendung zu erstellen.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/scheduler-howto-php-plain).
:::

## Schritt 1. Projekt erstellen

Beginnen Sie mit dem Anlegen eines neuen Verzeichnisses für Ihre Anwendung.

Erstellen Sie einen leeren Ordner und nennen Sie ihn `scheduler-howto-php-plain`.

## Schritt 2. Scheduler zur Seite hinzufügen

Erstellen Sie als Nächstes eine Seite, die den Scheduler enthält.

Legen Sie im Ordner `scheduler-howto-php-plain` eine Datei namens `index.html` an und fügen Sie folgenden Inhalt hinzu:


~~~js title="scheduler-howto-php-plain/index.html"
<!doctype html>
<html>
    <head>
      <title> Getting started with dhtmlxScheduler</title>
      <meta charset="utf-8">
      <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
      <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
              rel="stylesheet" type="text/css" charset="utf-8">
        <style>
            html, body{
                margin:0px;
                padding:0px;
                height:100%;
                overflow:hidden;
            }
        </style> 
    </head> 
    <body> 
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
    <script>
        scheduler.init('scheduler_here', new Date(2019,0,20), "week");
        scheduler.load("data/api.php");
    </script> 
    </body> 
</html>
~~~

Wenn Sie die App ausführen, sollte der Scheduler auf der Seite erscheinen:

![Scheduler initialization](/img/php_plain.png)

## Schritt 3. Datenbank vorbereiten

Zu diesem Zeitpunkt ist der Scheduler noch leer. Der nächste Schritt ist das Einrichten einer Datenbank und deren Verbindung mit der Anwendung.

### Datenbank erstellen

Sie können die Datenbank entweder über Ihren bevorzugten MySQL-Client (wie phpMyAdmin) oder über die Kommandozeile anlegen. Verwenden Sie folgenden SQL-Code, um eine neue Datenbank und eine Tabelle für Kalenderereignisse zu erstellen:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler_howto_php`;
USE `scheduler_howto_php`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

Wenn Sie die MySQL-Konsole verwenden möchten, speichern Sie den obigen SQL-Code in einer Datei *dump.sql* und führen Sie dann aus:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

## Schritt 4. Daten laden

Nachdem die Datenbank bereit ist, können Sie Daten in den Scheduler laden.

Erstellen Sie einen neuen Ordner namens `data` in Ihrem Projektverzeichnis.

Definieren Sie zunächst die Datenbankverbindungsdaten in einer Konfigurationsdatei `data/config.php`:

~~~js title="data/config.php"
<?php
$dsn = "mysql:host=localhost;dbname=scheduler_howto_php";
$username = "root";
$password = "";
 
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
);
~~~

Stellen Sie sicher, dass Sie „localhost", „scheduler_howto_php", „root" und „" an Ihre tatsächlichen Datenbankeinstellungen anpassen.

Fügen Sie als Nächstes ein PHP-Skript hinzu, das vom Client aufgerufen wird, um Daten aus der Datenbank zu laden und Änderungen am Scheduler zu speichern.

Erstellen Sie eine Datei namens `api.php` im Ordner `data` und beginnen Sie mit dem Öffnen einer Datenbankverbindung:

~~~js title="data/api.php"
<?php
require_once("config.php");
$db = new PDO($dsn, $username, $password, $options);
~~~

Implementieren Sie dann eine Funktion, die Scheduler-Ereignisse aus der Datenbank abruft:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $events = $query->fetchAll();
    return $events;
}
~~~

Erstellen Sie anschließend einen Request-Handler, der auf eingehende Anfragen reagiert:

~~~js title="data/api.php"
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = read($db, $_GET);
        break;
    case "POST":
        // we'll implement this later
    break;
    default: 
        throw new Exception("Unexpected Method"); 
    break;
}
header("Content-Type: application/json");
echo json_encode($result);
~~~

Fügen Sie Ihrer Datenbank einige Ereignisse hinzu, damit diese im Scheduler angezeigt werden.

### Dynamisches Laden

Im Moment lädt der Scheduler alle Ereignisse auf einmal aus der Datenbank. Das ist in Ordnung, solange die Datenmenge gering bleibt. Bei Anwendungen wie Buchungs- oder Planungssystemen, in denen sich mit der Zeit viele alte Einträge ansammeln, kann die Menge der übertragenen Daten jedoch erheblich wachsen. Nach einigen Monaten aktiver Nutzung kann die Anwendung bei jedem Laden der Seite mehrere Megabyte an Ereignissen anfordern.

Dies lässt sich vermeiden, indem Sie das dynamische Laden aktivieren. Der Scheduler sendet dann den aktuell angezeigten Datumsbereich als Parameter, sodass der Server nur die Ereignisse zurückgibt, die in diesen Bereich fallen. Jedes Mal, wenn der Nutzer zu einem anderen Zeitraum navigiert, lädt der Scheduler nur die relevanten Daten nach.

Um das dynamische Laden auf der Client-Seite zu aktivieren, verwenden Sie die Option *setLoadMode* und setzen Sie sie auf "day", "week" oder "month". Fügen Sie z. B. Folgendes zu Ihrem Client-Code hinzu:

~~~js title="index.html"
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day"); /*!*/

// load data from the backend
scheduler.load("data/api.php");
~~~

Auf der Server-Seite können Sie dies umsetzen, indem Sie die Funktion `read` wie folgt anpassen:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
 
    // handle dynamic loading
    if (isset($requestParams["from"]) && isset($requestParams["to"])) { /*!*/
        $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";  /*!*/
        $queryParams = [$requestParams["from"], $requestParams["to"]];  /*!*/
    }  /*!*/
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $events = $query->fetchAll();
    return $events;
}
~~~

## Schritt 5. Änderungen speichern

### Backend-Handler implementieren

Bisher kann der Scheduler Daten vom Backend lesen. Der nächste Schritt ist, das Speichern von Änderungen in der Datenbank zu ermöglichen.

Der Client arbeitet im JSON-Modus und sendet POST-Anfragen, um Aktionen an den Ereignissen auszuführen. Details zum Anfrageformat und zu den Routen finden Sie in[Serverseitige Integration](/guides/server-integration.md#request-parameters).

Fügen Sie Funktionen hinzu, um Ereignisse in der Datenbank zu erstellen, zu aktualisieren und zu löschen.

In `data/api.php` ergänzen Sie Folgendes:

~~~js title="data/api.php"
// create a new event
function create($db, $event){
    $queryText = "INSERT INTO `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?";
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"]
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    return $db->lastInsertId();
}
// update an event
function update($db, $event, $id){
    $queryText = "UPDATE `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?
        WHERE `id`=?";
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"],
        $id
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
}
// delete an event
function delete($db, $id){
    $queryText = "DELETE FROM `events` WHERE `id`=? ;";
    $query = $db->prepare($queryText);
    $query->execute([$id]);
}
~~~

Aktualisieren Sie anschließend den POST-Request-Handler, damit diese Funktionen genutzt werden:

~~~js title="data/api.php"
$db = new PDO($dsn, $username, $password, $options);
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = read($db, $_GET);
        break;
    case "POST": /*!*/
        $requestPayload = json_decode(file_get_contents("php://input")); /*!*/
        $id = $requestPayload->id; /*!*/
        $action = $requestPayload->action; /*!*/
        $body = (array) $requestPayload->data; /*!*/
        $result = [ /*!*/
            "action" => $action /*!*/
        ]; /*!*/
        if ($action == "inserted") {; /*!*/
            $databaseId = create($db, $body); /*!*/
            $result["tid"] = $databaseId; /*!*/
        } elseif($action == "updated") { /*!*/
            update($db, $body, $id); /*!*/
        } elseif($action == "deleted") { /*!*/
            delete($db, $id); /*!*/
        } /*!*/
    break; /*!*/
    default: 
        throw new Exception("Unexpected Method"); 
    break;
}
 
header("Content-Type: application/json");
echo json_encode($result);
~~~

:::note
Wenn ein neues Ereignis erstellt wird, wird dessen Datenbank-ID im **tid**-Feld der Antwort an den Client zurückgesendet. Die Antwort im JSON-Format kann bei Bedarf zusätzliche Eigenschaften enthalten, die im Client-Handler ausgewertet werden können.
:::

### Aktivieren der Datenspeicherung auf der Client-Seite

Als Nächstes wird die Client-Seite so eingerichtet, dass sie mit der gerade erstellten API arbeitet:

~~~js title="index.html"

scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// Daten vom Backend laden
scheduler.load("data/api.php"); /*!*/
 
// Änderungen an das Backend senden
var dp = scheduler.createDataProcessor({ /*!*/
    url: "data/api.php", /*!*/
    mode: "JSON" /*!*/
}); /*!*/
~~~

Wenn Sie die Anwendung jetzt neu starten, können Sie im Scheduler Ereignisse erstellen, löschen und bearbeiten. Alle Änderungen bleiben auch nach dem Neuladen der Seite erhalten.

![Scheduler CRUD](/img/php_plain_crud.png)

An diesem Punkt haben Sie einen einfachen Scheduler, der seine Ereignisse in einer MySQL-Datenbank speichert.

## Wiederkehrende Ereignisse

Um wiederkehrende Ereignisse zu ermöglichen (z. B. „Termin täglich wiederholen"), muss eine entsprechende Erweiterung auf der Scheduler-Seite eingebunden werden:

~~~html
...
<body>
    ...
    <script>
        scheduler.plugins({
            recurring: true /*!*/
        });
        scheduler.init('scheduler_here', new Date(2019,0,20), "week");
        ...
    </script> 
</body>
~~~

Die Tabelle „events" benötigt zusätzliche Spalten, um Informationen zu wiederkehrenden Ereignissen zu speichern. Hier ist eine SQL-Abfrage zum Erstellen einer Tabelle, die wiederkehrende Ereignisse unterstützt:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler_howto_php`;
USE `scheduler_howto_php`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `event_pid` int(11) DEFAULT 0,  
  `event_length` bigint(20) unsigned DEFAULT 0,
  `rec_type` varchar(25) DEFAULT '',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

Alternativ können Sie die bestehende events-Tabelle aus dem vorherigen Schritt wie folgt aktualisieren:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### Backend aktualisieren

Einige Anpassungen in den PHP-Skripten sind notwendig.

Zuerst muss die SQL-Abfrage für die `INSERT`-Aktion um die neuen Spalten erweitert werden.

Anschließend muss ein Sonderfall für wiederkehrende Ereignisse beachtet werden: Das Löschen eines einzelnen Vorkommnisses einer Serie erfordert das Anlegen eines neuen Datensatzes, daher ruft der Client hierfür die *insert*-Aktion auf:

~~~js title="data/api.php"
function create($db, $event){
    $queryText = "INSERT INTO `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?,
        `event_pid`=?,  /*!*/
        `event_length`=?,  /*!*/
        `rec_type`=?";  /*!*/
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"],
        // Spalten für wiederkehrende Ereignisse
        $event["event_pid"] ? $event["event_pid"] : 0,  /*!*/
        $event["event_length"] ? $event["event_length"] : 0,  /*!*/
        $event["rec_type"]  /*!*/
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    return $db->lastInsertId();
}
~~~

Auch der Handler für `POST`-Anfragen muss angepasst werden, da der Client vom Server nach dem Einfügen eines übersprungenen Vorkommnisses einen „deleted"-Status erwartet:

~~~js title="data/api.php"
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = read($db, $_GET);
    break;
    case "POST":
        $requestPayload = json_decode(file_get_contents("php://input"));
        $id = $requestPayload->id;
        $action = $requestPayload->action;
        $body = (array) $requestPayload->data;
        $result = [
            "action" => $action
        ];
        if ($action == "inserted") {
            $databaseId = create($db, $body);
            $result["tid"] = $databaseId;
            // Einzelnes Vorkommnis aus einer Serie löschen
            if ($body["rec_type"] === "none") {
                $result["action"] = "deleted";/*!*/
            }
        } elseif($action == "updated") {
            update($db, $body, $id);
        } elseif($action == "deleted") {
            delete($db, $id);
        }
    break;
    default: 
        throw new Exception("Unexpected Method"); 
    break;
}
~~~

Auch die Update-Funktion benötigt entsprechende Änderungen in der SQL-Abfrage. Zusätzlich müssen beim Bearbeiten einer Serie alle geänderten Vorkommnisse dieser Serie gelöscht werden:

~~~js title="data/api.php"
function update($db, $event, $id){
    $queryText = "UPDATE `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?,
        `event_pid`=?, /*!*/
        `event_length`=?, /*!*/
        `rec_type`=? /*!*/
        WHERE `id`=?";
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"],
        $event["event_pid"] ? $event["event_pid"] : 0, /*!*/
        $event["event_length"] ? $event["event_length"] : 0, /*!*/
        $event["rec_type"], /*!*/
        $id
    ];
    if ($event["rec_type"] && $event["rec_type"] != "none") { /*!*/
        // Alle geänderten Vorkommnisse müssen beim Bearbeiten einer Serie gelöscht werden /*!*/
        //https://docs.dhtmlx.com/scheduler/ server_integration.html#recurringevents /*!*/
        $subQueryText = "DELETE FROM `events` WHERE `event_pid`=? ;"; /*!*/
        $subQuery = $db->prepare($subQueryText); /*!*/
        $subQuery->execute([$id]); /*!*/
    } /*!*/
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
}
~~~

Schließlich muss die Funktion für die `DELETE`-Aktion zwei Sonderfälle behandeln:
  
- Wenn das Ereignis einen nicht-leeren Wert für `event_pid` hat, wird eine bearbeitete Instanz einer Serie gelöscht. Statt den Datensatz zu entfernen, wird `rec_type='none'` gesetzt, damit der Scheduler dieses Vorkommnis überspringt.
  
- Beim Löschen einer gesamten Serie sollten auch alle bearbeiteten Instanzen dieser Serie gelöscht werden.

~~~js title="data/api.php"
function delete($db, $id){
    // Logik speziell für wiederkehrende Ereignisse
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = "SELECT * FROM `events` WHERE id="?" LIMIT 1;";
    $subQuery = $db->prepare($subQueryText);
    $subQuery->execute([$id]);
    $event = $subQuery->fetch();
    if ($event["event_pid"]) {
        // Löschen einer bearbeiteten Instanz einer Serie
        // Wenn ein Ereignis mit event_pid gelöscht wurde, muss es aktualisiert werden
        // mit rec_type==none statt zu löschen.
        $subQueryText="UPDATE `events` SET `rec_type`='none' WHERE `id`=?;";
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }else{
        if ($event["rec_type"] && $event["rec_type"] != "none") { /*!*/
            // Beim Löschen einer Serie alle bearbeiteten Instanzen der Serie löschen
            $subQueryText = "DELETE FROM `events` WHERE `event_pid`=? ;";
            $subQuery = $db->prepare($subQueryText);
            $subQuery->execute([$id]);
        }
        /*
        Ende der Verarbeitung für wiederkehrende Ereignisse
        */
        $queryText = "DELETE FROM `events` WHERE `id`=? ;";
        $query = $db->prepare($queryText);
        $query->execute([$id]);
    }
}
~~~

## Anwendungssicherheit

dhtmlxScheduler arbeitet auf der Client-Seite und enthält keine integrierten Sicherheitsfunktionen, um flexibel zu bleiben. Da Sicherheit auf der Client-Seite allein nicht ausreicht, sind Backend-Entwickler für die Absicherung der Anwendung verantwortlich. Wichtige Punkte:

- SQL-Injections: In diesem Beispiel werden für alle Operationen parametrisierte SQL-Abfragen verwendet, was SQL-Injection-Angriffe verhindert.

- XSS-Angriffe: Der Client bereinigt Benutzereingaben weder vor dem Senden an das Backend noch werden Serverdaten vor der Anzeige bereinigt. In diesem Beispiel gibt es keine XSS-Filterung, daher sollten Sie diese hinzufügen, wenn Sie dieses Beispiel in Ihrer Anwendung verwenden möchten.

Um XSS-Angriffe zu verhindern, stellen Sie sicher, dass alle Zeichenketten, die in HTML eingefügt werden, korrekt maskiert sind.

In diesem Beispiel reicht es, die *„text"*-Eigenschaft der Ereignisse beim Laden auf den Client zu escapen:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
    if (isset($requestParams["from"]) && isset($requestParams["to"])) {
        $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";
        $queryParams = [$requestParams["from"], $requestParams["to"]];
    }
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $events = $query->fetchAll(PDO::FETCH_ASSOC);
 
    // Unsicheren Text escapen
    foreach($events as $index=>$event){
        $events[$index]["text"] = htmlentities($event["text"]);
    }
    return $events;
}
~~~

## Fehlerbehandlung

Wenn das Backend eine Aktion nicht ausführen kann, erwartet der Client als Antwort einen „error"-Status.

Dies kann erreicht werden, indem Methodenaufrufe in einen try-catch-Block eingebettet werden. Ersetzen Sie in der Datei `data/app.php` den `switch-case`-Block durch Folgendes:

~~~js title="data/api.php"
try {
    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            $result = read($db, $_GET);
        break;
        case "POST":
            $requestPayload = json_decode(file_get_contents("php://input"));
            $id = $requestPayload->id;
            $action = $requestPayload->action;
            $body = (array) $requestPayload->data;
            $result = [
                "action" => $action
            ];
            if ($action == "inserted") {
                $databaseId = create($db, $body);
                $result["tid"] = $databaseId;
                // Einzelnes Vorkommnis aus einer Serie löschen
                if ($body["rec_type"] === "none") {
                    $result["action"] = "deleted";/*!*/
                }
            } elseif($action == "updated") {
                update($db, $body, $id);
            } elseif($action == "deleted") {
                delete($db, $id);
            }
        break;
        default: 
            throw new Exception("Unexpected Method"); 
        break;
    }
} catch (Exception $e) {
    http_response_code(500);
    $result = [
        "action" => "error",
        "message" => $e->getMessage()
    ];
}
~~~

Auf der Client-Seite können Fehler mit dem [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)-Event des dataProcessor abgefangen werden:

~~~js title="index.html"
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // Hier kann etwas unternommen werden
    }
});
~~~

## Fehlersuche

Falls Scheduler nach diesen Schritten zur PHP-Integration keine Ereignisse anzeigt, finden Sie Hinweise zur Fehlersuche im Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md).

## Wie geht es weiter?

Mit einem voll funktionsfähigen Scheduler können Sie sich den vollständigen Code auf [GitHub](https://github.com/DHTMLX/scheduler-howto-php-plain) ansehen, wo er zum Klonen oder Herunterladen für Ihre Projekte bereitsteht.

Außerdem finden Sie weitere Informationen in den [Anleitungen zu den vielen Funktionen des Schedulers](/guides/) oder in Tutorials zur [Integration des Schedulers mit anderen Backend-Frameworks](/integrations/howtostart-guides.md).
