--- 
title: "Mehrbenutzer-Live-Updates" 
sidebar_label: "Mehrbenutzer-Live-Updates" 
---

# Mehrbenutzer-Live-Updates

Dieser Artikel beschreibt, wie die serverseitige Unterstützung für das Echtzeit-Update-Modul des DHTMLX Scheduler implementiert wird.

:::note
Der komplette Quellcode ist auf [GitHub](https://github.com/DHTMLX/scheduler-multiuser-backend-demo/) verfügbar.
:::

:::note
Dieser Artikel bezieht sich auf die Implementierung des Live-Updates-Modus für DHTMLX Scheduler v7.2. Details zu früheren Versionen finden Sie [hier](guides/live-update.md).
:::

## Prinzip

DHTMLX Scheduler stellt das `RemoteEvents`-Hilfsprogramm bereit, um Änderungen in Echtzeit zwischen mehreren Benutzern zu synchronisieren.

### Kernarbeitsablauf

- Der `RemoteEvents`-Client öffnet eine WebSocket-Verbindung, sobald der Scheduler initialisiert wird.
- Die Änderungen des Benutzers (die Ereignisse die „create“, „edit“ oder „delete“) werden über den `DataProcessor` mittels REST-API an den Server gesendet.
- Der Server sendet nach der Verarbeitung Updates an alle verbundenen Clients über WebSocket.
- Der `RemoteEvents`-Client empfängt die Updates und wendet sie auf den Scheduler an, um die Synchronisierung zwischen den Benutzern sicherzustellen.

Das Design ermöglicht es, dass dieses Backend-Modul mehrere DHTMLX-Widgets (z. B. Kanban, Gantt, Scheduler) innerhalb derselben Anwendung unterstützt. Das gemeinsame Format vereinfacht die Datensynchronisierung, ohne dass separate Backends für jedes Widget benötigt werden.

## Front-End-Integration

Initialisieren Sie `RemoteEvents` und richten Sie `DataProcessor` im gleichen Codeabschnitt ein, in dem Scheduler-Daten geladen werden.

~~~js
const AUTH_TOKEN = "token";
scheduler.init('scheduler_here', new Date(2027, 3, 20), "week");
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

- Der `RemoteEvents`-Konstruktor erfordert ein Autorisierungstoken, das im Header **"Remote-Token"** zur Server-Validierung gesendet wird.
- Der erste Parameter gibt den `WebSocket`-Endpunkt an (z. B. **/api/v1**).
- Der `remoteUpdates`-Hilfsmechanismus verarbeitet eingehende `WebSocket`-Nachrichten und synchronisiert Scheduler-Daten.

## Backend-Implementierung

Dieser Abschnitt beschreibt, wie man ein Backend erstellt, das Live-Updates unterstützt.

### Vereinfachtes Beispiel

- [Beispiel auf GitHub ansehen](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

Zur Prüfung der Implementierung:

- Extrahieren Sie das Backend-Projekt und führen Sie die Befehle `npm install` und `npm run start` aus.
- Öffnen Sie das Frontend-Beispiel in zwei separaten Browser-Tabs.
- Ändern Sie ein Ereignis in einem Tab; die Änderungen sollten im zweiten Tab sichtbar werden.

### Server-seitiger Workflow

#### 1. Handshake-Anfrage

Beim Instanziieren sendet `RemoteEvents` eine **GET**-Anfrage an den Server, um die Verbindung zu initialisieren.

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

Nach dem Empfang der Antwort wird die WebSocket-Verbindung mit dem angegebenen Endpunkt hergestellt.

Beispiel:

~~~ 
ws://${URL}?token=${token}&ws=1
~~~

Der Server überprüft das Token und antwortet mit einer Nachricht:

~~~ 
{"action":"start","body":"connectionId"}
~~~

Beispiel-Implementierung:

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

#### 3. Subscription

Nach dem Herstellen der Verbindung abonniert `RemoteEvents` Updates für bestimmte Entitäten, `events` im Fall des Scheduler:

~~~json
{"action":"subscribe","name":"events"}
~~~

Zum Abbestellen:

~~~json
{"action":"unsubscribe","name":"events"}
~~~

:::note
Dieses Format unterstützt Szenarien, in denen eine Anwendung mehrere DHTMLX-Widgets gleichzeitig verwendet. Jedes Widget abonniert nur die Updates, die für seine Daten relevant sind.
:::

Beispiel:

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

#### 4. Broadcast-Updates

Der Server sendet Updates via WebSocket für Änderungen wie das Erstellen, Aktualisieren oder Löschen von Ereignissen im unten beschriebenen Format.

Nach dem Empfang dieser Nachrichten synchronisiert Scheduler automatisch seine Daten mithilfe des `remoteUpdates`-Hilfsprogramms.


**Ereignis erstellt**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"add-event","event":EVENT_OBJECT}}}
~~~

Beispiel:

~~~js
app.post('/events', (req, res) => {
    const newEvent = req.body.event;
    const insertedEvent = crud.events.insert(newEvent);

    // Broadcast changes to connected clients
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

**Ereignis aktualisiert**

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

    // Broadcast changes to connected clients
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

**Ereignis gelöscht**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"delete-event","event":{"id":ID}}}}
~~~

Beispiel:

~~~js
app.delete('/events/:id', (req, res) => {
    const id = req.params.id;

    crud.events.delete(id);

    // Broadcast deletion to connected clients
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

### Benutzerdefinierte Handler

Im beschriebenen Format ist das `RemoteEvents`-Hilfsprogramm dafür verantwortlich, den anfänglichen Handshake zum Aufbau einer WebSocket-Verbindung mit dem Server durchzuführen und Nachrichten zu empfangen.
Der zweite Teil dieses Moduls ist der `remoteUpdates`-Hilfsprogramm, der dafür zuständig ist, Nachrichten, die über einen WebSocket empfangen werden, zu parsen und entsprechende Änderungen am Scheduler anzuwenden.

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

Normalerweise können Sie diese Hilfsprogramme ohne zusätzliche Konfiguration verwenden. Es ist jedoch möglich, das bestehende Protokoll zu erweitern, indem Sie eine benutzerdefinierte Hilfsfunktion hinzufügen oder einen benutzerdefinierten Handler für Remote-Updates implementieren.

Die Methode `RemoteEvents.on` erwartet das Objektargument, das Handler für eine oder mehrere Entitäten festlegen kann:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "add-event":
                // Handler für das hinzufügen eines Ereignisses
                break;
            case "update-event":
                // Handler für das Aktualisieren eines Ereignisses
                break;
            case "delete-event":
                // Handler für das Löschen eines Ereignisses
                break;
        }
    }
});
~~~

Wenn Sie eine benutzerdefinierte Aktion hinzufügen müssen, können Sie dies tun, indem Sie einen zusätzlichen Handler für `remoteEvents` hinzufügen:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    events: function(message) {
        const { type, event } = message;
        switch (type) {
            case "custom-action":
                // benutzerdefinierte Aktion behandeln
                break;
        }
    }
});
~~~

Der Handler wird durch folgende Nachricht aufgerufen:

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"custom-action","event":value}}}
~~~

Wenn Sie `RemoteEvents` verwenden möchten, um Updates für benutzerdefinierte Entitäten zu empfangen, können Sie dies erreichen, indem Sie einen Handler hinzufügen:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// Abonnieren benutzerdefinierter Entitäten
remoteEvents.on({ 
    calendars: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // benutzerdefinierte Aktion behandeln
                break;
        }
    }
});
~~~

Bei dieser Initialisierung wird dem WebSocket folgender Subscription-Text gesendet:

~~~json
{"action":"subscribe","name":"calendars"}
~~~

Und der Handler wird aufgerufen, wann immer eine Nachricht an die angegebene Entität gerichtet empfangen wird:

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

Dieses Leitfaden bietet die Grundlage für die Implementierung und Anpassung von Live-Updates im DHTMLX Scheduler. Für ein vollständiges Beispiel lesen Sie das [GitHub-Repository](https://github.com/DHTMLX/scheduler-multiuser-backend-demo/).