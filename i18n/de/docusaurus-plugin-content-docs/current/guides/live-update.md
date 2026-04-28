---
title: "Live Updates-Modus (Legacy)"
sidebar_label: "Live Updates-Modus (Legacy)"
---

# Live Updates-Modus (Legacy)

:::warning
Die beschriebene Funktionalität ist veraltet und wird nicht mehr gepflegt.
:::

:::note
Dieser Artikel bezieht sich auf die Legacy-Implementierung des Live Updates-Modus für den DHTMLX Scheduler. Details zur aktuellen Version finden Sie [hier](guides/multiuser-live-updates.md).
:::

Live Update ist ein Modus, der synchrone Datenaktualisierungen in Echtzeit bereitstellt.

Wenn ein Benutzer eine Änderung vornimmt, wird sie allen anderen sofort sichtbar.

Der Modus verwendet die `Faye`-Socket-Bibliothek, um den Prozess so schnell und flexibel wie möglich zu gestalten, und erfordert keine Seitenaktualisierung (er aktualisiert nur die Komponente, auf die er angewendet wird).

In diesem Artikel geben wir Ihnen eine Schritt-für-Schritt-Anleitung, um schnell in das Thema einzusteigen.

## Grundprinzip

Live-Updates werden erreicht, indem Änderungen, die von einem verbundenen Client vorgenommen wurden, an alle anderen verbundenen Clients übertragen werden. Dies geschieht durch die Nutzung einer WebSocket-Verbindung für den zweiseitigen Nachrichtenaustausch zwischen verbundenen Clients und dem Backend.

In dieser Version des Live Updates-Moduls wird es umgesetzt, indem das `DataProcessor`-Modul erweitert wird, um den `Faye`-Client zu verwenden, zusammen mit einer zusätzlichen Backend-Anwendung, die Nachrichten zwischen Clients weiterleitet.

Die Lösung besteht aus drei Teilen:

1. Das **Frontend** mit Scheduler und dem `DataProcessor`-Modul.
2. Das **Backend**, das CRUD-Operationen auf dem persistenten Speicher implementiert.
3. Der **Live-Updates-Hub**, der für das Verbinden der Clients verantwortlich ist.

Wenn ein Benutzer Änderungen an den Daten vornimmt:

- Das **Frontend** sendet das Update an das **Backend**.
- Gleichzeitig sendet das **Frontend** dasselbe Update an den **Live-Updates-Hub**.
- Der **Live-Updates-Hub** verbreitet das Update an alle verbundenen Clients.
- Wenn das **Frontend** das Update vom **Live-Updates-Hub** erhält, wendet es dieses auf die Scheduler-Daten an, ohne Änderungen am CRUD-Backend auszulösen.

## Bevor Sie beginnen

Um dieses Tutorial zu starten, muss Ihre dhtmlxScheduler-Anwendung vollständig funktionsfähig sein und mit serverseitiger Logik integriert sein – eine, die Daten aus einer Datenbank lädt und Änderungen wieder speichert. (Details finden Sie [hier](integrations/howtostart-guides.md).)

Ein einfaches Beispiel einer solchen Anwendung könnte folgendermaßen aussehen:

~~~js
<script>
    function init() {
        scheduler.init('scheduler_here', new Date(2027,5,24), "week");
        scheduler.load("api/scheduler");

        const dp = scheduler.createDataProcessor({
            url: "/events",
            mode: "REST"
        });
    }
</script>
~~~

## Konfiguration von Live Updates

:::note
Diese Implementierung von Live Updates ist veraltet und ist nicht im Hauptpaket enthalten.
:::

### Schritt 1. Einrichtung

1. Laden Sie das **Live Updates-Plugin** für den Scheduler herunter: [Download-Link](https://files.dhtmlx.com/30d/20deb2ff205dc16bc94a7e9fcef4c5fe/live_updates.zip)
2. Laden Sie die **Live Updates Backend**-Anwendung herunter: [Download-Link](https://files.dhtmlx.com/30d/57084e02b121f14bb14b6734d465ad41/websocket-backend.zip)
3. Starten Sie das **Live Updates Backend** gemäß den Anweisungen in der beiliegenden Readme-Datei.

### Schritt 2. Konfiguration des Frontends

Um mit dem Live-Update-Modus zu arbeiten, fügen Sie zwei zusätzliche Dateien in die Frontend-App ein:

- **live_updates.js** - die in Schritt 1 heruntergeladene Datei
- **client.js** - eine Datei, die von der WebSocket-Backend-Anwendung dynamisch erzeugt wird

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="http://localhost:8008/client.js"></script>
~~~

Im obigen Code-Beispiel verbinden wir uns direkt mit der WebSocket-Anwendung. In der Regel möchten Sie diese URL jedoch durch Ihre Hauptanwendung routen, um die Adresse und den Port der sekundären Anwendung nicht offenzulegen. Dies kann durch den Einsatz eines Reverse-Proxy erfolgen.

**Anfragen durch die Hauptanwendung (Node.js) weiterleiten:** 

~~~js
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

module.exports = function(app){
    app.all("/liveUpdates*", function(req, res) {
        proxy.web(req, res, {target: "http://localhost:8008"});
    });
}
~~~

**Frontend:**

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="/liveUpdates/client.js"></script>
~~~

### Schritt 3. Aktivierung von Live Updates

Der Modus wird aktiviert, indem die Methode **live_updates()** auf der `DataProcessor`-Instanz aufgerufen wird. Damit dies funktioniert, muss der `DataProcessor` zuvor initialisiert sein. Als Parameter nimmt die Methode die URL des WebSocket-Einstiegspunkts.

~~~js
const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST"
});

dp.live_updates("/liveUpdates");
~~~

Sie können eine vollständige Demo-Anwendung [hier](https://files.dhtmlx.com/30d/0aea2facd959a8300bf7caec3f5a7f42/dhtmlxscheduler-live-updates.zip) herunterladen.