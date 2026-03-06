---
title: "Live Updates Modus (Legacy)"
sidebar_label: "Live Updates Modus (Legacy)"
---

# Live Updates Modus (Legacy)

:::warning
Dieser Artikel behandelt die Legacy-Version des Live Updates Modus für DHTMLX Scheduler. Informationen zur neuesten Version finden Sie [hier](guides/multiuser-live-updates.md).
:::

Der Live Updates Modus hält Daten in Echtzeit zwischen den Benutzern synchron.

Sobald ein Benutzer eine Änderung vornimmt, erscheint sie sofort auch bei allen anderen.

Dieser Modus verwendet die `Faye` Socket-Bibliothek, um schnelle und flexible Aktualisierungen zu ermöglichen, ohne dass die Seite neu geladen werden muss (nur die relevante Komponente wird aktualisiert).

Hier finden Sie eine einfache Anleitung, um mit dieser Funktion zu beginnen.

## Grundprinzip

Live Updates funktionieren, indem Änderungen von einem verbundenen Client an alle anderen übertragen werden. Dies geschieht über eine WebSocket-Verbindung, die eine bidirektionale Kommunikation zwischen Clients und Backend ermöglicht.

In dieser Version erweitert das Live Updates Modul das `DataProcessor` Modul, um die `Faye` Client-Bibliothek zu verwenden, zusammen mit einer Backend-App, die die Nachrichtenverteilung zwischen den Clients übernimmt.

Das Setup besteht aus drei Komponenten:

1. Das **Frontend** mit Scheduler und dem `DataProcessor` Modul.
2. Das **Backend**, das CRUD-Operationen auf der Datenbank ausführt.
3. Der **Live-Updates-Hub**, der die Client-Verbindungen verwaltet.

Wenn ein Benutzer Daten aktualisiert:

- Das **Frontend** sendet das Update an das **Backend**.
- Gleichzeitig sendet das **Frontend** dasselbe Update an den **Live-Updates-Hub**.
- Der **Live-Updates-Hub** verteilt das Update an alle verbundenen Clients.
- Beim Empfang des Updates vom **Live-Updates-Hub** übernimmt das **Frontend** die Änderung in die Scheduler-Daten, ohne dass Backend-CRUD-Operationen ausgelöst werden.

## Vorbereitungen

Um diesem Tutorial zu folgen, benötigen Sie eine funktionierende dhtmlxScheduler-App mit serverseitiger Logik, die Daten aus einer Datenbank lädt und Änderungen zurückspeichert. (Weitere Details [hier](integrations/howtostart-guides.md).)

Ein einfaches Beispiel könnte so aussehen:

~~~js
<script>
    function init() {
        scheduler.init('scheduler_here', new Date(2025,5,24), "week");
        scheduler.load("api/scheduler");

        const dp = scheduler.createDataProcessor({
            url: "/events",
            mode: "REST"
        });
    }
</script>
~~~

## Live Updates konfigurieren

:::note
Diese Live Updates Implementierung ist veraltet und nicht Teil des Hauptpakets.
:::

### Schritt 1. Einrichtung

1. Laden Sie das **Live Updates Plugin** für Scheduler herunter: [download link](https://files.dhtmlx.com/30d/20deb2ff205dc16bc94a7e9fcef4c5fe/live_updates.zip)
2. Laden Sie die **Live Updates Backend-App** herunter: [download link](https://files.dhtmlx.com/30d/57084e02b121f14bb14b6734d465ad41/websocket-backend.zip)
3. Starten Sie das **Live Updates Backend**, indem Sie den Anweisungen in der Readme-Datei folgen.

### Schritt 2. Front-End konfigurieren

Um den Live Update Modus zu aktivieren, fügen Sie der Frontend-App zwei zusätzliche Dateien hinzu:

- **live_updates.js** - die Plugin-Datei aus dem vorherigen Schritt
- **client.js** - eine Datei, die dynamisch von der WebSocket Backend-App generiert wird

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="http://localhost:8008/client.js"></script>
~~~

Dieses Beispiel verbindet sich direkt mit der WebSocket-App. In der Regel ist es besser, diese URL über Ihre Hauptanwendung zu leiten, um die Adresse und den Port der Nebenanwendung zu verbergen. Dies kann durch das Einrichten eines Reverse Proxy erreicht werden.

**Anfragen durch die Hauptanwendung weiterleiten (Node.js):**

~~~js
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

module.exports = function(app){
    app.all("/liveUpdates*", function(req, res) {
        proxy.web(req, res, {target: "http://localhost:8008"});
    });
}
~~~

**Front-End:**

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="/liveUpdates/client.js"></script>
~~~

### Schritt 3. Live Updates aktivieren

Aktivieren Sie den Modus, indem Sie die Methode **live_updates()** auf der `DataProcessor` Instanz aufrufen. Stellen Sie sicher, dass der `DataProcessor` zuerst initialisiert wurde. Die Methode erwartet die WebSocket-Einstiegspunkt-URL als Parameter.

~~~js
const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST"
});

dp.live_updates("/liveUpdates");
~~~

Eine vollständige Demo-Anwendung können Sie [hier](https://files.dhtmlx.com/30d/0aea2facd959a8300bf7caec3f5a7f42/dhtmlxscheduler-live-updates.zip) herunterladen.
