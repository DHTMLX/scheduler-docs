---
title: "Multi-User Live Updates"
sidebar_label: "Multi-User Live Updates"
---

# Multi-User Live Updates

Dieser Artikel erklärt, wie Sie die serverseitige Unterstützung für die Echtzeit-Update-Funktion im DHTMLX Scheduler einrichten.

:::note
Dieser Artikel behandelt die Implementierung des Live Updates-Modus für DHTMLX Scheduler v7.2. Informationen zu früheren Versionen finden Sie [hier](guides/live-update.md).
:::

## Prinzip

DHTMLX Scheduler enthält den `RemoteEvents`-Helper, um Änderungen zwischen mehreren Benutzern sofort zu synchronisieren.

### Grundlegender Ablauf

- Der `RemoteEvents`-Client öffnet eine WebSocket-Verbindung, sobald der Scheduler initialisiert wird.
- Benutzeraktionen wie das Erstellen, Bearbeiten oder Löschen von Terminen werden über den `DataProcessor` mittels REST-API an den Server gesendet.
- Nachdem diese Aktionen verarbeitet wurden, sendet der Server Aktualisierungen per WebSocket an alle verbundenen Clients.
- Der `RemoteEvents`-Client empfängt diese Aktualisierungen und übernimmt sie im Scheduler, sodass alle Nutzer dieselben Daten sehen.

Dieses Setup unterstützt mehrere DHTMLX-Widgets (wie Kanban, Gantt, Scheduler) innerhalb einer Anwendung, indem ein gemeinsames Format verwendet wird, das die Synchronisierung vereinfacht, ohne dass für jedes Widget ein eigenes Backend erforderlich ist.

## Front-End-Integration

Richten Sie `RemoteEvents` und `DataProcessor` gemeinsam in dem Teil Ihres Codes ein, in dem die Scheduler-Daten geladen werden.

~~~js
const AUTH_TOKEN = "token";
scheduler.init('scheduler_here', new Date(2025, 3, 20), "week");
scheduler.load("/events");

const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST-JSON",
    headers: {
        "Remote-Token": AUTH_TOKEN
    }
});

const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

### Wichtige Details

- Der Konstruktor von `RemoteEvents` benötigt ein Autorisierungs-Token, das im **"Remote-Token"**-Header zur serverseitigen Überprüfung gesendet wird.
- Das erste Argument ist der `WebSocket`-Endpunkt (zum Beispiel **/api/v1**).
- Der `remoteUpdates`-Helper verarbeitet eingehende `WebSocket`-Nachrichten und hält die Scheduler-Daten synchron.

## Backend-Implementierung

Dieser Abschnitt beschreibt, wie Sie ein Backend erstellen, das Live-Updates unterstützt.

### Vereinfachtes Beispiel

- [Siehe das Beispiel auf GitHub](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

So probieren Sie es aus:

- Laden Sie das Backend-Projekt herunter und führen Sie es mit `npm install` und `npm run start` aus.
- Öffnen Sie das Frontend-Beispiel in zwei Browser-Tabs.
- Bearbeiten Sie einen Termin in einem Tab und beobachten Sie, wie die Änderung im anderen Tab erscheint.

### Serverseitiger Ablauf

#### 1. Handshake-Anfrage

Wenn `RemoteEvents` startet, sendet es eine **GET**-Anfrage an den Server, um die Verbindung einzurichten.

Beispiel:
~~~
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

Antwort:

~~~
{"api":{},"data":{},"websocket":true}
~~~

#### 2. WebSocket-Verbindung

Nach dem Handshake öffnet `RemoteEvents` die WebSocket-Verbindung über den Endpunkt.

Beispiel:

~~~
ws://${URL}?token=${token}&ws=1
~~~

Der Server überprüft das Token und antwortet mit einer Nachricht wie:

~~~
{"action":"start","body":"connectionId"}
~~~

Beispiel-Codeausschnitt:

~~~js
app.get('/api/v1', (req, res) => {
    const token = req.headers['remote-token'];
    if (!token || !verifyAuthHeader(token)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    res.json({ api: {}, data: {}, websocket: true });
});

wss.on('connection', (ws, req) => {
    const token = new URLSearchParams(req.url.split('?')[1]).get('token');
    if (!token || !verifyAuthToken(token)) {
        ws.close(1008, 'Unauthorized');
        return;
    }
    const connectionId = generateConnectionId();
    ws.send(JSON.stringify({ action: 'start', body: connectionId }));
});
~~~

#### 3. Abonnement

Nach dem Verbindungsaufbau abonniert `RemoteEvents` Updates für bestimmte Entitäten - beim Scheduler ist dies `events`:

~~~json
{"action":"subscribe","name":"events"}
~~~

Um keine Updates mehr zu erhalten:

~~~json
{"action":"unsubscribe","name":"events"}
~~~

:::note
Dieses Setup eignet sich gut für Apps, die mehrere DHTMLX-Widgets gleichzeitig verwenden. So kann jedes Widget nur die Updates abonnieren, die es benötigt.
:::

Beispiel für die serverseitige Verarbeitung:

~~~js
ws.on('message', function(message) {
    try {
        const msg = JSON.parse(message);
        const client = clients.get(connectionId);

        if (!client) return;

        if (msg.action === 'subscribe') {
            client.subscriptions.add(msg.name);
        } else if (msg.action === 'unsubscribe') {
            client.subscriptions.delete(msg.name);
        }
    } catch (err) {
        console.error('Error parsing WebSocket message:', err);
    }
});
~~~

#### 4. Updates senden

Der Server verschickt WebSocket-Nachrichten, um die Clients über das Erstellen, Aktualisieren oder Löschen von Terminen zu informieren. Dabei wird folgendes Format verwendet.

Wenn diese Nachrichten eintreffen, aktualisiert der Scheduler die Daten automatisch mit dem `remoteUpdates`-Helper.

**Termin erstellt**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"add-event","event":EVENT_OBJECT}}}
~~~

Beispiel:

~~~js
app.post('/events', (req, res) => {
    const newEvent = req.body.event;
    const insertedEvent = crud.events.insert(newEvent);

    // Benachrichtige alle verbundenen Clients über das neue Event
    const message = { 
        name: 'events', 
        value: {
            type: 'add-event', event: insertedEvent
        }
    };
    broadcast('event', message);

    res.status(200).json({ id: insertedEvent.id });
});

function broadcast(action, body) {
    const entity = body.name;

    for (const [connectionId, client] of clients.entries()) {
        const { ws, subscriptions } = client;

        if (subscriptions.has(entity) && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ action, body }));
        }
    }
}
~~~

**Termin aktualisiert**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"update-event","event":EVENT_OBJECT}}}
~~~

Beispiel:

~~~js
app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const updatedEvent = req.body.event;

    crud.events.update(id, updatedEvent);

    // Benachrichtige die Clients über die Aktualisierung
    const message = {
        name: 'events',
        value: {
            type: 'update-event', event: updatedEvent
        }
    };
    broadcast('event', message);

    res.status(200).send();
});
~~~

**Termin gelöscht**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"delete-event","event":{"id":ID}}}}
~~~

Beispiel:

~~~js
app.delete('/events/:id', (req, res) => {
    const id = req.params.id;

    crud.events.delete(id);

    // Informiere die Clients über das Löschen
    const message = {
        name: 'events',
        value: {
            type: 'delete-event',
            event: { id }
        }
    };
    broadcast('event', message);

    res.status(200).send();
});
~~~

## Erweiterte Anpassung

### Eigene Handler

Der `RemoteEvents`-Helper übernimmt das initiale Handshake und die WebSocket-Verbindung, während der `remoteUpdates`-Helper eingehende Nachrichten verarbeitet und den Scheduler entsprechend aktualisiert.

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

In der Regel funktionieren diese Helper direkt. Es ist jedoch möglich, das Protokoll zu erweitern, indem Sie eigene Handler oder Helper für spezielle Remote-Update-Szenarien hinzufügen.

Die Methode `RemoteEvents.on` akzeptiert ein Objekt, das Handler für eine oder mehrere Entitäten definieren kann:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "add-event":
                // Event hinzufügen verarbeiten
                break;
            case "update-event":
                // Event aktualisieren verarbeiten
                break;
            case "delete-event":
                // Event löschen verarbeiten
                break;
        }
    }
});
~~~

Um eigene Aktionen zu verarbeiten, können Sie einen weiteren Handler zu `remoteEvents` hinzufügen:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "custom-action":
                // Eigene Aktion verarbeiten
                break;
        }
    }
});
~~~

Dieser Handler wird durch Nachrichten wie diese ausgelöst:

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"custom-action","event":value}}}
~~~

Um Updates für eigene Entitäten zu erhalten, fügen Sie einen entsprechenden Handler hinzu:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// Abonniere eigene Entitäten
remoteEvents.on({ 
    calendars: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // Eigene Aktion verarbeiten
                break;
        }
    }
});
~~~

Mit diesem Setup sendet `remoteEvents` eine Abonnement-Nachricht wie:

~~~json
{"action":"subscribe","name":"calendars"}
~~~

Und der Handler reagiert auf Nachrichten wie:

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

Diese Anleitung beschreibt die Grundlagen für die Einrichtung und Anpassung von Live-Updates im DHTMLX Scheduler. Für ein vollständiges, funktionierendes Beispiel besuchen Sie das GitHub-Repository.
