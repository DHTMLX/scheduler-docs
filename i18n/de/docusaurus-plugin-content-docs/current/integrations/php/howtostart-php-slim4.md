---
title: "dhtmlxScheduler mit PHP:Slim"
sidebar_label: "dhtmlxScheduler mit PHP:Slim"
---

# dhtmlxScheduler mit PHP:Slim

Dieses Tutorial beschreibt die grundlegenden Schritte zur Erstellung eines PHP-basierten Schedulers mit dem Slim 4 Framework in Kombination mit einer REST-API auf der Serverseite.

:::note
Dieses Tutorial verwendet das Slim Framework v4.x.
Wenn Sie mit einer älteren Version arbeiten, lesen Sie bitte die Anleitung für das [Slim Framework v3.x](/integrations/other/howtostart-php.md).
:::

Es gibt weitere Tutorials zur Integration mit anderen Plattformen und Frameworks:

- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit Node.js](/integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Bei der Entwicklung einer PHP-Anwendung ist es üblich, ein bestehendes Framework zu verwenden, anstatt alles von Grund auf neu zu entwickeln.

In dieser Anleitung wird das [Slim 4](https://www.slimframework.com/) Framework zusammen mit einer REST-API auf der Serverseite eingesetzt, wobei MySQL als Datenspeicher dient. Die CRUD-Operationen werden über PDO abgewickelt und so gestaltet, dass sie auch mit anderen Frameworks flexibel genutzt werden können.

Eine [fertige Demo steht auf GitHub zur Verfügung](https://github.com/DHTMLX/scheduler-howto-php-slim) und kann als Referenz dienen. Folgen Sie den untenstehenden Schritten, um eine ähnliche Anwendung zu erstellen.

:::note
Der vollständige Quellcode ist [auf GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim) verfügbar.
:::

## Schritt 1. Initialisierung eines Projekts

### Ein Projekt erstellen

Als Ausgangspunkt dient eine [Skeleton-Anwendung](https://github.com/slimphp/Slim-Skeleton) für das Slim 4 Framework.

Erstellen Sie die Anwendung mit Composer:

~~~php
$ composer create-project slim/slim-skeleton scheduler-slim-howto
$ cd scheduler-slim-howto/
~~~

## Schritt 2. Scheduler zur Seite hinzufügen

Im nächsten Schritt wird ein Scheduler auf einer Webseite platziert, was aus zwei einfachen Teilaufgaben besteht.

### Eine View erstellen

Erstellen Sie eine Datei *basic.html* im Verzeichnis `app/templates`:

~~~js title="app/templates/basic.html"
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
            dp.init(scheduler);
            dp.setTransactionMode("REST"); // use to transfer data with REST
        </script> 
  </body> 
</html>
~~~

### Routen einrichten

Nachdem die neue Seite erstellt wurde, muss sie über den Browser erreichbar sein. Fügen Sie eine Route in **app/routes.php** hinzu:

~~~js title="app/routes.php"
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents('../app/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

Wenn Sie die App jetzt starten, wird der Scheduler auf der Seite angezeigt:

![Scheduler initialization](/img/php_init_slim4.png)

## Schritt 3. Datenbank vorbereiten

Nachdem der Scheduler eingebunden ist, folgt die Einrichtung der Datenbank und deren Anbindung an die Anwendung.

### Datenbank erstellen

Die Datenbank kann über einen bevorzugten MySQL-Client (wie phpMyAdmin) oder über die Kommandozeile erstellt werden. Nachfolgend das SQL zur Erstellung einer Datenbank und einer Tabelle für Kalendereinträge:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

Um dies über die MySQL-Konsole zu importieren, speichern Sie das obige SQL in einer Datei namens *dump.sql* und führen Sie aus:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

Öffnen Sie anschließend *app/settings.php* und fügen Sie ein Array für die Datenbankeinstellungen hinzu. Passen Sie die Zugangsdaten entsprechend an:

~~~js title="app/settings.php"
'pdo' => [
    'engine' => 'mysql',
    'host' => 'localhost',
    'database' => 'scheduler',
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

Danach aktualisieren Sie *app/dependencies.php*, um eine PDO-Instanz in den Anwendungskontext zu injizieren:

~~~js title="app/dependencies.php"
// Inject a new instance of PDO into the container
$containerBuilder->addDefinitions([
  PDO::class => function (ContainerInterface $container) {
    $config = $container->get('settings')['pdo'];
    $dsn = "{$config['engine']}:host="{$config["'host']};dbname="{$config["'database']};
        charset="{$config["'charset']}";
    $username = $config['username'];
    $password = $config['password'];
    return new PDO($dsn, $username, $password, $config['options']);
  },
]);
~~~

## Schritt 4. Daten laden

Der Scheduler ist bereits so konfiguriert, dass er Eventdaten vom Endpunkt "/events" abruft. Jetzt muss ein Handler für diese Route hinzugefügt werden, um die tatsächlichen Daten bereitzustellen.

Da für den Scheduler mehrere Handler benötigt werden, werden in Slim 4 [Routengruppen](https://www.slimframework.com/docs/v4/objects/routing.html#route-groups) verwendet, um diese zu organisieren.

Öffnen Sie *app/routes.php* und fügen Sie eine Gruppe für "/events" mit einer GET-Aktion hinzu:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
    $group->get('',  function (Request $request, Response $response, array $args) {
        $db = $this->get('PDO');
        $queryText = 'SELECT * FROM `events`';
        $params = $request->getQueryParams();
        $query = $db->prepare($queryText);
        $query->execute();
        $result = $query->fetchAll();
        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
});
~~~

Sobald Events in der Datenbank vorhanden sind, werden sie im Scheduler angezeigt.

### Dynamisches Laden

In diesem Stadium lädt der Scheduler beim Start alle Event-Datensätze. Diese Methode ist für kleine Datenmengen geeignet, aber wenn die Anwendung für Planung oder Buchung genutzt wird und keine alten Einträge entfernt werden, kann das Datenvolumen stark anwachsen. Mit der Zeit würde die App bei jedem Laden große Datenmengen anfordern.

Das dynamische Laden löst dieses Problem, indem der Scheduler den aktuell sichtbaren Datumsbereich als Anfrageparameter sendet, sodass der Server nur die relevanten Einträge zurückgibt. Jedes Mal, wenn der Benutzer den sichtbaren Zeitraum ändert, fordert der Scheduler einen neuen Datenausschnitt an.

Um das dynamische Laden auf der Clientseite zu aktivieren, verwenden Sie die Methode *setLoadMode* mit einem der Werte: "day", "week" oder "month". Beispiel:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
scheduler.load("/events");
~~~

Auf der Serverseite kann dies wie folgt behandelt werden:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
        $group->get('',  function (Request $request, Response $response, array $args) {
            $db = $this->get('PDO');
            $queryText = 'SELECT * FROM `events`';
            $params = $request->getQueryParams(); /*!*/
            $queryParams = []; /*!*/
            if (isset($params['from']) && isset($params['to'])) { /*!*/
                $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;"; /*!*/
                $queryParams = [$params['from'], $params['to']]; /*!*/
            } /*!*/
            $query = $db->prepare($queryText);
            $query->execute($queryParams); /*!*/
            $result = $query->fetchAll();
            $payload = json_encode($result);

            $response->getBody()->write($payload);
            return $response->withHeader('Content-Type', 'application/json');
        });
});
~~~


## Schritt 5. Änderungen speichern

### Implementierung von Backend-Handlern

An diesem Punkt kann der Scheduler Daten vom Backend abrufen. Der nächste Schritt besteht darin, Änderungen wieder in die Datenbank zu speichern.

Die Client-Seite arbeitet im REST-Modus, was bedeutet, dass sie POST-, PUT- und DELETE-Anfragen sendet, um Ereignisse zu verwalten. 
[Siehe das Anfrageformat und alle vom Scheduler verwendeten Routen](/guides/server-integration.md#request-parameters).

Dazu müssen Sie einen Controller definieren, der Aktionen am Datenmodell verarbeitet, die entsprechenden Routen einrichten und das Speichern von Daten auf der Client-Seite aktivieren.

Gehen Sie zurück zu *app/routes.php* und fügen Sie einen Handler für POST-Anfragen in der "/events"-Gruppe hinzu. Damit wird das Einfügen neuer Ereignisse behandelt:

~~~js title="app/routes.php"
$group->post('', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
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

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

:::note
Wenn eine neue Aufgabe hinzugefügt wird, wird deren ID im `tid`-Feld des Antwortobjekts an den Client zurückgegeben.  
Das Antwort-JSON kann auch andere Eigenschaften enthalten, auf die der Client-seitige Handler zugreifen kann.
:::

Fügen Sie in ähnlicher Weise einen Handler für PUT-Anfragen hinzu:

~~~php
$group->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    parse_str(file_get_contents("php://input"), $body);
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
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

Und für DELETE-Anfragen:

~~~php
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';
    
    $query = $db->prepare($queryText);
    $query->execute([$id]);
    
    $result = [
        'action' => 'deleted'
    ];
    
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

### Aktivierung des Datenspeicherns auf der Client-Seite

Abschließend muss die Client-Seite so konfiguriert werden, dass sie mit der gerade eingerichteten API kommuniziert:

~~~js title="public/basic.phtml"

scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// Daten vom Backend abrufen
scheduler.load("/events");
 
// Änderungen zurück an das Backend senden
var dp = scheduler.createDataProcessor("/events"); dp.init(scheduler); /*!*/ 
// Datenübertragungsmodus konfigurieren
dp.setTransactionMode("REST"); /*!*/
~~~

Nach dem Neustart der Anwendung ist es möglich, Ereignisse im Scheduler zu erstellen, zu löschen und zu aktualisieren, wobei alle Änderungen nach dem Neuladen der Seite erhalten bleiben.

![Scheduler CRUD](/img/php_crud_slim4.png)

## Wiederkehrende Ereignisse

Um wiederkehrende Ereignisse (wie tägliche Wiederholungen) zu unterstützen, binden Sie die entsprechende Erweiterung auf der Scheduler-Seite ein:

~~~html
...
<body>
    ...
    <script>
        scheduler.plugins({
            recurring: true /*!*/
        });
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
        ...
   </script> 
</body>
~~~

Die Tabelle "events" benötigt zusätzliche Spalten, um Wiederholungsdetails zu speichern. Hier ist eine SQL-Abfrage zum Erstellen einer Tabelle, die wiederkehrende Ereignisse unterstützt:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
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

Alternativ können Sie die bestehende events-Tabelle wie folgt aktualisieren:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### Aktualisierung des Backends

Als Nächstes aktualisieren Sie die Handler wie im [Leitfaden für wiederkehrende Ereignisse](/guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series) beschrieben.

Beginnen Sie mit der `POST`-Route und passen Sie die SQL-Abfrage an, um die neuen Spalten einzubeziehen.

Beachten Sie auch einen Sonderfall für wiederkehrende Ereignisse: Wenn eine bestimmte Instanz einer Serie gelöscht werden soll, löst der Client eine *insert*-Aktion aus, um einen neuen Datensatz zu erzeugen, der diese Löschung repräsentiert:

~~~js title="app/routes.php"
$group->post('', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `events` SET
                `start_date`=?,
                `end_date`=?,
                `text`=?,
                `event_pid`=?, 
                `event_length`=?, 
                `rec_type`=?'; 
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],
        // Spalten für wiederkehrende Ereignisse
        $body['event_pid'] ? $body['event_pid'] : 0,
        $body['event_length'] ? $body['event_length'] : 0, 
        $body['rec_type'] 
    ];

    // Behandlung der Löschung einer einzelnen Instanz in einer wiederkehrenden Serie
    $resultAction = 'inserted'; /*!*/
    if ($body['rec_type'] === "none") { /*!*/
        $resultAction = 'deleted'; /*!*/
    } /*!*/
    /*
    Ende der Datenverarbeitung für wiederkehrende Ereignisse
    */

    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $result = [
        'tid' => $db->lastInsertId(),
        'action' => $resultAction
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

Der `PUT`-Handler benötigt ähnliche Anpassungen an der SQL-Abfrage.  
Zusätzlich muss ein Sonderfall behandelt werden: Beim Bearbeiten einer wiederkehrenden Serie müssen alle geänderten Instanzen dieser Serie gelöscht werden:

~~~js title="app/routes.php"
$group->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    parse_str(file_get_contents("php://input"), $body);
    $queryText = 'UPDATE `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?,
            `event_pid`=?,
            `event_length`=?,
            `rec_type`=?
            WHERE `id`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],

        $body['event_pid'] ? $body['event_pid'] : 0,
        $body['event_length'] ? $body['event_length'] : 0,
        $body['rec_type'],/*!*/
        $id
    ];
    if ($body['rec_type'] && $body['rec_type'] != 'none') {
        // Beim Aktualisieren einer wiederkehrenden Serie müssen alle geänderten Instanzen entfernt werden
        // siehe https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
            $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
            $subQuery = $db->prepare($subQueryText);
            $subQuery->execute([$id]);
    }

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'action' => 'updated'
    ];
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

Abschließend muss der `DELETE`-Handler zwei Sonderfälle berücksichtigen:

- Wenn das zu löschende Ereignis einen nicht-leeren `event_pid`-Wert hat, handelt es sich um eine geänderte Instanz einer wiederkehrenden Serie. Statt diesen Datensatz zu entfernen, wird dessen `rec_type` auf `'none'` gesetzt, sodass der Scheduler dieses Vorkommen überspringt.
- Beim Löschen einer gesamten wiederkehrenden Serie müssen alle geänderten Instanzen dieser Serie ebenfalls gelöscht werden.

~~~js title="app/routes.php"
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    // Logik speziell für die Unterstützung wiederkehrender Ereignisse
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = 'SELECT * FROM `recurring_events` WHERE id="?" LIMIT 1;';
    $subQuery = $db->prepare($subQueryText);
    $subQuery->execute([$id]);
    $event = $subQuery->fetch(PDO::FETCH_ASSOC);

    if ($event['event_pid']) {
        // Löschen einer geänderten Instanz aus einer wiederkehrenden Serie
        // Statt zu löschen, rec_type auf 'none' setzen, um dieses Vorkommen zu überspringen
        $subQueryText='UPDATE `recurring_events` SET `rec_type`='none' WHERE `id`=?;';
        $subQuery = $db->prepare($subQueryText);
        $query->execute($queryParams);

        $result = [
            'action' => 'deleted'
        ];

        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }

    if ($event['rec_type'] && $event['rec_type'] != 'none') {/*!*/
        // Beim Löschen einer wiederkehrenden Serie alle geänderten Instanzen ebenfalls entfernen
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }

    /*
        Ende der Datenverarbeitung für wiederkehrende Ereignisse
    */

    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';

    $query = $db->prepare($queryText);
    $query->execute([$id]);

    $result = [
        'action' => 'deleted'
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

### Wiederkehrende Serien parsen

Ein wiederkehrendes Ereignis wird in der Datenbank als einzelner Datensatz gespeichert, den der Scheduler auf der Client-Seite aufteilen kann. 
Wenn die Daten einzelner Ereignisse auf der Server-Seite benötigt werden, steht eine Hilfsbibliothek zur Verfügung, um wiederkehrende Ereignisse von dhtmlxScheduler in PHP zu parsen. 


Diese [einsatzbereite Bibliothek finden Sie auf GitHub](https://github.com/DHTMLX/scheduler-helper-php).

## Anwendungssicherheit

dhtmlxScheduler arbeitet auf der Client-Seite und enthält keine integrierten Sicherheitsfunktionen, um Flexibilität zu gewährleisten. 
Da der reine Client-Code keine zuverlässige Sicherheit garantieren kann, ist es für Backend-Entwickler unerlässlich, sich um Sicherheitsaspekte zu kümmern. 

Zu den wichtigsten Punkten, die beachtet werden sollten, gehören:

- SQL-Injektionen. Das Beispiel verwendet für alle Operationen parametrisierte SQL-Abfragen, was hilft, SQL-Injektions-Schwachstellen zu verhindern.

- XSS-Angriffe. Die Client-Seite bereinigt Benutzereingaben nicht, bevor sie an das Backend gesendet werden, und bereinigt auch keine Serverdaten, bevor sie angezeigt werden.  
Dieses Beispiel enthält keine XSS-Filterung. Es ist daher notwendig, eine entsprechende Bereinigung hinzuzufügen, wenn Sie dieses Beispiel in Ihrer Anwendung verwenden möchten.

Um potenziellen XSS-Angriffen vorzubeugen, stellen Sie sicher, dass alle Zeichenketten, die in HTML eingefügt werden, ordnungsgemäß escaped sind. 
In diesem Beispiel genügt es, die „text"-Eigenschaften der Ereignisse beim Laden auf der Client-Seite zu escapen:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
    $group->get('',  function (Request $request, Response $response, array $args) {
        $db = $this->get('PDO');
        $queryText = 'SELECT * FROM `events`';
        $params = $request->getQueryParams();
        $queryParams = [];
        if (isset($params['from']) && isset($params['to'])) {
            $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";
            $queryParams = [$params['from'], $params['to']];
        }
        $query = $db->prepare($queryText);
        $query->execute($queryParams);
        $result = $query->fetchAll();

        // escaping unsafe text
        foreach($result as $index=>$event){
            $result[$index]["text"] = htmlentities($event["text"]);
        }

        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
~~~

## Fehlerbehandlung

Wenn eine Aktion im Backend fehlschlägt, erwartet die Client-Seite eine Antwort, die den "error"-Status dieser Aktion anzeigt ([siehe Details](/guides/server-integration.md#errorhandling)).

Sie können dies erreichen, indem Sie den Standard-Error-Handler anpassen. 
Bearbeiten Sie die Datei `src/Application/Handlers/HttpErrorHandler.php` und ersetzen Sie den folgenden Abschnitt:

~~~js title="src/Application/Handlers/HttpErrorHandler.php"
if (
    !($exception instanceof HttpException)
    && ($exception instanceof Exception || $exception instanceof Throwable)
    && $this->displayErrorDetails
) {
    $error->setDescription($exception->getMessage());
}
~~~

durch diesen Code:

~~~php
if (
    !($exception instanceof HttpException)
    && ($exception instanceof Exception || $exception instanceof Throwable)
    && $this->displayErrorDetails
) {
    $encodedPayload = json_encode([
        'action' => 'error', 'message' => $exception->getMessage()
    ]);
    $response = $this->responseFactory->createResponse();
    $response->getBody()->write($encodedPayload);
    return $response->withHeader('Content-Type', 'application/json');
}
~~~

Auf der Client-Seite können diese Fehler mit dem [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)-Event des dataProcessor abgefangen werden:

~~~php
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // do something here
    }
});
~~~

## Fehlerbehebung

Wenn Sie alle Schritte zur Integration des Schedulers mit PHP befolgt haben, aber keine Ereignisse auf der Seite erscheinen, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md). 
Er gibt Hinweise zur Identifizierung der Ursachen für häufige Probleme.

## Wie geht es weiter?

An diesem Punkt haben Sie einen vollständig funktionierenden Scheduler. 
Der vollständige Code ist auf [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim) verfügbar - zum Ansehen, Klonen oder Herunterladen für Ihre Projekte.

Zusätzlich können Sie [Anleitungen zu vielen Scheduler-Funktionen](/guides/) oder Tutorials zur [Integration des Schedulers mit anderen Backend-Frameworks](/integrations/howtostart-guides.md) erkunden.
