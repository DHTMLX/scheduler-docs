---
title: "dhtmlxScheduler mit PHP: Slim 3"
sidebar_label: "dhtmlxScheduler mit PHP: Slim 3"
---

# dhtmlxScheduler mit PHP: Slim 3

In diesem Tutorial werden die Grundlagen zum Erstellen eines PHP-basierten Schedulers mit dem Slim 3 Framework und einer REST API im Backend behandelt.

:::note
Dieses Tutorial verwendet das ältere Slim Framework v3.x. Für die aktuelle Version siehe die Anleitung [Slim Framework v4.x](/integrations/php/howtostart-php-slim4.md).
:::

Es gibt auch Tutorials für die Integration mit anderen Plattformen und Frameworks:

- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit Node.js](/integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Bei der Entwicklung von PHP-Anwendungen ist es üblich, ein etabliertes Framework zu nutzen, anstatt alles von Grund auf neu zu programmieren.

In diesem Beispiel wird das [Slim 3](https://www.slimframework.com/) Framework zusammen mit einer REST API auf der Serverseite verwendet, wobei MySQL als Datenspeicher dient. Die CRUD-Operationen werden mit PDO durchgeführt und sind flexibel genug, um auch mit anderen Frameworks zu funktionieren.

Sie können sich die [komplette Demo auf GitHub ansehen](https://github.com/DHTMLX/scheduler-howto-php-slim/tree/slim-3.x). Folgen Sie den Schritt-für-Schritt-Anleitungen, um diese Anwendung zu erstellen.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/scheduler-howto-php-slim/tree/slim-3.x).
:::

## Schritt 1. Initialisierung eines Projekts

### Projekt erstellen

Als Ausgangspunkt dient eine [Skeleton-Anwendung](https://github.com/slimphp/Slim-Skeleton) für Slim 3.

Beginnen Sie mit der Erstellung der Anwendung über Composer:

~~~php
$ composer create-project slim/slim-skeleton scheduler-slim-howto
$ cd scheduler-slim-howto/
$ composer require illuminate/database "~5.1"
~~~

## Schritt 2. Scheduler zur Seite hinzufügen

Als Nächstes wird der Scheduler zur Seite hinzugefügt. Dies umfasst zwei einfache Schritte.

### Ansicht erstellen

Erstellen Sie eine Datei *scheduler.phtml* im Ordner `templates`:

~~~js title="templates/scheduler.phtml"
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
            scheduler.config.xml_date="%Y-%m-%d %H:%i";
            scheduler.init('scheduler_here', new Date(2019,0,20), "week");
            scheduler.load("/events");

            var dp = scheduler.createDataProcessor("/events");
            dp.setTransactionMode("REST"); // use to transfer data with REST
            dp.init(scheduler);
        </script>
    </body>
</html>
~~~

### Routen einrichten

Nachdem die neue Seite bereit ist, richten Sie eine Route in **src/routes.php** ein, damit sie im Browser aufgerufen werden kann:

~~~js title="src/routes.php"
$app->get('/', function (Request $request, Response $response, array $args) {
    return $this->renderer->render($response, 'scheduler.phtml', $args);
});
~~~

Jetzt können Sie die App starten und den Scheduler sehen:

![Scheduler initialization](/img/howtostart_slim_init.png)

## Schritt 3. Datenbank vorbereiten

Zu diesem Zeitpunkt ist der Scheduler noch leer. Der nächste Schritt ist das Anlegen einer Datenbank und deren Anbindung an die Anwendung.

### Datenbank erstellen

Sie können die Datenbank mit Ihrem bevorzugten MySQL-Client oder über die Konsole anlegen. Hier ist das SQL, um eine Datenbank und eine Tabelle für Kalendereinträge zu erstellen:

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

Um das Skript über die MySQL-Konsole zu importieren, speichern Sie den obigen Code in einer Datei *dump.sql* und führen Sie aus:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

Öffnen Sie anschließend *src/settings.php*, fügen Sie das Datenbank-Konfigurationsarray hinzu und passen Sie es mit Ihren Zugangsdaten an:

~~~js title="src/settings.php"
'pdo' => [
    'engine' => 'mysql',
    'host' => 'localhost',
    'database' => 'scheduler_howto_php',
    'username' => 'user',
    'password' => 'pass',
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',

    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => true,
    ],
]
~~~

Fügen Sie dann in *src/dependencies.php* eine PDO-Instanz zum App-Container hinzu:

~~~js title="src/dependencies.php"
// Inject a new instance of PDO into the container
$container['database'] = function($container) {

   $config = $container->get('settings')['pdo'];
   $dsn = "{$config['engine']}:host="{$config["'host']};dbname="{$config["'database']};
   charset="{$config["'charset']}";
   $username = $config['username'];
   $password = $config['password'];

   return new PDO($dsn, $username, $password, $config['options']);
};
~~~

## Schritt 4. Daten laden

Der Scheduler ist bereits so konfiguriert, dass er "/events" aufruft, um Termine zu laden. Jetzt fügen Sie einen Handler für diese Anfrage hinzu, um echte Daten bereitzustellen.

Da mehrere Handler benötigt werden, helfen [Route Groups](https://www.slimframework.com/docs/v3/objects/router.html#route-groups) bei der Organisation.

Öffnen Sie *src/routes.php* und fügen Sie eine Gruppe für "/events" mit einer GET-Aktion hinzu:

~~~js title="src/routes.php"
$app->group('/events', function () {
    $this->get('', function (Request $request, Response $response, array $args) {
        $db = $this->database;
        $queryText = 'SELECT * FROM `events`';

        $query = $db->prepare($queryText);
        $query->execute();
        $result = $query->fetchAll();

        return $response->withJson($result);
    });
});
~~~

Sobald Sie einige Termine in die Datenbank eintragen, werden diese im Scheduler angezeigt.

### Dynamisches Laden

Der Scheduler lädt derzeit alle Termine auf einmal, was bei kleinen Datenmengen unproblematisch ist. Wenn die Anwendung jedoch für Planung oder Buchung genutzt wird und alte Einträge nicht entfernt werden, kann die Anzahl der Termine schnell wachsen, was zu großen Datenübertragungen bei jedem Laden der Seite führt.

Dynamisches Laden löst dieses Problem, indem nur die Termine für den aktuell sichtbaren Zeitraum geladen werden. Jedes Mal, wenn der Nutzer die Ansicht ändert, werden nur die relevanten Daten angefordert.

Aktivieren Sie dies, indem Sie die Option *setLoadMode* auf "day", "week" oder "month" im Client setzen:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
scheduler.load("/events");
~~~

Auf der Serverseite können Sie die Datumsfilter wie folgt behandeln:

~~~js title="src/routes.php"
$app->group('/events', function () {
    $this->get('', function (Request $request, Response $response, array $args) {
        $db = $this->database;
        $queryText = 'SELECT * FROM `events`';

        $params = $request->getQueryParams(); /*!*/
        $queryParams = []; /*!*/

        if (isset($params['from']) && isset($params['to'])) {/*!*/
            $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";/*!*/
            $queryParams = [$params['from'], $params['to']];/*!*/
        }/*!*/

        $query = $db->prepare($queryText);
        $query->execute($queryParams);/*!*/
        $result = $query->fetchAll();

        return $response->withJson($result);
    });
});
~~~

## Schritt 5. Änderungen speichern

### Backend-Handler implementieren

Jetzt kann der Scheduler Daten vom Backend lesen. Im nächsten Schritt sollen Änderungen auch zurück in die Datenbank gespeichert werden.

Der Client arbeitet im REST-Modus und sendet POST-, PUT- und DELETE-Anfragen für Ereignisaktionen.
[Siehe das Anfrageformat und die vom Scheduler verwendeten Routen](/guides/server-integration.md#request-parameters).

Definieren Sie einen Controller, um diese Aktionen zu behandeln, richten Sie die Routen ein und aktivieren Sie das Speichern auf der Clientseite.

Fügen Sie in *src/routes.php* einen POST-Handler zum Einfügen neuer Termine hinzu:

~~~js title="src/routes.php"
$this->post('', function (Request $request, Response $response, array $args) {
    $db = $this->database;
    $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `events` SET
                `start_date`=?,
                `end_date`=?,
                `text`=?';

    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text']
    ];

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'tid' => $db->lastInsertId(),
        'action' => 'inserted'
    ];

    return $response->withJson($result);
});
~~~

:::note
Beim Einfügen eines neuen Termins gibt der Server die ID des Eintrags im Feld `tid` der Antwort zurück. Die JSON-Antwort kann zusätzliche Eigenschaften enthalten, die auf der Clientseite verfügbar sind.
:::

Fügen Sie analog einen PUT-Handler zum Aktualisieren von Terminen hinzu:

~~~php
$this->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->database;
    $id = $request->getAttribute('route')->getArgument('id');
    $body = $request->getParsedBody();

    $queryText = 'UPDATE `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?
            WHERE `id`=?';

    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],
        $id
    ];

    $query = $db->prepare($queryText);
    $query->execute($queryParams);
        
    $result = [
        'action' => 'updated'
    ];

    return $response->withJson($result);
});
~~~

Und einen DELETE-Handler zum Entfernen von Terminen:

~~~php
$this->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->database;
    $id = $request->getAttribute('route')->getArgument('id');
    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';

    $query = $db->prepare($queryText);
    $query->execute([$id]);

    $result = [
        'action' => 'deleted'
    ];

    return $response->withJson($result);
});
~~~

### Aktivieren des Speicherns von Daten auf der Client-Seite

Als Nächstes richten wir die Client-Seite so ein, dass sie mit der gerade erstellten API arbeitet:

~~~js title="templates/basic.phtml"

scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");

// Daten vom Backend laden
scheduler.load("/events");

// Updates an das Backend senden
var dp = scheduler.createDataProcessor("/events"); /*!*/
dp.init(scheduler);/*!*/

// Modus für den Datenaustausch festlegen
dp.setTransactionMode("REST");/*!*/
~~~

Nach dem Neustart der Anwendung können Sie im Scheduler Termine erstellen, löschen und bearbeiten. Alle Änderungen bleiben nach dem Aktualisieren der Seite erhalten.

![Scheduler CRUD](/img/howtostart_slim_crud.png)


## Wiederkehrende Ereignisse

Um Wiederholungsfunktionen (wie „Termin täglich wiederholen") zu aktivieren, müssen Sie die entsprechende Erweiterung auf der Scheduler-Seite hinzufügen:

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

Die Tabelle „events" benötigt zusätzliche Spalten, um Wiederholungsdaten zu speichern. Hier ist die SQL-Anweisung zum Erstellen einer Tabelle für wiederkehrende Ereignisse:

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

Alternativ können Sie die bestehende events-Tabelle aus dem vorherigen Schritt mit diesen Befehlen erweitern:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### Backend aktualisieren

Auch die Backend-Handler müssen entsprechend angepasst werden, wie in [diesem Abschnitt](/guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series) erläutert.

Beginnen Sie mit der `POST`-Route und aktualisieren Sie die SQL-Anweisung, um die neuen Spalten einzubeziehen.

Außerdem muss ein Spezialfall für wiederkehrende Ereignisse behandelt werden: Das Löschen eines einzelnen Vorkommnisses einer Serie bedeutet, dass ein neuer Datensatz erstellt wird. Der Client ruft dafür die *insert*-Aktion auf:

~~~js title="src/routes.php"
$this->post('', function (Request $request, Response $response, array $args) {
    $db = $this->database;
    $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `recurring_events` SET
                `start_date`=?,
                `end_date`=?,
                `text`=?,
                `event_pid`=?,/*!*/
                `event_length`=?,/*!*/
                `rec_type`=?';/*!*/
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],
        // Spalten für wiederkehrende Ereignisse
        $body['event_pid'] ? $body['event_pid'] : 0,/*!*/
        $body['event_length'] ? $body['event_length'] : 0,/*!*/
        $body['rec_type']/*!*/
    ];

    // Einzelnes Vorkommnis aus wiederkehrender Serie löschen
    $resultAction = 'inserted';/*!*/
    if ($body['rec_type'] === "none") {/*!*/
        $resultAction = 'deleted';//!
    }
    /*
    Ende der Verarbeitung von wiederkehrenden Ereignissen
    */

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'tid' => $db->lastInsertId(),
        'action' => $resultAction
    ];

    return $response->withJson($result);
});
~~~

Auch der `PUT`-Handler muss entsprechend aktualisiert werden. Zusätzlich gilt: Wenn eine wiederkehrende Serie geändert wird, müssen alle geänderten Vorkommnisse dieser Serie gelöscht werden:

~~~js title="src/routes.php"
$this->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->database;

    $id = $request->getAttribute('route')->getArgument('id');
    $body = $request->getParsedBody();

    $queryText = 'UPDATE `recurring_events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?,
            `event_pid`=?,/*!*/
            `event_length`=?,/*!*/
            `rec_type`=?/*!*/
            WHERE `id`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],

        $body['event_pid'] ? $body['event_pid'] : 0,/*!*/
        $body['event_length'] ? $body['event_length'] : 0,/*!*/
        $body['rec_type'],//!

        $id
    ];

    if ($body['rec_type'] && $body['rec_type'] != 'none') {/*!*/
      // Alle geänderten Vorkommnisse müssen beim Aktualisieren einer Serie gelöscht werden
      // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'action' => 'updated'
    ];

    return $response->withJson($result);
});
~~~

Abschließend erfordert die `DELETE`-Aktion die Behandlung zweier Spezialfälle:

- Wenn das zu löschende Ereignis ein nicht-leeres `event_pid` hat, bedeutet das, dass ein Benutzer eine geänderte Instanz einer wiederkehrenden Serie löscht. Statt diesen Eintrag aus der Datenbank zu entfernen, wird `rec_type='none'` gesetzt, damit der Scheduler dieses Vorkommnis überspringt.

- Wenn ein Benutzer eine ganze wiederkehrende Serie löscht, müssen auch alle geänderten Instanzen dieser Serie gelöscht werden.

~~~js title="src/routes.php"
$this->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->database;
    $id = $request->getAttribute('route')->getArgument('id');

    // Logik speziell für Unterstützung wiederkehrender Ereignisse
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = 'SELECT * FROM `recurring_events` WHERE id="?" LIMIT 1;';/*!*/
    $subQuery = $db->prepare($subQueryText);/*!*/
    $subQuery->execute([$id]);/*!*/
    $event = $subQuery->fetch(PDO::FETCH_ASSOC);/*!*/

    if ($event['event_pid']) {/*!*/
        // Geändertes Vorkommnis aus einer wiederkehrenden Serie löschen
        // Stattdessen rec_type auf 'none' setzen
       $subQueryText='UPDATE `recurring_events` SET `rec_type`='none' WHERE `id`=?;';
       $subQuery = $db->prepare($subQueryText);
       $subQuery->execute([$id]);

        $result = [
            'action' => 'deleted'
        ];

        return $response->withJson($result);
    }

    if ($event['rec_type'] && $event['rec_type'] != 'none') {//!
        // Beim Löschen einer Serie alle geänderten Vorkommnisse entfernen
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }

    /*
     Ende der Verarbeitung von wiederkehrenden Ereignissen
    */
    $queryText = 'DELETE FROM `recurring_events` WHERE `id`=? ;';

    $query = $db->prepare($queryText);
    $query->execute([$id]);

    $result = [
        'action' => 'deleted'
    ];
    
    return $response->withJson($result);
});
~~~

### Wiederkehrende Serien parsen

Wiederkehrende Ereignisse werden als einzelne Datensätze in der Datenbank gespeichert, können jedoch vom Scheduler auf der Client-Seite zu einzelnen Vorkommnissen expandiert werden.

Wenn Sie auf der Serverseite mit einzelnen Termindaten arbeiten möchten, können Sie die PHP-Hilfsbibliothek für das Parsen von wiederkehrenden Ereignissen in dhtmlxScheduler nutzen.

Die [einsatzbereite Bibliothek finden Sie auf GitHub](https://github.com/DHTMLX/scheduler-helper-php).

## Anwendungssicherheit

dhtmlxScheduler ist ein clientseitiges Tool und enthält keine integrierten Sicherheitsfunktionen, um flexibel zu bleiben. Daher kann die Client-Seite allein keine zuverlässige Sicherheit gewährleisten.

Das bedeutet, dass Backend-Entwickler für die Sicherheit der Anwendung verantwortlich sind. Wichtige Punkte sind:

- SQL-Injections: In diesem Beispiel werden durchgehend parametrisierte SQL-Abfragen verwendet, was einen Schutz gegen Injections bietet.

- XSS-Angriffe: Die Client-Seite bereinigt Benutzereingaben weder vor dem Senden an das Backend noch werden Serverdaten vor der Darstellung auf der Seite bereinigt. Dieses Beispiel enthält kein XSS-Filtering, daher sollten Sie Schutzmaßnahmen hinzufügen, wenn Sie es in Ihrer Anwendung einsetzen.


## Fehlerbehandlung

Wenn das Backend eine Aktion nicht ausführen kann, erwartet die Client-Seite eine Antwort mit dem Status „error", wie [hier](/guides/server-integration.md#errorhandling) beschrieben.

Eine Möglichkeit, dies zu handhaben, ist das Hinzufügen eines [Middleware](https://www.slimframework.com/docs/v3/concepts/middleware.html), das Ihre Handler in einen `try-catch`-Block einbettet und bei Fehlern eine Fehlermeldung an den Client zurückgibt.

Sie können dieses Middleware in *src/routes.php* definieren:

~~~js title="src/routes.php"
$schedulerApiMiddleware = function ($request, $response, $next) {
    try {
        $response = $next($request, $response);
    } catch (Exception $e) {
        // Antwort zurücksetzen und Fehlerdetails senden
        $response = new SlimHttpResponse();
        return $response->withJson([
            'action' => 'error',
            'message' => $e->getMessage()
        ]);
    }
    return $response;
};
~~~

Fügen Sie es dann Ihrer Routen-Gruppe hinzu:

~~~js title="src/routes.php"
$app->group('/events', function () {
   ...
})->add($schedulerApiMiddleware);
~~~

Auf der Client-Seite können Sie diese Fehler mit dem [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) Event des dataProcessor abfangen:

~~~php
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // Fehler hier behandeln
    }
});
~~~

## Fehlerbehebung

Wenn Sie alle Schritte befolgt haben, Scheduler aber dennoch keine Termine anzeigt, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md). Dort finden Sie Hinweise, wie Sie die Ursache für das Problem ermitteln können.


## Was kommt als Nächstes?

Sie haben nun einen voll funktionsfähigen Scheduler. Der vollständige Code steht auf [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim/tree/slim-3.x) zum Klonen, Herunterladen und Anpassen für Ihre Projekte zur Verfügung.

Sie können sich auch [Leitfäden zu den zahlreichen Scheduler-Funktionen](/guides/) oder Tutorials zur [Integration des Schedulers mit anderen Backend-Frameworks](/integrations/howtostart-guides.md) anschauen.
