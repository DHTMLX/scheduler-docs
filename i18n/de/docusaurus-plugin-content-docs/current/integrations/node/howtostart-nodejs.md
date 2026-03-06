---
title: "dhtmlxScheduler mit Node.js"
sidebar_label: "dhtmlxScheduler mit Node.js"
---

# dhtmlxScheduler mit Node.js

Dieses Tutorial führt Sie durch den Aufbau eines Schedulers mit Node.js und einer REST-API auf der Serverseite. Wenn Sie mit anderen Technologien arbeiten, schauen Sie sich die unten aufgeführten Integrationsmöglichkeiten an:

- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Unser Node.js Scheduler-Setup verwendet eine REST-API für die Serverkommunikation. Glücklicherweise bietet Node.js mehrere fertige Lösungen, sodass Sie nicht alles von Grund auf neu erstellen müssen.

In diesem Tutorial wird das [Express](http://expressjs.com/) Framework zusammen mit MySQL als Datenspeicher verwendet.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/scheduler-howto-node).
:::

## Schritt 1. Initialisierung eines Projekts

### Projekt anlegen

Beginnen Sie mit dem Erstellen einer neuen Anwendung mit yarn oder npm:

~~~
$ mkdir scheduler-howto-nodejs
$ cd ./scheduler-howto-nodejs
$ yarn init // oder npm init
~~~

Während der Initialisierung beantworten Sie einige einfache Fragen:

~~~
$ question name (scheduler-howto-nodejs):
$ question version (1.0.0):
$ question description: Mein Scheduler-Backend
$ question entry point (index.js): server.js
$ question repository url:
$ question author: Ich
$ question license (MIT): MIT
$ question private:
$ success Saved package.json
~~~

Dieser Vorgang erzeugt eine *package.json*-Datei, die etwa so aussieht:

~~~
{
    "name": "scheduler-backend",
    "version": "1.0.0",
    "main": "server.js",
    "author": "Ich",
    "license": "MIT",
}
~~~

### Abhängigkeiten hinzufügen und Module installieren

Wie bereits erwähnt, verwendet das Beispiel [Express](http://expressjs.com/) und MySQL.

:::note
Stellen Sie sicher, dass Ihr MySQL-Server eingerichtet ist, oder nutzen Sie einen Dienst wie [Free MySQL Hosting](https://www.freemysqlhosting.net/).
:::

Installieren Sie express, mysql, body-parser und date-format-lite mit:

~~~
$ yarn add express mysql body-parser date-format-lite
~~~

oder

~~~
$ npm install express mysql body-parser date-format-lite
~~~

Da **server.js** als Einstiegspunkt festgelegt wurde, erstellen Sie diese Datei mit folgendem Inhalt:

~~~js title="server.js"
const express = require("express"); // Express verwenden
const bodyParser = require("body-parser"); // für das Parsen von POST-Anfragen
const app = express(); // Anwendung erstellen
const port = 3000; // Port zum Lauschen

// Notwendig zum Parsen von POST-Anfragen
// Die folgende Zeile dient zum Parsen von application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// Server starten
app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
});
~~~

Ergänzen Sie nun Ihre **package.json** um einen "scripts"-Abschnitt:

~~~
"scripts": {
    "start": "node server.js"
}
~~~

Danach sollte Ihre **package.json** wie folgt aussehen:

~~~
{
    "name": "scheduler-howto-node",
    "version": "1.0.0",
    "main": "server.js",
    "license": "MIT",
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "body-parser": "^1.20.0",
        "date-format-lite": "^17.7.0",
        "express": "^4.18.1",
        "mysql": "^2.18.1",
    }
}
~~~

Sie können den Server nun starten mit:

~~~
$ yarn start
~~~

oder

~~~
$ npm start
~~~


## Schritt 2. Scheduler zur Seite hinzufügen

Erstellen Sie ein Verzeichnis für Ihre Frontend-HTML-, CSS- und JS-Dateien:

~~~
$ mkdir ./public
~~~

Erstellen Sie im **public**-Ordner eine Datei *index.html* mit folgendem Inhalt:

~~~js title="public/index.html"
<!doctype html>
<html>
    <head>
        <title>DHTMLX Scheduler Beispiel</title>
        <meta charset="utf-8">
        <!-- scheduler -->
        <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"
            charset="utf-8"></script>
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
            scheduler.config.load_date="%Y-%m-%d %H:%i";
            scheduler.init("scheduler_here", new Date(2022, 0, 20), "week");
            scheduler.setLoadMode("day");
 
            // Daten vom Backend laden
            scheduler.load("/events");
 
            // Backend mit Scheduler verbinden
            const dp = scheduler.createDataProcessor({
                url: "/events",
                mode: "REST"
            });
        </script>
    </body>
</html>
~~~

Dieser Code richtet ein einfaches HTML-Layout ein, bindet dhtmlxScheduler vom CDN ein und initialisiert den Scheduler mit der [init](api/method/init.md) Methode. Beachten Sie, dass sowohl der Body des Dokuments als auch der Scheduler-Container auf 100% Höhe gesetzt sind, damit der Scheduler korrekt angezeigt wird.

### Routen einrichten

Damit die neue Seite erreichbar ist, fügen Sie diesen Code vor der Zeile `"app.listen(...);"` in **server.js** hinzu:

~~~js title="server.js"
// Statische Seiten aus dem "./public"-Verzeichnis bereitstellen
app.use(express.static(__dirname + "/public"));
~~~

Starten Sie die App neu, damit die Änderungen wirksam werden.

Wenn Sie nun *http://localhost:3000/* im Browser öffnen, wird die *index.html*-Seite angezeigt.

<img src='/img/howtostart_nodejs_init.png'/>

## Schritt 3. Datenbank vorbereiten

Nachdem das Scheduler-UI bereit ist, besteht der nächste Schritt darin, es mit einer Datenbank zu verbinden und Methoden zum Lesen und Schreiben von Events zu definieren.

### Datenbank erstellen

Erstellen Sie zunächst eine Datenbank. Sie können dafür Ihren bevorzugten MySQL-Client oder die Konsole verwenden.

Führen Sie in einem MySQL-Client Folgendes aus:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
 `id` bigint(20) unsigned AUTO_INCREMENT,
 `start_date` datetime NOT NULL,
 `end_date` datetime NOT NULL,
 `text` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

Alternativ können Sie das obige SQL in einer *dump.sql*-Datei speichern und per MySQL-Konsole importieren:

~~~
$ mysql -uuser -ppass scheduler < dump.sql
~~~

Definieren Sie als Nächstes Ihre MySQL-Verbindungseinstellungen in **server.js** als Konstante:

~~~js title="server.js"
// MySQL wird für den Datenbankzugriff verwendet, util zum Promisifizieren von Abfragen
const util = require("util");
const mysql = require('mysql');

// Eigene Parameter für die Datenbank verwenden
const mysqlConfig = {
    "connectionLimit": 10,
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "scheduler"
};
~~~

Verbinden Sie sich anschließend wie folgt aus Ihrer App mit der Datenbank:

~~~js title="server.js"
// Verbindung zu MySQL öffnen
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);
~~~

Dies nutzt [Connection Pooling](https://github.com/mysqljs/mysql#pooling-connections) und wandelt Abfragen per [util.promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) in Promises um. Das ist zwar nicht zwingend notwendig, macht den Code aber übersichtlicher und leichter wartbar.

Im nächsten Schritt wird der Datenbankzugriff in einer separaten Storage-Klasse gekapselt, die sich um Verbindungen und CRUD-Operationen kümmert.


## Schritt 4. CRUD implementieren

### Datenzugriff implementieren

Die gesamte Logik für das Lesen und Schreiben von Daten wird im Modul `Storage` organisiert. Diese Klasse nimmt eine MySQL-Verbindung entgegen und führt CRUD-Operationen auf der angegebenen Tabelle aus: Alle Events abrufen, neue einfügen, bestehende aktualisieren und Events löschen.

Erstellen Sie eine Datei namens *storage.js* und fügen Sie folgenden Code ein:

~~~js title="storage.js"
require("date-format-lite"); // Datumsformat hinzufügen

class Storage {
    constructor(connection, table) {
        this._db = connection;
        this.table = "events";
    }

    // Events aus der Tabelle holen, dynamisches Laden bei übergebenen Parametern
    async getAll(params) {
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table
        ];

        let result = await this._db.query(query, queryParams);

        result.forEach((entry) => {
            // Datum und Zeit formatieren
            entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
            entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
        });
        return result;
    }

    // Neues Event erstellen
    async insert(data) {
        let result = await this._db.query(
            "INSERT INTO ?? (`start_date`, `end_date`, `text`) VALUES (?,?,?)",
            [this.table, data.start_date, data.end_date, data.text]);

        return {
            action: "inserted",
            tid: result.insertId
        }
    }

    // Event aktualisieren
    async update(id, data) {
        await this._db.query(
            "UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ? WHERE id = ?",
            [this.table, data.start_date, data.end_date, data.text, id]);

        return {
            action: "updated"
        }
    }

    // Event löschen
    async delete(id) {
        await this._db.query(
            "DELETE FROM ?? WHERE `id`=? ;",
            [this.table, id]);

        return {
            action: "deleted"
        }
    }
}

module.exports = Storage;
~~~

### Routing

Als Nächstes müssen die Routen so eingerichtet werden, dass der Scheduler auf der Seite auf den Storage zugreifen kann.

Erstellen Sie dazu ein weiteres Hilfsmodul namens `router`:

~~~js title="router.js"
function callMethod (method) {
    return async (req, res) => {
        let result;

        try {
            result = await method(req, res);
        } catch (e) {
            result =  {
                action: "error",
                message: e.message
            }
        }

        res.send(result);
    }
};

module.exports = {
    setRoutes (app, prefix, storage) {
        app.get(`${prefix}`, callMethod((req) => {
            return storage.getAll(req.query);
        }));

        app.post(`${prefix}`, callMethod((req) => {
            return storage.insert(req.body);
        }));

        app.put(`${prefix}/:id`, callMethod((req) => {
            return storage.update(req.params.id, req.body);
        }));

        app.delete(`${prefix}/:id`, callMethod((req) => {
            return storage.delete(req.params.id);
        }));
    }
};
~~~

Dieses Modul konfiguriert die Anwendung so, dass sie auf die von Scheduler gesendeten Request-URLs hört und die entsprechenden Storage-Methoden aufruft.

Beachten Sie, dass alle Methoden in `try-catch`-Blöcke gehüllt sind, um Fehler abzufangen und eine entsprechende Fehlerantwort an den Client zu senden. Weitere Details zur [Fehlerbehandlung](https://docs.dhtmlx.com/scheduler/server_integration.html#errorhandling) finden Sie in der Dokumentation.

Außerdem wird die Ausnahmemeldung direkt in der API-Antwort zurückgegeben. Das ist während der Entwicklung hilfreich, sollte aber in der Produktion vermieden werden, um keine sensiblen Informationen wie rohe MySQL-Fehler preiszugeben.

### Zusammenspiel der Komponenten

Sobald alle Teile bereit sind, können Sie das Storage-Modul über den Router mit der Anwendung verbinden:

~~~js title="server.js"
const router = require("./router");

// open connection to mysql
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);

// add listeners to basic CRUD requests
const Storage = require("./storage");
const storage = new Storage(connectionPool);
router.setRoutes(app, "/events", storage);
~~~

Nach dem Neustart der Anwendung sollten Sie in der Lage sein, im Scheduler Termine zu erstellen, zu löschen und zu bearbeiten, wobei alle Änderungen auch nach dem Neuladen der Seite erhalten bleiben.

<img src='/img/howtostart_nodejs_crud.png'/>

## Dynamisches Laden

Im Moment lädt der Scheduler beim Start alle Datensätze aus der *events*-Tabelle. Das funktioniert gut, solange das Datenvolumen klein bleibt. Bei Anwendungen wie Planung oder Buchung, bei denen alte Einträge nicht entfernt oder archiviert werden, können die Daten jedoch schnell anwachsen. Nach einigen Monaten könnte die App bei jedem Laden der Seite mehrere Megabyte an Termindaten anfordern.

Dynamisches Laden hilft, dieses Problem zu vermeiden. Der Scheduler fügt die angezeigte Datumsbereich als Parameter zur Anfrage hinzu, sodass das Backend nur die Termine zurückgibt, die in diesen Bereich fallen. Jedes Mal, wenn der Nutzer den Datumsbereich ändert, lädt der Scheduler das entsprechende Daten-Segment nach.

Um das dynamische Laden auf der Client-Seite zu aktivieren, nutzen Sie die *setLoadMode*-Option mit einem der Werte: "day", "week" oder "month". In der Regel funktioniert "day" gut.

Beginnen Sie damit, dynamisches Laden auf der Client-Seite über die [setLoadMode](api/method/setloadmode.md)-Methode zu aktivieren:

~~~js title="public/index.html"
scheduler.config.load_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2022, 0, 20), "week");
scheduler.setLoadMode("day"); /*!*/
 
// load data from backend
scheduler.load("/events");
~~~

Der Scheduler sendet `from`- und `to`-Parameter in der Anfrage, sodass Sie eine einfache `WHERE`-Klausel hinzufügen können, um nur den gewünschten Zeitraum zu laden:

~~~js title="storage.js"
async getAll(params) {
    let query = "SELECT * FROM ??";
    let queryParams = [
        this.table
    ];

    if (params.from && params.to) { /*!*/
        query += " WHERE `end_date` >= ? AND `start_date` < ?";
        queryParams.push(params.from);
        queryParams.push(params.to);
    }

    let result = await this._db.query(query, queryParams);

    result.forEach((entry) => {
    // format date and time
        entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
        entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
    });
    return result;
}
~~~

## Wiederkehrende Termine

Um [wiederkehrende Termine](/guides/recurring-events.md) (wie "Termin täglich wiederholen") zu unterstützen, sind einige zusätzliche Schritte erforderlich.

### Erweiterung aktivieren

Aktivieren Sie die Erweiterung für wiederkehrende Termine auf der Scheduler-Seite:

~~~js title="public/index.html"
<!-- scheduler recurring tasks extension -->
scheduler.plugins({
    recurring: true
});
~~~

### Datenmodell anpassen

Erweitern Sie das Datenmodell um drei zusätzliche Felder:

- event_pid
- event_length
- rec_type

Sie können diese Spalten mit folgenden SQL-Befehlen zur bestehenden Tabelle hinzufügen:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '""';
~~~

Alternativ können Sie die Tabelle auch komplett neu anlegen:

~~~
CREATE TABLE `events` (
 `id` bigint(20) unsigned AUTO_INCREMENT,
 `start_date` datetime NOT NULL,
 `end_date` datetime NOT NULL,
 `text` varchar(255) DEFAULT NULL,
 `event_pid` bigint(20) unsigned DEFAULT '0',
 `event_length` bigint(20) unsigned DEFAULT '0',
 `rec_type` varchar(25) DEFAULT '""',
 PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

### Backend anpassen

Aktualisieren Sie abschließend die [Storage-Methoden](/guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series), um wiederkehrende Termine zu unterstützen.

Zunächst muss die `insert`-Methode um die neuen Spalten in der SQL-Abfrage erweitert werden.

Außerdem muss der Spezialfall behandelt werden, dass beim Löschen eines einzelnen Vorkommens einer Serie ein neuer Datensatz angelegt werden muss. Der Client ruft dafür die *insert*-Aktion auf:

~~~js title="storage.js"
// create a new event
async insert(data) {
   let sql = "INSERT INTO ?? " +
      "(`start_date`, `end_date`, `text`, `event_pid`, `event_length`, `rec_type`) " + /*!*/
      "VALUES (?, ?, ?, ?, ?, ?)"; /*!*/

   const result = await this._db.query(
      sql,
      [
         this.table,
         data.start_date,
         data.end_date,
         data.text,
         data.event_pid || 0, //!
         data.event_length || 0, //!
         data.rec_type //!
      ]);

   // delete a single occurrence from a recurring series
   let action = "inserted"; /*!*/
   if (data.rec_type == "none") { /*!*/
     action = "deleted"; /*!*/
   } /*!*/

   return {
     action: action,
     tid: result.insertId
   };
}
~~~

Die `update`-Methode benötigt eine ähnliche Anpassung der SQL-Abfrage.

Zusätzlich gilt: Wenn eine wiederkehrende Serie geändert wird, müssen alle bearbeiteten Vorkommen dieser Serie gelöscht werden:

~~~js title="storage.js"
// update an event
async update(id, data) {
  if (data.rec_type && data.rec_type != "none") { /*!*/
      // all modified occurrences must be deleted when updating a recurring series
      // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
      await this._db.query(
        "DELETE FROM ?? WHERE `event_pid`= ?;",
        [this.table, id]);
  }

  await this._db.query(
      "UPDATE ?? SET " +
      "`start_date` = ?, `end_date` = ?, `text` = ?, " +
      "`event_pid` = ?, `event_length`= ?, `rec_type` = ? "+ /*!*/
      "WHERE id = ?",
      [
          this.table,
          data.start_date,
          data.end_date,
          data.text,
          data.event_pid || 0, /*!*/
          data.event_length || 0, /*!*/
          data.rec_type, /*!*/
          id
      ]);

  return {
     action: "updated"
  };
}
~~~

Abschließend muss die `delete`-Methode zwei Spezialfälle berücksichtigen:

- Wenn das zu löschende Ereignis ein nicht-leeres `event_pid` hat, handelt es sich um ein bearbeitetes Vorkommen einer Serie. Statt den Datensatz zu entfernen, wird `rec_type='none'` gesetzt, sodass der Scheduler dieses Vorkommen überspringt.
- Beim Löschen einer ganzen Serie müssen auch alle bearbeiteten Instanzen dieser Serie entfernt werden.

~~~js title="storage.js"
// delete an event
async delete(id) {
    // logic specific to recurring events support
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    let event = await this._db.query(
        "SELECT * FROM ?? WHERE id="?" LIMIT 1;",
        [this.table, id]);

    if (event.event_pid) {
        // deleting modified occurrence from a recurring series
        // Instead of deleting, update rec_type to "none"
        event.rec_type = "none";
        return await this.update(id, event);
    }

    if (event.rec_type && event.rec_type != "none") {
        // deleting a recurring series, remove all modified occurrences
        await this._db.query(
            "DELETE FROM ?? WHERE `event_pid`=? ;",
            [this.table, id]);
    }

    await this._db.query(
        "DELETE FROM ?? WHERE `id`= ?;",
        [this.table, id]);

    return {
        action: "deleted"
    }
}
~~~

## Anwendungssicherheit

dhtmlxScheduler ist eine Client-seitige Komponente, die auf Flexibilität ausgelegt ist und keine integrierten Sicherheitsfunktionen bietet. Da Client-seitiger Code allein keine zuverlässige Sicherheit gewährleisten kann, liegt es in der Verantwortung des Backend-Entwicklers, die Anwendung abzusichern.

Wichtige Punkte, die Sie beachten sollten:

- SQL-Injections: In diesem Beispiel werden parametrisierte SQL-Abfragen verwendet, die vor SQL-Injection-Angriffen schützen.

- XSS-Angriffe: Der Client bereinigt Benutzereingaben nicht, bevor sie an das Backend gesendet werden, und auch die Serverdaten werden vor der Anzeige nicht bereinigt.

Ein einfacher Schritt zur Risikominimierung ist die Verwendung des [`helmet`](https://github.com/helmetjs/helmet)-Moduls, das grundlegende Sicherheits-Header hinzufügt.

Installieren Sie *helmet* wie folgt:

~~~
$ yarn install helmet
~~~

Fügen Sie dann diese Zeile vor `app.listen(...)` in *server.js* hinzu:

~~~js title="server.js"
const helmet = require("helmet");
app.use(helmet());
~~~

## Fehlerbehandlung

Dank der `router`-Konfiguration gibt die Backend-API einen `error`-Status zurück, wenn eine Ausnahme auftritt.

Auf der Client-Seite können Sie diese Fehler mit dem [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)-Event des dataProcessor behandeln:

~~~js title="public/index.html"
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
   if (action == "error") {
       // handle the error here
        alert("Server error: " + response.message);
   }
});
~~~

## Fehlerbehebung

Wenn Sie alle Schritte zur Integration des Schedulers mit Node.js befolgt haben, aber keine Termine auf der Seite angezeigt werden, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md). Dort finden Sie Ansätze zur Identifizierung und Lösung häufiger Probleme.

## Wie geht es weiter?

An diesem Punkt haben Sie einen voll funktionsfähigen Scheduler. Der komplette Code ist auf [GitHub](https://github.com/DHTMLX/scheduler-howto-node) verfügbar, damit Sie ihn klonen, herunterladen und in Ihren Projekten verwenden können.

Sie können auch [Anleitungen zu den zahlreichen Funktionen des Schedulers](/guides/) oder Tutorials zur [Integration des Schedulers mit anderen Backend-Frameworks](/integrations/howtostart-guides.md) entdecken.
